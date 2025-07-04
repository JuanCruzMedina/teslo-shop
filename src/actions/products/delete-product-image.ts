"use server";

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
    if (!imageUrl.startsWith("http")) {
        return { ok: false, message: "Cannot delete local images" };
    }
    const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? '';

    try {
        await cloudinary.uploader.destroy(imageName);
        const deletedImage = await prisma.productImage.delete({
            where: { id: imageId },
            select: {
                product: {
                    select: {
                        slug: true,
                    }
                }
            }
        });
        revalidatePath(`/admin/products`);
        revalidatePath(`/admin/products/${deletedImage.product.slug}`);
        revalidatePath(`/product/${deletedImage.product.slug}`);
        return { ok: true };
    } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
        return { ok: false, message: "Failed to delete image" };
    }
}
