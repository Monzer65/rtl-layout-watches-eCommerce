import { Product } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className='min-h-[200px] p-2 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 ease-in-out'>
      <Link href={`/store/products/${product._id}`}>
        <Image
          src={product.images[0]}
          alt={`product ${product.name}`}
          width={200}
          height={200}
          className='w-full h-[200px] object-contain'
        />
        <h3 className='text-lg font-bold my-2 mx-4'>{product.name}</h3>
      </Link>
      <p className='text-base text-gray-800 my-2 mx-4'>{product.sale_price}</p>
      <AddToCart
        _id={product._id}
        image={product.images[0]}
        title={product.name}
        shortDesc={product.short_description}
        price={product.sale_price}
        quantity={1}
        btnText={"افزودن به سبد"}
      />
    </div>
  );
};

export default ProductCard;
