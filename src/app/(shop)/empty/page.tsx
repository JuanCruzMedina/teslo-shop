import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyCartPage() {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={80} className="mx-5" />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Your cart is currently empty.</h1>
        <Link href="/">
          <span className="mt-2 text-4xl text-blue-500">Continue shopping</span>
        </Link>
      </div>
    </div>
  );
}
