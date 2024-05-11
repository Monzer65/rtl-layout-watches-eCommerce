import { CartContext } from "@/app/contexts/CartContext";
import { CartContextType, ICart } from "@/app/contexts/CartContext";
import { useContext } from "react";

const AddToCart = ({
  id,
  title,
  shortDesc,
  price,
  quantity,
  btnText,
}: {
  id: number;
  title: string;
  shortDesc: string;
  price: number;
  quantity: number;
  btnText: string;
}) => {
  const { cartItems, dispatch } = useContext(CartContext)!;
  const maxQuantity = 10;
  const existingCartItem = cartItems.find((item) => item.id === id);
  const totalQuantity = existingCartItem
    ? existingCartItem.quantity + quantity
    : quantity;
  return (
    <>
      {id && title && shortDesc && price && (
        <button
          className='grow py-2 px-3 w-full bg-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-500 active:scale-95 disabled:bg-gray-200 disabled:text-black disabled:hover:text-black disabled:cursor-not-allowed'
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART",
              payload: {
                id,
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
      )}
    </>
  );
};

export default AddToCart;
