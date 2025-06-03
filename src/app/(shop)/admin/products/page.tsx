export const revalidate = 0;

import { getPaginatedProductWithImages } from "@/actions/products/product-pagination";
import { ProductImage } from "@/components/products/product-image/ProductImage";
import { Pagination } from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/Title";
import { currencyFormat } from "@/utils/currencyFormat";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const { products, totalPages } = await getPaginatedProductWithImages({
    page: Number(page) || 1,
    take: 12,
  });

  return (
    <>
      <Title title="Products Management" />
      <div className="flex justify-end mb-5">
        <Link
          href="/admin/products/new"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add new Product
        </Link>
      </div>
      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Gender
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>

              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.images[0]}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/products/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>

                <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>

                <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>

                <td className=" text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>

                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
