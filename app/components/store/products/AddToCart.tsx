import { CartContext } from "@/app/contexts/CartContext";
import { CartContextType, ICart } from "@/app/contexts/CartContext";
import { useContext } from "react";

const AddToCart = () => {
  const { dispatch } = useContext(CartContext)!;

  return <div>AddToCart</div>;
};

export default AddToCart;
