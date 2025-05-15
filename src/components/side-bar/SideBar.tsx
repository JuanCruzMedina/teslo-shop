"use client";
import { logout } from "@/actions/auth/logout";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const SideBar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  return (
    <div>
      {/* background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black z-10 opacity-30"></div>
      )}
      {/* background blur */}
      {isSideMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xs"
          onClick={closeSideMenu}
        ></div>
      )}
      {/* Add sidebar content here */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />
        {/* input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        {!isAuthenticated ? (
          <SideBarItem
            icon={<IoLogInOutline size={30} />}
            text="Login"
            link="/auth/login"
          />
        ) : (
          <>
            <SideBarItem
              icon={<IoPersonOutline size={30} />}
              text="Profile"
              link="/profile"
            />
            <SideBarItem
              icon={<IoTicketOutline size={30} />}
              text="Orders"
              link="/"
            />
            <button
              className="flex w-full items-center p-2 mt-10 hover:bg-gray-100 rounded transition-all"
              onClick={async () => {
                await logout();
                closeSideMenu();
                window.location.reload();
              }}
            >
              {<IoLogOutOutline size={30} />}
              <span className="ml-3 text-xl">Logout</span>
            </button>
          </>
        )}
        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-10"></div>
            <SideBarItem
              icon={<IoShirtOutline size={30} />}
              text="Products"
              link="/"
            />
            <SideBarItem
              icon={<IoTicketOutline size={30} />}
              text="Orders"
              link="/"
            />
            <SideBarItem
              icon={<IoPeopleOutline size={30} />}
              text="Users"
              link="/"
            />
          </>
        )}
      </nav>
    </div>
  );
};

const SideBarItem = ({
  icon,
  text,
  link,
}: {
  icon: React.ReactNode;
  text: string;
  link: string;
}) => {
  const closeSideMenu = useUiStore((state) => state.closeSideMenu);
  return (
    <Link
      href={link}
      className="flex items-center p-2 mt-10 hover:bg-gray-100 rounded transition-all"
      onClick={() => closeSideMenu()}
    >
      {icon}
      <span className="ml-3 text-xl">{text}</span>
    </Link>
  );
};
