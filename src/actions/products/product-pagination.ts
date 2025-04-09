"use server";
import { prisma } from "@/lib/prisma";

interface PaginationOptions {
  page: number;
  take: number;
}

export const getPaginatedProductWithImages = async (
  { page, take }: PaginationOptions = { page: 1, take: 12 }
) => {
  if (isNaN(Number(page)) || isNaN(Number(take))) {
    throw new Error("Invalid pagination parameters");
  }
  if (page < 1) {
    page = 1;
  }
  if (take < 1) {
    take = 12;
  }
  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        images: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    return {
      currentPage: 1,
      products: products.map((product) => ({
        ...product,
        images: product.images.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch products");
  }
};
