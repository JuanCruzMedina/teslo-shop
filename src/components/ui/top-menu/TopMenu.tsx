"use client";

import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store/cart/cart-store";
import { useUiStore } from "@/store/ui/ui-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openSideMenu = useUiStore((state) => state.openSideMenu);
  const totalItems = useCartStore((state) => state.getTotalItems());

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          className="mr-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Men
        </Link>
        <Link
          className="mr-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Woman
        </Link>
        <Link
          className="mr-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Kid
        </Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link
          href={loaded && totalItems > 0 ? "/cart" : "/empty"}
          className="mx-2"
        >
          <div className="relative">
            {loaded && totalItems > 0 && (
              <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white fade-in">
                {totalItems}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={openSideMenu}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
