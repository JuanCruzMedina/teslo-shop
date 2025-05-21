"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderBySessionUser = async () => {
    try {
        const session = await auth();
        const userId = session?.user.id;
        if (!userId) {
            return {
                ok: false,
                message: "User not authenticated",
            };
        }

        const orders = await prisma.order.findMany({
            where: {
                userId,
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