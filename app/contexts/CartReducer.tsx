import { ICart } from "./CartContext";

export type CartAction =
  | { type: "ADD_TO_CART"; payload: ICart }
  | { type: "UPDATE_CART"; payload: number }
  | { type: "REMOVE_CART_ITEM"; payload: number }
  | { type: "INCREMENT_CART_ITEM"; payload: number }
  | { type: "DECREMENT_CART_ITEM"; payload: number };

export const cartReducer = (state: ICart[], action: CartAction): ICart[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    // case "UPDATE_CART":
    //   return state.map((cart) =>
    //     cart.id === action.payload ? { ...cart, status: true } : cart
    //   );
    case "INCREMENT_CART_ITEM":
      return state.map((cart) =>
        cart.id === action.payload
          ? { ...cart, quantity: cart.quantity + 1 }
          : cart
      );

    case "DECREMENT_CART_ITEM":
      return state.map((cart) =>
        cart.id === action.payload
          ? { ...cart, quantity: cart.quantity > 1 ? cart.quantity - 1 : 1 }
          : cart
      );

    case "REMOVE_CART_ITEM":
      return state.filter((cart) => cart.id !== action.payload);

    default:
      return state;
  }
};
