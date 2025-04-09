import { titleFont } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800]px w-full items-center justify-center h-screen align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">
          Whoops! We are sorry, the page you are looking for does not exist.
        </p>
        <p className="font-light mb-5">
          Please check the URL or return to the homepage.
        </p>

        <Link
          href="/"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Go to Home
        </Link>
      </div>
      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          width={550}
          height={550}
          className="p-5 sm:p-0"
          priority
        />
      </div>
    </div>
  );
};
