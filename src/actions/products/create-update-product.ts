"use server";

import prisma from "@/lib/prisma";
import { Gender, Size } from "@prisma/client";
import { v2 as cloudinary } from 'cloudinary';
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
    formData: FormData) => {
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
            let product = null;
            if (productId) {

                product = await tx.product.update({
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


            }
            else {
                product = await tx.product.create({
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
            }

            if (formData.has("images")) {
                const images = await uploadImages(formData.getAll("images") as File[]);
                if (!images) {
                    throw new Error("Failed to upload images");
                }
                await tx.productImage.createMany({
                    data: images.map((url) => ({ url, productId: product.id })),
                });
            }

            // Después de crear producto e imágenes
            const productWithImages = await tx.product.findUnique({
                where: { id: product.id },
                include: { images: true },
            });

            // Si necesitas solo las URLs:
            const productResult = {
                ...productWithImages,
                images: productWithImages?.images.map(img => img.url) ?? [],
            };

            // Retorna este objeto
            return productResult;
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

const uploadImages = async (imageFiles: File[]) => {
    try {
        const uploadPromises = imageFiles.map(async (file) => {
            try {
                const buffer = await file.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64'); // Convert ArrayBuffer to Base64 string
                return await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then(
                    (res) => res.secure_url
                );
            }
            catch (uploadError) {
                console.error("Error uploading image to Cloudinary:", uploadError);
                return null;
            }
        });
        const uploadedImages = await Promise.all(uploadPromises);

        return uploadedImages.filter((url) => url !== null) as string[];
    }
    catch (error) {
        console.log("Error uploading images to Cloudinary:", error);
        return null;
    }
}