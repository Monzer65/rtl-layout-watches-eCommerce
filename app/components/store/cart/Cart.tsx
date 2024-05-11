"use client";

import { useContext } from "react";
import { CartContext } from "@/app/contexts/CartContext";
import {
  FaceFrownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const Cart = () => {
  const { cartItems, dispatch } = useContext(CartContext)!;

  return (
    <div className='my-4'>
      {cartItems && cartItems.length >= 1 ? (
        <>
          <p className='text-sm text-gray-400'>{cartItems.length} آیتم</p>
          <div className='grid grid-cols-1 gap-4 mt-4'>
            {cartItems.map((item) => (
              <>
                <div
                  key={item.id}
                  className='bg-white rounded-lg p-4 shadow-md'
                >
                  <div className='flex items-center justify-between gap-4'>
                    <div>
                      <h2 className='text-lg font-semibold'>{item.title}</h2>
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
                            payload: item.id,
                          })
                        }
                      >
                        <PlusIcon className='w-6' />
                      </button>
                      <span>{item.quantity} عدد</span>
                      <button
                        className='bg-red-500 text-white rounded-md'
                        onClick={() =>
                          dispatch({
                            type: "DECREMENT_CART_ITEM",
                            payload: item.id,
                          })
                        }
                      >
                        <MinusIcon className='w-6' />
                      </button>
                    </div>
                  </div>
                  <button
                    className='bg-red-500 text-white px-3 py-1 rounded-md float-left'
                    onClick={() =>
                      dispatch({ type: "REMOVE_CART_ITEM", payload: item.id })
                    }
                  >
                    حذف
                  </button>
                </div>
              </>
            ))}
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
        </>
      ) : (
        <>
          <p className='text-lg font-semibold text-center'>سبد شما خالی است!</p>
          <FaceFrownIcon className='w-8 m-auto mt-4' />
        </>
      )}
    </div>
  );
};

export default Cart;
