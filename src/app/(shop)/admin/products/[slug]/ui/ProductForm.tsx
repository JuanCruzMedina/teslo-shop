"use client";

import { createOrUpdateProduct } from "@/actions/products/create-update-product";
import { deleteProductImage } from "@/actions/products/delete-product-image";
import { buttonStyles } from "@/app/styles";
import { ProductImage } from "@/components/products/product-image/ProductImage";
import { Category } from "@/interfaces/category.interface";
import { Product } from "@/interfaces/product.interface";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsExclamationCircle } from "react-icons/bs";

interface Props {
  product: Partial<Product> & {
    productImages?: {
      id: number;
      url: string;
    }[];
  };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const { register, handleSubmit, getValues, setValue, watch } =
    useForm<FormInputs>({
      defaultValues: {
        ...product,
        tags: product.tags?.join(", "),
        sizes: product.sizes || [],
        images: undefined,
      },
    });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  watch("sizes");

  const onSubmit = async (data: FormInputs) => {
    setErrorMessage(null);
    const formData = new FormData();
    const { images, ...productToSave } = data;
    if (product.id) {
      formData.append("id", product.id ?? "");
    }
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("gender", productToSave.gender);
    formData.append("categoryId", productToSave.categoryId);

    if (images) {
      Array.from(images).forEach((image) => {
        formData.append("images", image);
      });
    }

    const {
      ok,
      message,
      product: updatedOrCreatedProduct,
    } = await createOrUpdateProduct(formData);
    if (!ok) {
      setErrorMessage(message || "Error saving product");
      return;
    }
    router.replace(`/admin/products/${updatedOrCreatedProduct!.slug}`);
  };

  const onSizeChanged = (size: string) => {
    console.log("Size changed:", size);
    const currentSizes = new Set(getValues("sizes"));
    if (currentSizes.has(size)) {
      currentSizes.delete(size);
    } else {
      currentSizes.add(size);
    }
    setValue("sizes", Array.from(currentSizes));
  };

  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-8 rounded-xl p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Text fields */}
      <div className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="Product title"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Slug</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="product-slug"
            {...register("slug", { required: true })}
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
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Price</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="0.00"
            {...register("price", {
              required: true,
              min: 0,
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Tags</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="tag1, tag2"
            {...register("tags", { required: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Gender</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            {...register("gender", { required: true })}
          >
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Error message above the Save button */}
        {errorMessage && (
          <div className="flex items-center justify-center mt-5">
            <BsExclamationCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition"
        >
          Save
        </button>
      </div>

      {/* Sizes and photos */}
      <div className="w-full flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold mb-1">In stock</label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            placeholder="0"
            {...register("inStock", {
              required: true,
              min: 0,
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <span className="block text-sm font-semibold mb-2">Sizes</span>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "flex items-center justify-center w-12 h-12 border rounded-lg font-semibold transition",
                  getValues("sizes").includes(size)
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
            {...register("images")}
            multiple
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 transition"
            // accept="image/png, image/jpeg"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {product.productImages?.map((image) => (
            <div key={image.id}>
              <ProductImage
                alt={product.title ?? ""}
                src={image.url}
                width={300}
                height={300}
                className="rounded-t shadow-md"
              />

              <button
                type="button"
                className={`${buttonStyles.danger} w-full rounded-b-xl`}
                onClick={async () => deleteProductImage(image.id, image.url)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
