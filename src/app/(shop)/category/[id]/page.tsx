import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

const validCategories = ["men", "women", "kids"];

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  if (!id) {
    throw new Error("Category ID is required");
  }
  if (!validCategories.includes(id)) {
    notFound();
  }


  return <div>Category: {id}</div>;
}
