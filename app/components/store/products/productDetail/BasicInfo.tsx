"use client";
import {
  CheckBadgeIcon,
  GiftIcon,
  PencilSquareIcon,
  StarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const BasicInfo = ({
  title,
  shortDesc,
  price,
}: {
  title: string | undefined;
  shortDesc: string | undefined;
  price: number | undefined;
}) => {
  return (
    <div className='md:px-4 md:flex-1'>
      <div className='mb-2'>
        <h2 className='font-bold text-2xl text-sky-900'>{title}</h2>
        <p className='text-gray-600 text-sm'>{shortDesc}</p>
      </div>
      <div className='mb-2'>
        <h2 className='font-bold text-2xl text-cyan-800'>
          {price} <span className='text-base'>تومان</span>
        </h2>
      </div>
      <div className='flex items-center gap-2 mb-8'>
        <div className='flex'>
          <StarIcon className='w-5 fill-[#ff6250] text-[#ff6250]' />
          <StarIcon className='w-5 fill-[#ff6250] text-[#ff6250]' />
          <StarIcon className='w-5 fill-[#ff6250] text-[#ff6250]' />
          <StarIcon className='w-5 fill-[#ff6250] text-[#ff6250]' />
          <StarIcon className='w-5 text-[#ff6250]' />
        </div>
        <button
          onClick={() =>
            document
              .getElementById("rating")
              ?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        >
          <p className='text-gray-400 text-sm'>6200 نظر</p>
        </button>
      </div>
      <button className='w-full max-w-[500px] py-2 bg-green-400 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-500 active:scale-95'>
        خرید
      </button>

      <div className='rounded-md bg-gray-100 my-8 p-2 max-w-[500px]'>
        <p className='flex gap-1 items-center'>
          <span>
            <PencilSquareIcon className='w-5 text-[#b39700]' />
          </span>
          2 سال گارانتی شرکتی
        </p>
        <p className='flex gap-1 items-center'>
          <span>
            <TruckIcon className='w-5 text-[#b39700]' />
          </span>
          حمل رایگان
        </p>
        <p className='flex gap-1 items-center'>
          <span>
            <CheckBadgeIcon className='w-5 text-[#b39700]' />
          </span>
          ضمانت اصالت
        </p>
        <p className='flex gap-1 items-center'>
          <span>
            <GiftIcon className='w-5 text-[#b39700]' />
          </span>
          دارای هدیه
        </p>
      </div>
    </div>
  );
};

export default BasicInfo;
