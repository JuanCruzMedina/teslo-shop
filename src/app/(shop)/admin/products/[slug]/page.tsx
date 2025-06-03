import { getCategories } from "@/actions/categories/get-categories";
import { getProductBySlugWithImages } from "@/actions/products/get-product-by-slug-with-images";
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
  const product = await getProductBySlugWithImages(slug);
  const categories = await getCategories();

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }
  const title = slug === "new" ? "New Product" : "Edit Product";

  const productWithImages = {
    ...product,
    productImages: product?.images,
    images: product?.images.map((img: { url: string }) => img.url),
  };
  return (
    <>
      <Title title={title} />
      <ProductForm
        product={product == null ? {} : productWithImages}
        categories={categories}
      />
    </>
  );
}
