"use client";

import { useCartStore } from "@/store/cart/cart-store";
import { redirect } from "next/navigation";

import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;
  if (productsInCart.length === 0) redirect("/empty");

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
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
            <span className="sm:col-span-3">
              {product.title} ({product.size}) x {product.quantity}
            </span>
            <p className="text-right font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
