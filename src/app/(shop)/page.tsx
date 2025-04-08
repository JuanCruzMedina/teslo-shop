import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { Product } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";

const products = initialData.products;

export default function Home() {
  return (
    <div>
      <Title title={"Shop"} subtitle={"Welcome to the shop!"}></Title>
      <ProductGrid products={products as Product[]} />
    </div>
  );
}
