"use client";
import { CartContext } from "@/app/contexts/CartContext";
import {
  CheckBadgeIcon,
  GiftIcon,
  MinusIcon,
  PencilSquareIcon,
  PlusIcon,
  StarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext, useState } from "react";
import AddToCart from "../AddToCart";

const BasicInfo = ({
  _id,
  image,
  title,
  shortDesc,
  price,
}: {
  _id: string;
  image: string;
  title: string;
  shortDesc: string;
  price: number;
}) => {
  const { cartItems, dispatch } = useContext(CartContext)!;
  const currentProduct = {
    _id,
    image,
    title,
    description: shortDesc,
    price,
    quantity: 1,
    status: true,
  };
  const [q, setQ] = useState(1);

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
      <div className=' max-w-[500px]'>
        <div className='flex gap-4 item-center justify-between mb-2'>
          <AddToCart
            _id={_id}
            image={image}
            title={title}
            shortDesc={shortDesc}
            price={price}
            btnText={"افزودن به سبد خرید"}
            quantity={q}
          />
          <div
            dir='ltr'
            className='flex items-center gap-3 bg-white px-2 py-1 rounded-md shadow-md border'
          >
            <button onClick={() => setQ(() => (q <= 1 ? 1 : q - 1))}>
              <MinusIcon className='w-5' />
            </button>
            <span>{q}</span>
            <button onClick={() => setQ(() => (q >= 10 ? 10 : q + 1))}>
              <PlusIcon className='w-5' />
            </button>
          </div>
        </div>
        <button className='w-full py-2 bg-green-400 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-500 active:scale-95'>
          خرید
        </button>
      </div>

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
