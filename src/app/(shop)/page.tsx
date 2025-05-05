import { getPaginatedProductWithImages } from "@/actions/products/product-pagination";
import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { products, totalPages } = await getPaginatedProductWithImages({
    page: Number(page) || 1,
    take: 12,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <div>
      <Title title={"Shop"} subtitle={"Welcome to the shop!"}></Title>
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
