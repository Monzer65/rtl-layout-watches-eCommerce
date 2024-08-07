import { ICart } from "./CartContext";

export type CartAction =
  | { type: "ADD_TO_CART"; payload: ICart }
  | { type: "REMOVE_CART_ITEM"; payload: string }
  | { type: "INCREMENT_CART_ITEM"; payload: string }
  | { type: "DECREMENT_CART_ITEM"; payload: string };

export const cartReducer = (state: ICart[], action: CartAction): ICart[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { _id, quantity } = action.payload;
      const existingItemIndex = state.findIndex(
        (cartItem) => cartItem._id === _id
      );

      if (existingItemIndex !== -1) {
        // If item already exists in cart, update quantity
        return state.map((cartItem, index) =>
          index === existingItemIndex
            ? {
                ...cartItem,
                quantity: Math.min(
                  Math.max(cartItem.quantity + (quantity ? quantity : 1), 1),
                  10
                ),
              }
            : cartItem
        );
      } else {
        // If item doesn't exist in cart, add it
        return [...state, action.payload];
      }

    case "INCREMENT_CART_ITEM":
      return state.map((cart) =>
        cart._id === action.payload
          ? { ...cart, quantity: cart.quantity < 10 ? cart.quantity + 1 : 10 }
          : cart
      );

    case "DECREMENT_CART_ITEM":
      return state.map((cart) =>
        cart._id === action.payload
          ? { ...cart, quantity: cart.quantity > 1 ? cart.quantity - 1 : 1 }
          : cart
      );

    case "REMOVE_CART_ITEM":
      return state.filter((cart) => cart._id !== action.payload);

    default:
      return state;
  }
};
