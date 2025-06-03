"use server";

import { Product } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";
import { Gender, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";


const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform((val) => Number(val.toFixed(2))),
    inStock: z.coerce.number().min(0).transform((val) => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform((val) => val.split(",").map((size) => size.trim())),
    tags: z.string(),
    gender: z.nativeEnum(Gender),
});


export const createOrUpdateProduct = async (
    formData: FormData): Promise<{ ok: boolean; message?: string, product?: Product }> => {
    try {

        const data = Object.fromEntries(formData.entries());
        const parsedData = productSchema.safeParse(data);
        if (!parsedData.success) {
            return { ok: false, message: "Invalid product data" };
        }
        const { id: productId, ...restOfFormData } = parsedData.data;
        restOfFormData.slug = restOfFormData.slug.toLowerCase().replace(/ /g, "-").trim();

        const prismaTransaction = await prisma.$transaction(async (tx) => {

            const formattedTags = restOfFormData.tags.split(",").map((tag) => tag.trim());
            if (productId) {
                // Update existing product
                const product = await tx.product.update({
                    where: { id: productId },
                    data: {
                        ...restOfFormData,
                        sizes: {
                            set: restOfFormData.sizes as Size[]
                        },
                        tags: {
                            set: formattedTags,
                        }
                    },
                });

                return product;
            }

            const product = await tx.product.create({
                data: {
                    ...restOfFormData,
                    sizes: {
                        set: restOfFormData.sizes as Size[]
                    },
                    tags: {
                        set: formattedTags,
                    },
                },
            });

            return product;
        });

        revalidatePath("/admin/products");
        revalidatePath(`/admin/products/${prismaTransaction.slug}`);
        revalidatePath(`/products/${prismaTransaction.slug}`);

        return { ok: true, product: prismaTransaction };
    } catch (error) {
        console.log("Error creating/updating product:", error);
        return { ok: false, message: "An unexpected error occurred while creating/updating the product" };
    }
};