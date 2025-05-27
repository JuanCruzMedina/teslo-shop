"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (orderId: string, transactionId: string) => {
    console.log("Setting transaction ID:", { orderId, transactionId });
    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { transactionId },
        });

        if (!order) {
            return { ok: false, error: "Order not found." };
        }

        return { ok: true };
    } catch (error) {
        console.error("Error setting transaction ID:", error);
        return { ok: false, error: "The transaction ID could not be set." };
    }
};