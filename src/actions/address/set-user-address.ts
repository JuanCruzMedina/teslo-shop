"use server";

import { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
    try {
        const addressToSave = {
            userId,
            address: address.address,
            address2: address.address2,
            city: address.city,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
        }
        await prisma.userAddress.upsert({
            where: { userId },
            create: addressToSave,
            update: addressToSave,
        });
    } catch (error) {
        console.error("Error setting user address:", error);
        return {
            ok: false,
            message: "Failed to set user address",
        }
    }
}
