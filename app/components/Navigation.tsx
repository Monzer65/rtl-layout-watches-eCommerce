import Image from "next/image";
import logo from "@/public/images/logo.svg";
import Link from "next/link";
import Search from "./Search";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Navigation = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-2 px-8 py-2 shadow-lg relative'>
      <div className='flex flex-col lg:flex-row lg:items-center gap-2 sm:gap-4 flex-1 lg:max-w-[850px] order-2 lg:order-1'>
        <Link href={"/"}>
          <Image
            src={logo}
            alt='logo'
            width={200}
            className='max-w-[100px] sm:max-w-[150px] lg:max-w-full absolute top-8 left-8 lg:static max-[330px]:hidden'
          />
        </Link>
        <Search placeholder='جستجو...' />
      </div>
      <nav className='flex items-center gap-2 mt-4 lg:mt-0 text-xs sm:text-base order-1 lg:order-2'>
        <Link
          href={"/"}
          className='flex gap-1 items-center border border-gray-200 rounded-lg px-2 py-1 sm:px-4 sm:py-2'
        >
          <ArrowRightEndOnRectangleIcon className='h-6 w-6 text-gray-500' />
          ورود | ثبت نام
        </Link>
        <Link
          href={"/"}
          className='flex gap-1 items-center border border-gray-200 rounded-lg px-2 py-1 sm:px-4 sm:py-2'
        >
          <p className='hidden sm:block'>سبد خرید </p>
          <ShoppingBagIcon className='h-6 w-6 text-gray-500' />
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
