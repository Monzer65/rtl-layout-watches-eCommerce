"use client";

import { createContext, ReactNode, useEffect, useReducer } from "react";
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
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage?.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
