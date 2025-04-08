import { buttonStyles } from "@/app/styles";
import { QuantitySelector } from "@/components/products/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/products/size-selector/SizeSelector";
import ProductSlideShow from "@/components/products/slide-show/ProductSlideShow";
import { titleFont } from "@/config/fonts";
import { Product } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
interface ProductPageProps {
  params: {
    slug: string;
  };
}

function getProductBySlug(slug: string) {
  const product = initialData.products.find((product) => product.slug === slug);
  return product as Product;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  console.log("slug", slug);
  const product: Product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <ProductSlideShow images={product.images} title={product.title} />
      </div>
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        <QuantitySelector quantity={1} />
        <button className={`${buttonStyles.primary} my-6`}>Add to Cart</button>
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
