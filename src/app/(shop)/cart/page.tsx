import { buttonStyles } from "@/app/styles";
import { ProductsInCart } from "@/components/ui/ProductsInCart";
import { Title } from "@/components/ui/title/Title";
import { Product } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CartPage() {
  const getProductsInCart = () => {
    return [
      initialData.products[0],
      initialData.products[1],
      initialData.products[2],
    ].map((product, index) => ({
      ...product,
      id: `product-${index}`, // Add a unique id for each product
    })) as Product[]; // TODO: Replace with actual cart data
  };
  const productsInCart = getProductsInCart();
  if (productsInCart.length === 0) {
    redirect("/empty");
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={"Cart"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add items</span>
            <Link href="/" className="underline mb-5">
              Continue shopping
            </Link>
            <hr className="my-5" />
            <ProductsInCart />
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              <span>Number of products</span>
              <span className="text-right">3 articles</span>
              <span>Subtotal</span>
              <span className="text-right">$99.99</span>
              <span>Taxes</span>
              <span className="text-right">$9.99</span>
              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$109.98</span>
            </div>
            <div>
              <Link
                href="/checkout/address"
                className={`${buttonStyles.primary} flex justify-center w-full mb-2 mt-5`}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
