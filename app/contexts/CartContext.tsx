"use client";

import { createContext, ReactNode, useReducer } from "react";
import { CartAction, cartReducer } from "./CartReducer";

export interface ICart {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  status: boolean;
}

export type CartContextType = {
  cartItems: ICart[];
};

export const CartContext = createContext<{
  cartItems: ICart[];
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [
    {
      id: 1,
      title: "item 1",
      description: "this is a description",
      price: 23123,
      quantity: 1,
      status: false,
    },
    {
      id: 2,
      title: "item 2",
      description: "this is a description",
      price: 455345,
      quantity: 1,
      status: true,
    },
  ]);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
