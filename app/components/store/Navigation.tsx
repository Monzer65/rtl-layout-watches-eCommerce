"use client";

import Image from "next/image";
import logo from "@/public/images/logo.svg";
import Link from "next/link";
import Search from "../Search";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Bars4Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const items = [
  { name: "Home", url: "/" },
  {
    name: "Tutorials",
    children: [
      { name: "Beginner", url: "/tutorials/beginner" },
      { name: "Intermediate", url: "/tutorials/intermediate" },
      { name: "Advanced", url: "/tutorials/advanced" },
    ],
  },
  {
    name: "Services",
    children: [
      { name: "item 1", url: "/services/item_1" },
      { name: "item 2", url: "/services/item_2" },
      { name: "item 3", url: "/services/item_3" },
      { name: "item 4", url: "/services/item_4" },
    ],
  },
];

const renderItems = () =>
  items.map((item, index) => (
    <li key={index}>
      {item.url ? (
        <Link href={item.url}>{item.name}</Link>
      ) : (
        <span className='flex gap-4'>
          {item.name}
          <ChevronDownIcon className='h-6 w-6 text-gray-500' />
        </span>
      )}
      {item.children && renderChildren(item.children)}
    </li>
  ));

const renderChildren = (children: { name: string; url: string }[]) => (
  <ul className='sub-menu list-none'>
    {children.map((child, index) => (
      <li key={index}>
        <Link href={child.url}>{child.name}</Link>
      </li>
    ))}
  </ul>
);

const Navigation = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-2 px-8 py-2 shadow-lg relative text-xs sm:text-sm'>
      <div className='flex flex-col lg:flex-row lg:items-center gap-2 md:gap-4 flex-1 lg:max-w-[850px] order-2 lg:order-1'>
        <Link href={"/"} className='hidden sm:block'>
          <Image
            src={logo}
            alt='logo'
            className='max-w-[60px] sm:max-w-[100px] md:max-w-[150px] absolute top-8 left-8 lg:static max-[260px]:hidden'
          />
        </Link>
        <div className='hidden sm:flex gap-2'>
          <button
            className={`relative z-20 flex flex-col sm:flex-row lg:hidden gap-1 items-center sm:border border-gray-200 rounded-md sm:px-4 sm:py-2 ${
              toggled ? "hamburger close" : "hamburger"
            }`}
            onClick={() => setToggled(!toggled)}
          >
            <Bars4Icon className='h-6 w-6 text-gray-500 ' />
            دسته ها
          </button>
          <Search placeholder='جستجو...' />
        </div>
      </div>
      <nav className='flex items-center justify-between sm:justify-start gap-2 mt-4 lg:mt-0 order-1 lg:order-2'>
        <button
          className={`relative z-20 flex flex-col sm:flex-row sm:hidden gap-1 items-center sm:border border-gray-200 rounded-md sm:px-4 sm:py-2${
            toggled ? "hamburger close" : "hamburger"
          }`}
          onClick={() => setToggled(!toggled)}
        >
          <Bars4Icon className='h-6 w-6 text-gray-500 ' />
          دسته ها
        </button>
        <Link
          href={"/"}
          className='flex flex-col sm:flex-row gap-1 items-center sm:border border-gray-200 rounded-md sm:px-4 sm:py-2'
        >
          <ArrowRightEndOnRectangleIcon className='h-6 w-6 sm:h-4 sm:w-4 md:h-6 md:w-6 text-gray-500' />
          ورود | ثبت نام
        </Link>
        <Link
          href={"/"}
          className='flex flex-col sm:flex-row gap-1 items-center sm:border border-gray-200 rounded-md sm:px-4 sm:py-2'
        >
          <ShoppingBagIcon className='h-6 w-6 sm:h-4 sm:w-4 md:h-6 md:w-6 text-gray-500' />
          <p className=''>سبد خرید </p>
        </Link>
        <Link
          href={"/"}
          className='flex flex-col sm:flex-row sm:hidden gap-1 items-center sm:border border-gray-200 rounded-md sm:px-4 sm:py-2'
        >
          <HomeIcon className='h-6 w-6 text-gray-500 ' />
          خانه
        </Link>
      </nav>
      <ul
        className={`absolute top-0 bottom-0 left-0 right-0 z-10 flex flex-col gap-3 bg-white overflow-hidden transition-all transform ease-in-out ${
          toggled ? "m-h-[500px]" : "max-h-0"
        }`}
      >
        {renderItems()}
      </ul>
    </div>
  );
};

export default Navigation;
