import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    redirect("/admin/products");
  }
  const title = slug === "new" ? "New Product" : "Edit Product";
  return (
    <>
      <Title title={title} />
      <ProductForm product={product} />
    </>
  );
}
