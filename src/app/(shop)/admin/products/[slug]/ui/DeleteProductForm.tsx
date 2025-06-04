"use client";

import deleteProduct from "@/actions/products/delete-product";
import { buttonStyles } from "@/app/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsExclamationCircle, BsTrash } from "react-icons/bs";

interface Props {
  productId: string;
  className?: string;
}

export const DeleteProductForm = ({ productId, className }: Props) => {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    setErrorMessage(null);
    setConfirming(false);
    const response = await deleteProduct(productId);
    if (response.ok) {
      console.log("Product deleted successfully");
      router.replace("/admin/products"); // Redirect to products list
    } else {
      console.log("Failed to delete product");
      setErrorMessage(response.message || "Failed to delete product");
    }
  };

  return (
    <div className={`flex-col ml-4 md:ml-0 ${className}`}>
      <button
        type="button"
        className={`rounded ${buttonStyles.danger} flex flex-1 items-center gap-2`}
        onClick={() => setConfirming(true)}
        hidden={confirming}
      >
        <BsTrash />
        Delete Product
      </button>

      {/* Confirmación inline */}
      {confirming && (
        <div className="flex flex-col items-center gap-2 animate-fade-in-slow w-full sm:w-auto justify-start items-start">
          <span className="text-sm text-gray-700 mb-2 sm:mb-0">
            Are you sure you want to delete this product?
          </span>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              onClick={() => setConfirming(false)}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 rounded ${buttonStyles.danger} transition`}
              onClick={handleDelete}
            >
              Yes, delete
            </button>
          </div>
        </div>
      )}

      {/* Error message above the Save button */}
      {errorMessage && !confirming && (
        <div className="flex mt-5 gap-1 md:gap-2">
          <BsExclamationCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500 whitespace-pre-line break-words">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};
