import { ProductGrid } from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { Category, Product } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";

interface CategoryPageProps {
  params: {
    id: Category;
  };
}

const getProductsByCategory = async (category: Category) => {
  const filteredProducts = initialData.products.filter(
    (product) => product.gender === category
  );
  return filteredProducts;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  if (!id) {
    throw new Error("Category ID is required");
  }
  // if (ValidCategories.indexOf(id as ValidCategories) === -1) {
  //   notFound();
  // }

  const products = await getProductsByCategory(id);
  const titleByCategory: Record<Category, string> = {
    men: "Men's Collection",
    women: "Women's Collection",
    kid: "Kids' Collection",
    unisex: "Unisex Collection",
  };
  const subtitleByCategory: Record<Category, string> = {
    men: "Explore our men's products",
    women: "Discover our women's range",
    kid: "Check out our kids' items",
    unisex: "Shop our unisex selection",
  };

  return (
    <div>
      <Title
        title={titleByCategory[id]}
        subtitle={subtitleByCategory[id]}
      ></Title>
      <ProductGrid products={products as Product[]} />
    </div>
  );
}
