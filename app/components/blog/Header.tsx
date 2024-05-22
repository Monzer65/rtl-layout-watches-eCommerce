"use client";
import {
  Bars3CenterLeftIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  // NewspaperIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import separator from "@/public/images/vertical-separator.svg";
import { useState } from "react";
import { usePathname } from "next/navigation";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import logo from "@/public/images/logo-1.svg";

const separatorImg = separator;
const navLinks = [
  {
    title: "فروشگاه",
    href: "/store",
    icon: BuildingStorefrontIcon,
  },
  {
    title: "مجله",
    href: "/blog/magazine",
    icon: BookOpenIcon,
  },
  // {
  //   title: "اخبار",
  //   href: "/blog/news",
  //   icon: NewspaperIcon,
  // },
  {
    title: "داشبورد",
    href: "/blog/dashboard",
    icon: UserIcon,
    requirePermissions: ["Read: data"],
  },
  {
    title: "ادمین",
    href: "/admin-area",
    icon: "",
    requirePermissions: ["update: data"],
  },
];

const BlogHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // const { user, isLoading, isAuthenticated, permissions } =
  //   useKindeBrowserClient();

  // const userPermissions = permissions.permissions || [];

  return (
    <header className='sticky top-0'>
      <div className='bg-black text-white text-center py-1'>تبلیغ</div>
      <div className=' flex justify-between items-center px-8 py-4 border-b border-black bg-white'>
        <div className='flex gap-2 items-center'>
          <Link href={"/blog"}>
            <Image src={logo} alt='logo' width={100} />
          </Link>
          <button aria-label='menu button' className='block'>
            <MagnifyingGlassIcon className='w-6' />
          </button>
        </div>
        <button className='sm:hidden' onClick={() => setMenuOpen(!menuOpen)}>
          <Bars3CenterLeftIcon className='w-6' />
        </button>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } sm:hidden fixed inset-0 z-10 bg-gray-600 opacity-30 `}
          onClick={() => setMenuOpen(false)}
        ></div>
        <nav
          className={`${
            menuOpen ? "-translate-x-0" : "-translate-x-full sm:-translate-x-0"
          } flex flex-col sm:flex-row gap-4 sm:gap-2 items-center w-3/4 sm:w-auto py-2 sm:py-0 text-3xl sm:text-base fixed inset-y-0 left-0 sm:static transition-all duration-500 bg-white z-20`}
        >
          <div
            className='sm:hidden px-4 w-full cursor-pointer'
            onClick={() => {
              setMenuOpen(false);
              console.log("clicked");
            }}
            aria-label='close menu button'
          >
            <XMarkIcon className='w-8' />
          </div>
          {navLinks.map((link, index) => {
            const LinkIcon = link.icon;
            // const isPermitted =
            //   !link.requirePermissions ||
            //   link.requirePermissions.every((permission) =>
            //     userPermissions.includes(permission)
            //   );

            return (
              // isPermitted && (
              <>
                <Link
                  key={link.title}
                  href={link.href}
                  className={`flex gap-1 items-center px-3 py-1 text-gray-500 font-bold hover:underline hover:text-gray-800 ${
                    pathname === link.href && "bg-sky-100 text-gray-800"
                  }`}
                >
                  {LinkIcon && <LinkIcon className='w-6 sm:w-4' />}
                  {link.title}
                </Link>
                <Image
                  src={separatorImg}
                  alt='separator'
                  width={4}
                  height={16}
                  className='hidden sm:block h-4 w-1'
                />
              </>
              // )
            );
          })}

          {/* {isLoading ? (
            <p className='animate-ping'>...</p>
          ) : !isAuthenticated && !user ? (
            <LoginLink>ورود</LoginLink>
          ) : (
            <LogoutLink>خروج</LogoutLink>
          )} */}
        </nav>
      </div>
    </header>
  );
};

export default BlogHeader;