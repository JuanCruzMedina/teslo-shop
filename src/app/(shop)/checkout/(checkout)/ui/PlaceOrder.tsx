"use client";

import { placeOrder } from "@/actions/order/placer-order";
import { buttonStyles } from "@/app/styles";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { getSummaryInformation } = useCartStore();
  const address = useAddressStore((state) => state.address);
  const productsInCart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToOrder = productsInCart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    const response = await placeOrder(productsToOrder, address);

    if (!response.ok) {
      setIsPlacingOrder(false);
      setError(response.message);
      return;
    }

    clearCart();
    router.replace("/orders/" + response.order?.id);
  };

  if (!loaded) return <p>Loading...</p>;

  const { numberOfProducts, subtotal, taxes, total } = getSummaryInformation();

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-7">
        <h2 className="text-2xl mb-2">Shipping address</h2>

        <div className="mb-10">
          <p className="text-xl">
            {address.firstName} {address.lastName}
          </p>
          <p>
            {address.address} {address.address2}
          </p>
          <p>
            {address.country}, {address.city}
          </p>
          <p>Postal Code: {address.postalCode}</p>
          <p>Phone: {address.phone}</p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

        <h2 className="text-2xl mb-2">Order summary</h2>
        <div className="grid grid-cols-2">
          <span>Number of products</span>
          <span className="text-right">{numberOfProducts} articles</span>
          <span>Subtotal</span>
          <span className="text-right">{currencyFormat(subtotal)}</span>
          <span>Taxes</span>
          <span className="text-right">{currencyFormat(taxes)}</span>
          <span className="mt-5 text-2xl">Total</span>
          <span className="mt-5 text-2xl text-right">
            {currencyFormat(total)}
          </span>
        </div>
        <div className="mt-5 mb-2 w-full">
          <div className="mb-5">
            <span className="text-xs">
              By clicking &quot;Order&quot;, you agree to our{" "}
              <Link href="/terms" className="underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          {error && (
            <div className="mb-5">
              <span className="text-red-500 text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={onPlaceOrder}
            disabled={isPlacingOrder}
            className={clsx(
              "flex justify-center w-full mb-2",
              isPlacingOrder ? buttonStyles.disabled : buttonStyles.primary
            )}
          >
            Order
          </button>
        </div>
      </div>
    </>
  );
};
