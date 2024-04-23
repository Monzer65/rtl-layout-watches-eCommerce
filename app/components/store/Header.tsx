"use client";

import Image, { StaticImageData } from "next/image";
import Search from "../Search";
import Link from "next/link";
import Header_desktop_nav from "./Header_desktop_nav";
import {
  ArrowRightEndOnRectangleIcon,
  Bars4Icon,
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Header_mobile_nav from "./Header_mobile_nav";
import { useEffect, useState } from "react";

const Header = ({ logo }: { logo: StaticImageData }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`shadow-lg fixed ${
        open ? "top-0" : "top-auto"
      } bottom-0 md:bottom-auto inset-x-0 shadow-inner shadow-gray-300 md:shadow-[0_3px_5px_rgba(50,50,50,0.75)] bg-white z-10`}
    >
      {open && (
        <nav className='md:hidden sticky inset-0 h-[calc(100%_-_4.25rem)] z-10 overflow-auto'>
          <Header_mobile_nav />
        </nav>
      )}
      <div
        className={`flex items-center justify-between gap-2 md:px-8 md:py-4 md:border-b`}
      >
        <Image
          src={logo}
          alt='logo'
          width={100}
          height={100}
          className='hidden md:block'
        />
        <div className='hidden md:block flex-1 max-w-[640px]'>
          <Search placeholder='جستجو...' />
        </div>
        <div className='grid grid-cols-4 md:flex md:gap-2 md:items-center md:justify-between w-full md:w-auto md:px-8 md:p-0 [&>*]:hover:opacity-50 md:[&>*]:hover:opacity-100'>
          <button
            className={`${
              open ? "" : ""
            } flex flex-col md:hidden gap-1 items-center rounded-md hover:!opacity-100 py-2`}
            onClick={() => setOpen(!open)}
          >
            {/* <span className='absolute -inset-0.5' /> */}
            <span className='sr-only'>Open main menu</span>
            {open ? (
              <>
                <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                بستن منو
              </>
            ) : (
              <>
                <Bars4Icon className='block h-6 w-6' aria-hidden='true' />
                دسته ها
              </>
            )}
          </button>
          <Link
            href={"/"}
            className='flex flex-col lg:flex-row gap-1 items-center md:border border-gray-200 rounded-md md:px-4 py-2 hover:!opacity-100'
          >
            <ArrowRightEndOnRectangleIcon className='h-6 w-6 text-gray-500' />
            <p className='md:hidden lg:block'>ورود | ثبت نام</p>
          </Link>
          <Link
            href={"/"}
            className='flex flex-col lg:flex-row gap-1 items-center md:border border-gray-200 rounded-md md:px-4 py-2 hover:!opacity-100'
          >
            <ShoppingBagIcon className='h-6 w-6 text-gray-500' />
            <p className='md:hidden lg:block'>سبد خرید </p>
          </Link>
          <Link
            href={"/"}
            className='flex flex-col md:hidden gap-1 items-center rounded-md hover:!opacity-100 py-2'
          >
            <HomeIcon className='h-6 w-6 text-gray-500' />
            خانه
          </Link>
        </div>
      </div>
      <Header_desktop_nav />
    </header>
  );
};

export default Header;
