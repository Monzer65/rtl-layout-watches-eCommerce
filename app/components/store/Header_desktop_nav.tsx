"use client";

import {
  ArrowRightEndOnRectangleIcon,
  Bars4Icon,
  ChevronDownIcon,
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
      <li key={index} className='group'>
        {item.url ? (
          <Link href={item.url} className='text-gray-300'>
            {item.name}
          </Link>
        ) : (
          <span className='flex gap-1 items-center justify-center text-gray-300 hover:cursor-default'>
            {item.name}
            <ChevronDownIcon className='h-6 w-6' />
          </span>
        )}
        {item.children && renderChildren(item.children)}
      </li>
    ));

  const renderChildren = (children: { name: string; url: string }[]) => (
    <ul
      className='overflow-hidden max-h-0 group-hover:max-h-[500px] transition-maxHeight ease-out
    duration-500'
    >
      {children.map((child, index) => (
        <li key={index} className='flex flex-col gap-1'>
          <Link
            href={child.url}
            className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-[6px] text-sm font-medium'
          >
            {child.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      className={`relative gap-2 transition-maxHeight ease-out
      duration-500 ${
        visible ? "max-h-[500px]" : "max-h-0"
      } overflow-hidden px-8 hidden md:flex bg-gray-800`}
    >
      <ul className='flex gap-4 list-none py-4'>{renderItems()}</ul>
      {/* <Link
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
      </Link> */}
    </nav>
  );
};

export default Header_nav;
