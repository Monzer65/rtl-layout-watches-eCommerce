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
  ArrowRightStartOnRectangleIcon,
  KeyIcon,
  UserIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import Header_mobile_nav from "./Header_mobile_nav";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "@/app/contexts/CartContext";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/contexts/UserContext";

const Header = ({ logo }: { logo: StaticImageData }) => {
  const [open, setOpen] = useState(false);
  const [dashNavOpen, setDashNavOpen] = useState(false);
  const DashBtnRef = useRef<HTMLButtonElement>(null);
  // const { user, isAuthenticated, isLoading, permissions } =
  //   useKindeBrowserClient();
  const { user, loading } = useUser();
  const userPermissions = user ? user.roles : [];

  const { cartItems, dispatch } = useContext(CartContext)!;
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpen(false);
      } else {
        setOpen(true);
      }
      setDashNavOpen(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    const dashbtn = DashBtnRef.current;
    if (dashbtn && !dashbtn.contains(e.target)) {
      setDashNavOpen(false);
    }
  };

  const handleDashNav = () => {
    setDashNavOpen(!dashNavOpen);
  };

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
        <Link href={"/store"} className='hidden md:block'>
          <Image src={logo} alt='logo' width={100} height={100} />
        </Link>
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
          {!user ? (
            <div className='flex justify-center gap-2 md:border border-gray-200 rounded-md md:px-4 py-2 hover:!opacity-100'>
              {loading ? (
                <div>درحال بارگزاری...</div>
              ) : (
                <>
                  <Link
                    href={"/login"}
                    className='flex flex-col lg:flex-row gap-1 items-center'
                  >
                    <ArrowRightEndOnRectangleIcon className='h-6 w-6 text-gray-500' />
                    <p className='md:hidden lg:block'>ورود</p>
                  </Link>
                  |
                  <Link
                    href={"/signup"}
                    className='flex flex-col lg:flex-row gap-1 items-center'
                  >
                    <KeyIcon className='h-6 w-6 text-gray-500' />
                    <p className='md:hidden lg:block'>ثبت نام</p>
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className='relative md:border border-gray-200 rounded-md md:px-4 py-2 hover:!opacity-100'>
              {loading ? (
                <div>درحال بارگزاری...</div>
              ) : (
                <button
                  type='button'
                  ref={DashBtnRef}
                  onClick={handleDashNav}
                  aria-label='dashboard button'
                  className=' flex flex-col md:flex-row gap-1 w-full'
                >
                  <div className='flex flex-col md:flex-row justify-center w-full'>
                    <UserIcon className='hidden md:block h-6 w-6 text-gray-500' />
                    {/* {user?.picture ? (
                      <Image
                        src={user?.picture}
                        alt='user image'
                        width={25}
                        height={25}
                        className='rounded-full max-w-full m-auto md:mr-2'
                      />
                    ) : (
                      <UserIcon className=' md:hidden h-6 w-6 text-gray-500' />
                    )} */}
                    <UserIcon className=' md:hidden h-6 w-6 text-gray-500' />
                    <p className='md:hidden lg:block m-auto mt-1 lg:mt-0 lg:mr-1'>
                      {user?.email}
                    </p>
                  </div>

                  <>
                    <div
                      className={`${
                        dashNavOpen ? "block" : "hidden"
                      } md:hidden fixed inset-x-0 top-0 bottom-16 bg-gray-600 opacity-70 z-30`}
                      onClick={() => setDashNavOpen(false)}
                    ></div>
                    <div
                      className={`rounded-md flex flex-col absolute inset-x-0 bg-white z-40  transition-maxHeight duration-1000 overflow-hidden shadow-lg ${
                        dashNavOpen
                          ? "max-h-[350px] bottom-16 md:top-12 md:bottom-auto"
                          : "max-h-0 -bottom-44  md:hidden md:bottom-auto"
                      }`}
                    >
                      <Link
                        href={"/store/dashboard"}
                        className='flex gap-1 justify-center border-b p-2 hover:bg-gray-100'
                      >
                        <DocumentChartBarIcon className='w-5' />
                        داشبورد
                      </Link>
                      {userPermissions.includes("admin") && (
                        <Link
                          href={"/admin-area"}
                          className='flex gap-1 justify-center border-b p-2 hover:bg-gray-100'
                        >
                          <DocumentChartBarIcon className='w-5' />
                          ادمین
                        </Link>
                      )}
                      <Link
                        href={"/logout"}
                        className='flex gap-1 justify-center p-2 hover:bg-gray-100'
                      >
                        <ArrowRightStartOnRectangleIcon className='w-5' />
                        خروج
                      </Link>
                    </div>
                  </>
                </button>
              )}
            </div>
          )}

          <Link
            href={"/store/cart"}
            passHref
            scroll={false}
            className={`relative flex flex-col lg:flex-row gap-1 items-center md:border border-gray-200 rounded-md md:px-4 py-2 hover:!opacity-100 ${
              pathname.includes("/cart") ? "pointer-events-none" : ""
            }`}
          >
            <ShoppingBagIcon className='h-6 w-6 text-gray-500' />
            <p className='md:hidden lg:block'>سبد خرید </p>
            {cartItems && cartItems.length >= 1 && (
              <span className='absolute right-[calc(50%_-_2.25rem)] md:right-0 md:top-0 w-6 h-6 flex items-center justify-center bg-red-600 text-white text-xs rounded-full'>
                {cartItems.length}
              </span>
            )}
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
