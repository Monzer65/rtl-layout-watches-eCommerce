"use client";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CartAction, cartReducer } from "./CartReducer";

export interface ICart {
  _id: string;
  image: string;
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let localData;

  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    isClient ? (localData = localStorage.getItem("cart")) : (localData = null);
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
