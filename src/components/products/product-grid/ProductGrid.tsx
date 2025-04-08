import { Product } from "@/interfaces/product.interface";
import { ProductGridItem } from "./ProductGridItem";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 mb-10 gap-10">
      {products.map((product: Product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
