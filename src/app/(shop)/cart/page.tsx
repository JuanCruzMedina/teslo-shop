import { ProductsInCart } from "@/app/(shop)/cart/ui/ProductsInCart";
import { buttonStyles } from "@/app/styles";
import { Title } from "@/components/ui/title/Title";
import Link from "next/link";
import { OrderSummary } from "./ui/OrderSummary";

export default function CartPage() {
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
            <OrderSummary />
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
