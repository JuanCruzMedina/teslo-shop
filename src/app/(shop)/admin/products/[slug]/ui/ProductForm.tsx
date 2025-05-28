"use client";

import { Product } from "@/interfaces/product.interface";
import clsx from "clsx";
import { useState } from "react";

interface Props {
  product: Product;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product }: Props) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-8">
      {/* Text fields */}
      <div className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="Product title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Slug</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="product-slug"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"
            placeholder="Product description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Price</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Tags</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="tag1, tag2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Gender</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition">
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition">
            <option value="">[Select]</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition"
        >
          Save
        </button>
      </div>

      {/* Sizes and photos */}
      <div className="w-full flex flex-col gap-6">
        <div>
          <span className="block text-sm font-semibold mb-2">Sizes</span>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={clsx(
                  "flex items-center justify-center w-12 h-12 border rounded-lg font-semibold transition",
                  selectedSizes.includes(size)
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="block text-sm font-semibold mb-2">Photos</span>
          <input
            type="file"
            multiple
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 transition"
            accept="image/png, image/jpeg"
          />
        </div>
      </div>
    </form>
  );
};
