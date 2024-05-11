import Cart from "@/app/components/store/cart/Cart";

const CartPage = () => {
  return (
    <div className='md:my-40 px-8 max-w-[800px] mx-auto'>
      <h1 className='text-xl font-bold my-4'>سبد خرید</h1>
      <Cart />
    </div>
  );
};

export default CartPage;
