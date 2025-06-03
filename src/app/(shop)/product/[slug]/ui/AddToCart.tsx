"use client";

import { buttonStyles } from "@/app/styles";
import { QuantitySelector } from "@/components/products/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/products/size-selector/SizeSelector";
import { CartProduct, Product, Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartItem: CartProduct = {
      id: product.id,
      quantity,
      slug: product.slug,
      title: product.title,
      size: size as Size,
      price: product.price,
      image: product.images[1],
    };

    addProductToCart(cartItem);
    setPosted(false);
    setSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe de seleccionar una talla*
        </span>
      )}

      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={setSize}
      />
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      <button className={`${buttonStyles.primary} my-6`} onClick={addToCart}>
        Add to Cart
      </button>
    </>
  );
};
