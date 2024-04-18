"use client";

import {
  ArrowRightEndOnRectangleIcon,
  Bars4Icon,
  HomeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header_nav = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setScrollPos(currentScrollPos);
      setVisible(scrollPos > currentScrollPos || currentScrollPos < 40);
      // console.log(scrollPos, currentScrollPos, visible);
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrollPos, visible]);

  return (
    <nav
      className={`gap-2 transition-maxHeight ease-out
      duration-500 ${
        visible ? "max-h-20" : "max-h-0"
      } overflow-hidden px-8 hidden md:flex bg-gray-800`}
    >
      <Link
        href={"/link-1"}
        className='bg-gray-900 text-white rounded-md px-3 py-2 my-2 text-sm font-medium" aria-current="page"'
      >
        Link 1
      </Link>
      <Link
        href={"/link-2"}
        className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 my-2 text-sm font-medium'
      >
        Link 2
      </Link>
      <Link
        href={"/link-3"}
        className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 my-2 text-sm font-medium'
      >
        Link 3
      </Link>
      <Link
        href={"/link-4"}
        className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 my-2 text-sm font-medium'
      >
        Link 4
      </Link>
    </nav>
  );
};

export default Header_nav;
