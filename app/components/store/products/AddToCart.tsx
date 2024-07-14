"use client";
import { CartContext } from "@/app/contexts/CartContext";
import { useContext } from "react";

const AddToCart = ({
  _id,
  image,
  title,
  shortDesc,
  price,
  quantity,
  btnText,
}: {
  _id: string;
  image: string;
  title: string;
  shortDesc: string;
  price: number;
  quantity: number;
  btnText: string;
}) => {
  const { cartItems, dispatch } = useContext(CartContext)!;
  const maxQuantity = 10;
  const existingCartItem = cartItems.find((item) => item._id === _id);
  const totalQuantity = existingCartItem
    ? existingCartItem.quantity + quantity
    : quantity;
  return (
    <button
      className='grow py-2 px-3 w-full bg-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-500 active:scale-95 disabled:bg-gray-200 disabled:text-black disabled:hover:text-black disabled:cursor-not-allowed'
      onClick={() =>
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            _id,
            image,
            title,
            description: shortDesc,
            price,
            quantity,
            status: true,
          },
        })
      }
      disabled={totalQuantity > maxQuantity}
    >
      {btnText}
    </button>
  );
};

export default AddToCart;
