"use server";

import { PaypalOrderStatusResponse } from "@/interfaces/paypal.intertface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
    const authToken = await getPaypalBearerToken();
    if (!authToken) {
        return { ok: false, error: "Failed to get PayPal bearer token." };
    }

    const paypalResponse = await verifyPaypalPayment(paypalTransactionId, authToken);
    if (!paypalResponse) {
        return { ok: false, error: "Failed to verify PayPal payment." };
    }
    const { status, purchase_units } = paypalResponse;

    if (status !== "COMPLETED") {
        return { ok: false, error: "Payment not completed." };
    }
    const orderId = purchase_units[0].invoice_id
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { isPaid: true, paidAt: new Date() },
        });
    }
    catch (error) {
        console.error("Error updating order status:", error);
        return { ok: false, error: "Failed to update order status." };
    }
    revalidatePath(`/orders/${orderId}`);
    return { ok: true, orderId };
}

const getPaypalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const oauth2Url = process.env.PAYPAL_OAUTH2_URL ?? "";

    const base64Credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString("base64");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic " + base64Credentials);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch(oauth2Url, { ...requestOptions, cache: "no-store" }).then((res) => res.json());
        const accessToken = result.access_token;
        if (!accessToken) {
            console.error("Access token not found in response:", result);
            throw new Error("Access token not found in response.");
        }
        return accessToken;

    } catch (error) {
        console.error("Error getting PayPal bearer token:", error);
        return null;
    }
}

const verifyPaypalPayment = async (paypalTransactionId: string, authToken: string): Promise<PaypalOrderStatusResponse | null> => {
    const paypalOrdersUrl = process.env.PAYPAL_ORDERS_URL ?? "";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + authToken);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,

    };

    try {
        return await fetch(`${paypalOrdersUrl}/${paypalTransactionId}`, {
            ...requestOptions,
            cache: "no-store"
        }).then((res) => res.json());
    }
    catch (error) {
        console.error("Error verifying PayPal payment:", error);
        return null;
    }
};