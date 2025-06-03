"use server";

import prisma from "@/lib/prisma";




export const getProductBySlugWithImages = async (slug: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                slug: slug,
            },
            include: {
                images: {
                    select: {
                        id: true,
                        url: true,
                    },
                }
            },
        });

        if (!product) {
            return null;
        }

        return {
            ...product,
            images: product.images.map(image => ({
                id: image.id,
                url: image.url,
            })),
        };

    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}