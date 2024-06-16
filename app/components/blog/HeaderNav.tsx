"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowsPointingInIcon,
  Bars3CenterLeftIcon,
  BookOpenIcon,
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  PowerIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "@/public/images/logo-1.svg";
import { usePathname } from "next/navigation";
import separator from "@/public/images/vertical-separator.svg";
import { logout } from "@/app/lib/actions";
import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";

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
  {
    title: "داشبورد",
    href: "/blog/dashboard",
    icon: UserIcon,
    requirePermissions: ["user"],
  },
  {
    title: "ادمین",
    href: "/admin-area",
    icon: "",
    requirePermissions: ["admin"],
  },
];
const HeaderNav = ({
  session,
}: {
  session: { username: string; roles: string[] };
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
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
          const isPermitted =
            !link.requirePermissions ||
            (session &&
              link.requirePermissions.every((permission) =>
                session.roles.includes(permission)
              ));
          if (isPermitted) {
            return (
              <React.Fragment key={index}>
                <Link
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
              </React.Fragment>
            );
          }

          return null;
        })}

        {!session ? (
          <Link
            href={"/login"}
            className='flex gap-1 items-center px-3 py-1 text-gray-500 font-bold hover:underline hover:text-gray-800'
          >
            <ArrowLeftEndOnRectangleIcon className='w-6 sm:w-4' />
            <div>ورود</div>
          </Link>
        ) : (
          <>
            <form action={logout}>
              <LogoutButton />
            </form>
            {/* <Link href={"/logout"}>خروج</Link> */}
          </>
        )}
      </nav>
    </div>
  );
};

export default HeaderNav;

function LogoutButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <>
      <button
        aria-disabled={pending}
        type='submit'
        onClick={handleClick}
        className='flex gap-1 items-center px-3 py-1 text-gray-500 font-bold hover:underline hover:text-gray-800'
      >
        {pending ? (
          <Spinner size={5} />
        ) : (
          <>
            <PowerIcon className='w-6 sm:w-4' />
            <div>خروج</div>
          </>
        )}
      </button>
    </>
  );
}
