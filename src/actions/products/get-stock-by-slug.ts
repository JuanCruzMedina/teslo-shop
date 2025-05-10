import { prisma } from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                slug: slug,
            },
            select: {
                inStock: true,
            },
        });

        if (!product) {
            return 0;
        }

        return product.inStock;
    }
    catch (error) {
        console.error("Error fetching product stock:", error);
        return 0;
    }
};