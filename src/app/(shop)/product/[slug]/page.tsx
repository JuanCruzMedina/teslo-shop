import { buttonStyles } from "@/app/styles";
import { titleFont } from "@/config/fonts";
import { Product } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import Image from "next/image";
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
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <Image
          src={`/products/${product.images[0]}`}
          alt={product.title}
          width={800}
          height={800}
        ></Image>
      </div>
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        <button className={`${buttonStyles.primary} my-6`}>Add to Cart</button>
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
