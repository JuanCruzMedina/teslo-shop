"use server";

import { auth } from "@/auth.config";
import { User } from "@/interfaces/user.interface";

import prisma from "@/lib/prisma";

export const getPaginatedUsers = async (): Promise<{
    ok: boolean;
    users?: User[];
    message?: string;
}> => {
    try {
        const session = await auth();

        if (session?.user.role !== "admin") {
            return {
                ok: false,
                message: "You do not have permission to view users",
            };
        }

        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        return {
            ok: true,
            users,
        };
    } catch (error) {
        console.error("Error getting users", error);
        return {
            ok: false,
            message: "Error getting users",
        };
    }
};