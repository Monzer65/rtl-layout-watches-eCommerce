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

const Header_desktop_nav = () => {
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
    {
      name: "دسته بندیها",
      children: [
        {
          name: "مردانه",
          url: "/products?category=mens",
          icon: "",
          subChildren: [{ name: "", url: "", icon: "" }],
        },
        {
          name: "زنانه",
          url: "/products?category=womens",
          icon: "",
          subChildren: [{ name: "", url: "", icon: "" }],
        },
        {
          name: "بچگانه",
          url: "/products?category=kids",
          icon: "",
          subChildren: [{ name: "", url: "", icon: "" }],
        },
        {
          name: "زیورآلات",
          url: "/products?category=jewelleries",
          icon: "",
          subChildren: [{ name: "", url: "", icon: "" }],
        },
        {
          name: "اکسسوری",
          url: "/products?category=accessories",
          icon: "",
          subChildren: [{ name: "", url: "", icon: "" }],
        },
      ],
    },
    {
      name: "برندها",
      children: [
        { name: "Cartier", url: "/services/item_1", icon: "" },
        { name: "Citizen", url: "/services/item_2", icon: "" },
        { name: "Fussil", url: "/services/item_3", icon: "" },
        { name: "Rolex", url: "/services/item_4", icon: "" },
        { name: "Tissot", url: "/services/item_4", icon: "" },
        { name: "Seiko", url: "/services/item_4", icon: "" },
        { name: "Tudor", url: "/services/item_4", icon: "" },
        { name: "Omega", url: "/services/item_4", icon: "" },
        { name: "Cartier", url: "/services/item_1", icon: "" },
        { name: "Citizen", url: "/services/item_2", icon: "" },
        { name: "Fussil", url: "/services/item_3", icon: "" },
        { name: "Rolex", url: "/services/item_4", icon: "" },
        { name: "Tissot", url: "/services/item_4", icon: "" },
        { name: "Seiko", url: "/services/item_4", icon: "" },
        { name: "Tudor", url: "/services/item_4", icon: "" },
        { name: "Omega", url: "/services/item_4", icon: "" },
        { name: "Cartier", url: "/services/item_1", icon: "" },
        { name: "Citizen", url: "/services/item_2", icon: "" },
        { name: "Fussil", url: "/services/item_3", icon: "" },
        { name: "Rolex", url: "/services/item_4", icon: "" },
        { name: "Tissot", url: "/services/item_4", icon: "" },
        { name: "Seiko", url: "/services/item_4", icon: "" },
        { name: "Tudor", url: "/services/item_4", icon: "" },
        { name: "Omega", url: "/services/item_4", icon: "" },
      ],
    },
    { name: "جدیدترین ها", url: "/store/products/new-arrival" },
    { name: "پرفروشترین ها", url: "/store/products/best-sellers" },
    { name: "سوالات پرتکرار", url: "/store/faq" },
    { name: "مجله", url: "/blog/magazine" },
  ];

  const renderItems = () =>
    items.map((item, index) => (
      <li key={index} className='group py-4 text-gray-700'>
        {item.url ? (
          <>
            <Link href={item.url} className=' block'>
              {item.name}
            </Link>
          </>
        ) : (
          <span className='flex hover:cursor-default'>
            {item.name}
            <ChevronDownIcon className='h-6 w-6 mr-1 inline rotate-90 group-hover:rotate-0 transition-transform transform' />
          </span>
        )}
        {item.children && renderChildren(item.children)}
        <span className='relative top-3 h-1 w-0 group-hover:w-full transition-all duration-300 bg-red-700 hidden md:block'></span>
      </li>
    ));

  const renderChildren = (
    children: { name: string; url: string; icon: string }[]
  ) => (
    <ul
      className={`hidden group-hover:flex flex-col flex-wrap absolute top-[57px] right-0 left-0 bg-gray-100 px-8 py-4 group-hover:max-h-[300px] z-10 overflow-y-hidden`}
    >
      {children.map((child, index) => (
        <li key={index} className='flex flex-col gap-1'>
          <Link
            href={child.url}
            className='text-gray-700 hover:bg-gray-200 hover:text-gray-800 rounded-md px-3 py-[6px] text-sm font-medium'
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
        visible ? "max-h-[300px]" : "max-h-0 overflow-hidden"
      }  px-8 hidden md:flex bg-gray-50 `}
    >
      <ul className='flex gap-4 justify-center list-none'>{renderItems()}</ul>
    </nav>
  );
};

export default Header_desktop_nav;
