export const revalidate = 604800; // 7 days

import { getProductBySlug } from "@/actions/products/get-product-by-slug";
import ProductMobileSlideShow from "@/components/products/slide-show/ProductMobileSlideShow";
import ProductSlideShow from "@/components/products/slide-show/ProductSlideShow";
import { StockLabel } from "@/components/products/stock-label/StockLabel";
import { titleFont } from "@/config/fonts";
import { Metadata } from "next";

import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const slug = (await params).slug;

  // fetch post information
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "No description available",
    openGraph: {
      title: product?.title ?? "Product not found",
      description: product?.description ?? "No description available",
      images: [{ url: `products/${product?.images[1]}` }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* mobile */}
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
        {/* desktop */}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <StockLabel slug={product.slug} />
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
