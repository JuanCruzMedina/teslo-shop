"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
    try {
        const session = await auth();
        const userId = session?.user.id;
        if (!userId) {
            return {
                ok: false,
                message: "User not authenticated",
            };
        }

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
                userId,
            },
            include: {
                OrderAddress: {
                    include: {
                        country: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                price: true,
                                images: {
                                    select: {
                                        url: true,
                                    },
                                    take: 1,
                                },
                            },
                        }
                    },
                },
            },
        });

        if (!order) {
            return {
                ok: false,
                message: `Order with id ${orderId} not found`,
            };
        }

        if (session?.user.role !== "admin" && order.userId !== userId) {
            return {
                ok: false,
                message: "You are not authorized to view this order",
            };
        }

        return {
            ok: true,
            order,
        };
    } catch (error) {
        console.error("Error getting order by id", error);
        return {
            ok: false,
            message: "Error getting order by id",
        };
    }
}