"use client";

import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [inStock, setInStock] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    setLoading(true);
    const inStock = await getStockBySlug(slug);
    setInStock(inStock);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-lg bg-gray-100 animated-pulse`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {inStock}
        </h1>
      )}
    </>
  );
};
