"use client";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { getSummaryInformation } = useCartStore();
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return <p>Loading...</p>;
  const { numberOfProducts, subtotal, taxes, total } = getSummaryInformation();

  return (
    <div className="grid grid-cols-2">
      <span>Number of products</span>
      <span className="text-right">{numberOfProducts} articles</span>
      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subtotal)}</span>
      <span>Taxes</span>
      <span className="text-right">{currencyFormat(taxes)}</span>
      <span className="mt-5 text-2xl">Total</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
