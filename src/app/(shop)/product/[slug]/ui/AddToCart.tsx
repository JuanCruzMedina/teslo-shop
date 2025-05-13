"use client";

import { buttonStyles } from "@/app/styles";
import { QuantitySelector } from "@/components/products/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/products/size-selector/SizeSelector";
import { Product } from "@/interfaces/product.interface";
import { useState } from "react";
import { Size } from "../../../../../../generated/prisma/client";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    const cartItem = {
      productId: product.id,
      quantity,
      size,
    };

    console.log(cartItem);
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
