"use server";

import { Category } from "@/interfaces/category.interface";
import prisma from "@/lib/prisma";

export async function getCategories(): Promise<Category[]> {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: "asc" },
        });
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}