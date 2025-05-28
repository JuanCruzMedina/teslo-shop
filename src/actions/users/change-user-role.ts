"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
    try {
        const newRole = role === "admin" ? "admin" : "user"; // Ensure role is either 'admin' or 'user'
        const session = await auth();
        if (session?.user.role !== "admin") {
            return { ok: false, message: "You do not have permission to change user roles" };
        }
        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
        });
        revalidatePath("/admin/users");
        return { ok: true };
    } catch (error) {
        console.error("Error changing user role:", error);
        return { ok: false, message: "Error changing user role" };
    }
};