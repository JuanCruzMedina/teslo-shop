"use server";
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

const deleteProduct = async (productId: string) => {
    try {
        const isBeingUsed = await prisma.orderItem.findFirst({
            where: { productId },
            select: { id: true }
        });

        if (isBeingUsed) {
            return { ok: false, message: "Cannot delete product that is being used in an order" };
        }

        const result = await prisma.$transaction(async (tx) => {

            const productImages = await tx.productImage.findMany({
                where: { productId },
                select: { id: true, url: true }
            });

            if (productImages.length > 0) {
                const externalImages = productImages.filter(image => image.url.startsWith("http"));

                await Promise.all(
                    externalImages.map(async (image) => {
                        const imageName = image.url.split("/").pop()?.split(".")[0];
                        if (!imageName) {
                            console.error("Image name could not be extracted from URL while deleting:", image.url);
                            return;
                        }

                        try {
                            await cloudinary.uploader.destroy(imageName);
                            await tx.productImage.delete({
                                where: { id: image.id }
                            });
                        } catch (imageError) {
                            console.error(`Failed to delete image ${imageName}:`, imageError);
                        }
                    })
                );
            }

            const deletedProduct = await tx.product.delete({
                where: { id: productId },
                select: { slug: true }
            });

            return { slug: deletedProduct.slug };
        });

        revalidatePath(`/admin/products`);
        revalidatePath(`/admin/products/${result.slug}`);
        revalidatePath(`/product/${result.slug}`);

        return { ok: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { ok: false, message: "Failed to delete product" };
    }
};

export default deleteProduct;
