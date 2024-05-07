"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

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

const Header_mobile_nav = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const renderItems = () =>
    items.map((item, index) => (
      <li key={index} className='group py-4 px-8'>
        {item.url ? (
          <Link href={item.url} className='text-gray-300 block text-xl'>
            {item.name}
          </Link>
        ) : (
          <button
            className='text-gray-300 flex hover:cursor-default text-xl'
            onClick={() =>
              setActiveDropdown(activeDropdown === index ? null : index)
            }
          >
            {item.name}
            <ChevronDownIcon
              className={`h-6 w-6 mr-1 inline ${
                activeDropdown === index ? "rotate-0" : "rotate-90"
              } transition-transform transform duration-500`}
            />
          </button>
        )}
        {item.children && renderChildren(item.children, index)}
      </li>
    ));

  const renderChildren = (
    children: { name: string; url: string; icon: string }[],
    index: number
  ) => (
    <ul
      className={`${
        activeDropdown === index ? "max-h-[300px] flex" : "max-h-0 block"
      } flex-col flex-wrap bg-gray-700 z-10 transition-maxHeight duration-500 overflow-y-hidden`}
    >
      {children.map((child, index) => (
        <li key={index} className='flex flex-col gap-1'>
          <Link
            href={child.url}
            className='text-gray-300 hover:bg-gray-600 hover:text-white rounded-md px-3 py-[6px] text-base font-medium'
          >
            {child.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className='min-h-full bg-gray-800' id='mobile-menu'>
      <ul className='space-y-1 px-2 pb-3 pt-2 list-none'>{renderItems()}</ul>
    </div>
  );
};

export default Header_mobile_nav;
