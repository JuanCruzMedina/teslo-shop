"use client";

import { QuantitySelector } from "@/components/products/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/cart/cart-store";
import { redirect } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );
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
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer sm:col-span-3 font-bold text-md"
            >
              {product.title} - {product.size}
            </Link>
            <p className="text-right font-bold">${product.price}</p>
            <div className="sm:col-span-3">
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChange={(quantity) =>
                  updateProductQuantity(product, quantity)
                }
              />
            </div>
            <button
              className="underline text-sm text-right"
              onClick={() => removeProductFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
