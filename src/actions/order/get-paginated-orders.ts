"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedOrdersBySessionUser = async () => {
    // TODO: add pagination
    try {
        const session = await auth();

        if (session?.user.role !== "admin") {
            return {
                ok: false,
                message: "You do not have permission to view orders",
            };
        }

        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                }
            },
        });

        return {
            ok: true,
            orders,
        };
    } catch (error) {
        console.error("Error getting order by id", error);
        return {
            ok: false,
            message: "Error getting order by id",
        };
    }
}