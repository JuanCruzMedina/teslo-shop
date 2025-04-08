"use client";
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
  return (
    <div>
      {/* background black */}
      <div className="fixed top-0 left-0 w-screen h-screen bg-black z-10 opacity-30"></div>
      {/* background blur */}
      <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xs"></div>
      {/* Add sidebar content here */}
      // todo: add effect
      <nav className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300">
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            // close sidebar
          }}
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
        <SideBarItem
          icon={<IoPersonOutline size={30} />}
          text="Profile"
          link="/"
        />
        <SideBarItem
          icon={<IoTicketOutline size={30} />}
          text="Orders"
          link="/"
        />
        <SideBarItem
          icon={<IoLogInOutline size={30} />}
          text="Login"
          link="/"
        />
        <SideBarItem
          icon={<IoLogOutOutline size={30} />}
          text="Logout"
          link="/"
        />
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
  return (
    <Link
      href={link}
      className="flex items-center p-2 mt-10 hover:bg-gray-100 rounded transition-all"
    >
      {icon}
      <span className="ml-3 text-xl">{text}</span>
    </Link>
  );
};
