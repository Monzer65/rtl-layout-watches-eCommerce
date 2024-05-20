"use client";
import {
  DocumentTextIcon,
  UserGroupIcon,
  ArchiveBoxIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "فاکتورها",
    href: "/admin-area/store/invoices",
    icon: DocumentTextIcon,
  },
  {
    name: "مشتریان",
    href: "/admin-area/store/customers",
    icon: UserGroupIcon,
  },
  {
    name: "محصولات",
    href: "/admin-area/store/products",
    icon: ArchiveBoxIcon,
  },
];

const StoreNavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col md:flex-row md:h-[48px] grow items-center justify-center gap-2 rounded-md md:rounded-none text-[10px] sm:text-xs md:text-sm lg:text-base font-medium hover:bg-[#5e81ac] hover:text-white md:flex-none md:justify-start p-1 md:p-2 md:px-3 ${
              pathname === link.href
                ? "bg-[#5e81ac] text-white"
                : "bg-[#d8dee9] text-[#4c566a]"
            }`}
          >
            <LinkIcon className='w-4 sm:w-5 md:w-6' />
            <p className=''>{link.name}</p>
          </Link>
        );
      })}
      <div className='hidden h-auto w-full grow bg-[#d8dee9] md:block'></div>

      <LogoutLink className='group flex h-[48px] grow items-center justify-center gap-2 rounded-md md:rounded-none bg-[#d8dee9] text-[#4c566a] text-sm font-medium hover:bg-[#5e81ac]  md:flex-none md:justify-start md:py-2 md:px-3 md:border-t'>
        {" "}
        <PowerIcon className='w-6 group-hover:text-red-400' />{" "}
        <span className='hidden md:block group-hover:text-white'>خروج</span>
      </LogoutLink>
    </>
  );
};

export default StoreNavLinks;
