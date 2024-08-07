"use client";

import React, { useContext } from "react";
import { CartContext } from "@/app/contexts/CartContext";
import {
  FaceFrownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const { cartItems, dispatch } = useContext(CartContext)!;

  return (
    <div className='my-4 text-xs sm:text-sm md:text-base relative'>
      {cartItems && cartItems.length >= 1 ? (
        <>
          <p className='text-sm text-gray-400'>{cartItems.length} آیتم</p>
          <div className='grid grid-cols-1 gap-4 mt-4'>
            {cartItems.map((item) => (
              <React.Fragment key={item._id}>
                <div className='bg-white rounded-lg p-4 shadow-md'>
                  <div className='flex items-center justify-between gap-4'>
                    <Image
                      src={item.image}
                      alt='product image'
                      width={30}
                      height={30}
                      className='rounded-md'
                    />
                    <div>
                      <h2 className='text-base sm:text-lg font-semibold'>
                        {item.title}
                      </h2>
                      <p className='text-gray-500'>{item.description}</p>
                      <p className='text-gray-700'>قیمت واحد: {item.price}</p>
                      <p className='text-gray-700'>
                        مجموع قیمت در آیتم: {item.price * item.quantity}
                      </p>
                    </div>

                    <div className='flex gap-2'>
                      <button
                        className='bg-green-500 text-white rounded-md'
                        onClick={() =>
                          dispatch({
                            type: "INCREMENT_CART_ITEM",
                            payload: item._id,
                          })
                        }
                      >
                        <PlusIcon className='w-4 sm:w-5 md:w-6' />
                      </button>
                      <p>{item.quantity} عدد</p>
                      <button
                        className='bg-red-500 text-white rounded-md'
                        onClick={() =>
                          dispatch({
                            type: "DECREMENT_CART_ITEM",
                            payload: item._id,
                          })
                        }
                      >
                        <MinusIcon className='w-4 sm:w-5 md:w-6' />
                      </button>
                    </div>
                  </div>
                  <button
                    className='bg-red-500 text-white px-3 py-1 rounded-md float-left'
                    onClick={() =>
                      dispatch({ type: "REMOVE_CART_ITEM", payload: item._id })
                    }
                  >
                    حذف
                  </button>
                </div>
              </React.Fragment>
            ))}
            <div className='sticky bottom-0 inset-x-0 p-2 bg-white '>
              <div>
                <p className='font-semibold text-xl text-gray-700 border-t pt-2'>
                  <span>مجموع:</span>{" "}
                  {cartItems.reduce((accumulator, item) => {
                    return accumulator + item.price * item.quantity;
                  }, 0)}
                </p>
                <p className='text-sm text-gray-400 font-normal'>
                  بدون احتساب هزینه های پست
                </p>
              </div>
              <div className='w-full mt-4 text-center text-white font-semibold bg-green-500 rounded-md hover:bg-green-600'>
                <Link
                  href={"/store/cart/payment"}
                  className='py-1 px-2 w-full block'
                >
                  پرداخت
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className='text-base sm:text-lg font-semibold text-center'>
            سبد شما خالی است!
          </p>
          <FaceFrownIcon className='w-8 m-auto mt-4' />
        </>
      )}
    </div>
  );
};

export default Cart;
