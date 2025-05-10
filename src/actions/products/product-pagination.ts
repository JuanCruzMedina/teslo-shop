"use server";
import { prisma } from "@/lib/prisma";
import { Gender } from "../../../generated/prisma/client";

interface PaginationOptions {
  page: number;
  take: number;
  gender?: Gender;
}

export const getPaginatedProductWithImages = async (
  { page, take, gender }: PaginationOptions = { page: 1, take: 12, gender: undefined }
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
      where: {
        gender: gender ? (gender as Gender) : undefined,
      },
      include: {
        images: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });
    const totalCount = await prisma.product.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
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
