import Carousel from "@/app/components/store/products/Carousel";
import { products } from "@/app/data";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = products.find(({ id }) => id === Number(params.id));

  console.log(product?.imgSrc.src);
  return (
    <main>
      <div className='flex flex-col lg:flex-row gap-4 border'>
        <div className='w-max lg:w-auto m-auto lg:m-0 border border-yellow-500'>
          <Carousel images={product?.images} />
        </div>
        <div className='border border-red-600'>
          <div>
            <h2 className='font-bold text-2xl'>{product?.title}</h2>
            <p>{product?.desc}</p>
          </div>
          <div>
            <h2 className='font-bold text-2xl'>{product?.price} تومان</h2>
          </div>
          <button className='max-w-[320px] w-full py-2 bg-green-400 rounded-lg'>
            خرید
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
