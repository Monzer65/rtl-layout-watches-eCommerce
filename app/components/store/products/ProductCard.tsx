import { Product } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className='min-h-[200px] max-w-[400px] p-2 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.01] transition-transform duration-300 ease-in-out relative'>
      <Link href={`/store/products/${product._id}`} className=''>
        <Image
          src={product.images[0]}
          alt={`product ${product.name}`}
          width={200}
          height={200}
          className='w-full h-[200px] object-contain'
        />
        <h3 className='text-lg font-bold my-2 mx-4'>{product.name}</h3>
        {product.wonderDeal === true && (
          <p className='text-red-400 absolute top-4 left-2 -rotate-45'>
            تخفیف ویژه
          </p>
        )}
      </Link>
      <p className='text-base font-semibold text-gray-800 my-2 mx-4'>
        {product.sale_price} <span className='text-sm font-normal'>تومان</span>
      </p>
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
