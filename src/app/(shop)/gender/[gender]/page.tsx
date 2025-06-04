export const revalidate = 60; // 60 seconds

import { getPaginatedProductWithImages } from "@/actions/products/product-pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/Title";
import { Product } from "@/interfaces/product.interface";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface GenderPageProps {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function GenderPage({
  params,
  searchParams,
}: GenderPageProps) {
  const { gender } = await params;
  const { page } = await searchParams;

  if (!gender) {
    throw new Error("Category ID is required");
  }

  const { products, totalPages } = await getPaginatedProductWithImages({
    page: Number(page) || 1,
    take: 12,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  // if (ValidCategories.indexOf(gender as ValidCategories) === -1) {
  //   notFound();
  // }

  const titleByGender: Record<string, string> = {
    men: "Men's Collection",
    women: "Women's Collection",
    kid: "Kids' Collection",
    unisex: "Unisex Collection",
  };
  const subtitleByGender: Record<string, string> = {
    men: "Explore our men's products",
    women: "Discover our women's range",
    kid: "Check out our kids' items",
    unisex: "Shop our unisex selection",
  };

  return (
    <div>
      <Title
        title={titleByGender[gender]}
        subtitle={subtitleByGender[gender]}
      ></Title>
      <ProductGrid products={products as Product[]} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
