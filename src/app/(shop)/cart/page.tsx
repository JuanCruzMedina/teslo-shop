import { buttonStyles } from "@/app/styles";
import { QuantitySelector } from "@/components/products/quantity-selector/QuantitySelector";
import { Title } from "@/components/ui/title/Title";
import { Product } from "@/interfaces/product.interface";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CartPage() {
  const getProductsInCart = () => {
    return [
      initialData.products[0],
      initialData.products[1],
      initialData.products[2],
    ] as Product[];
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
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="mr-5 rounded"
                />
                <div className="grid grid-cols-2 sm:grid-cols-4 w-full">
                  <p className="sm:col-span-3 font-bold text-md">
                    {product.title}
                  </p>
                  <p className="text-right font-bold">${product.price}</p>
                  <div className="sm:col-span-3">
                    <QuantitySelector quantity={1} />
                  </div>
                  <button className="underline text-sm text-right">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">
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
