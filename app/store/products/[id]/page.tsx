import Carousel from "@/app/components/store/products/Carousel";
import { products, reviews } from "@/app/data";
import {
  CheckBadgeIcon,
  GiftIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  PencilSquareIcon,
  StarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const product = products.find(({ id }) => id === Number(params.id));
  const relatedReviews: {
    id: number;
    username: string;
    productId: number;
    comment: string;
    rating: number;
  }[] = reviews.filter((review) => review.productId === product?.id);

  console.log(product?.imgSrc.src);
  return (
    <main className='px-8'>
      <div className='grid md:flex justify-center gap-4'>
        <div className='max-w-max'>
          <Carousel images={product?.images} />
        </div>
        <div className='md:px-4 md:flex-1'>
          <div className='mb-2'>
            <h2 className='font-bold text-2xl text-sky-900'>
              {product?.title}
            </h2>
            <p className='text-gray-600 text-sm'>{product?.shortDesc}</p>
          </div>
          <div className='mb-2'>
            <h2 className='font-bold text-2xl text-cyan-800'>
              {product?.price} <span className='text-base'>تومان</span>
            </h2>
          </div>
          <div className='flex items-center gap-2 mb-8'>
            <div className='flex'>
              <StarIcon className='w-5 fill-[#ff6250] text-[#ff6250]' />
              <StarIcon className='w-5 fill-[#ff6250] text-[#ff6250]' />
              <StarIcon className='w-5 fill-[#ff6250] text-[#ff6250]' />
              <StarIcon className='w-5 fill-[#ff6250] text-[#ff6250]' />
              <StarIcon className='w-5 text-[#ff6250]' />
            </div>
            <Link href={"#rating"}>
              <p className='text-gray-400 text-sm'>6200 نظر</p>
            </Link>
          </div>
          <button className='w-full max-w-[500px] py-2 bg-green-400 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-500 active:scale-95'>
            خرید
          </button>

          <div className='rounded-md bg-gray-100 my-8 p-2 max-w-[500px]'>
            <p className='flex gap-1 items-center'>
              <span>
                <PencilSquareIcon className='w-5 text-[#b39700]' />
              </span>
              2 سال گارانتی شرکتی
            </p>
            <p className='flex gap-1 items-center'>
              <span>
                <TruckIcon className='w-5 text-[#b39700]' />
              </span>
              حمل رایگان
            </p>
            <p className='flex gap-1 items-center'>
              <span>
                <CheckBadgeIcon className='w-5 text-[#b39700]' />
              </span>
              ضمانت اصالت
            </p>
            <p className='flex gap-1 items-center'>
              <span>
                <GiftIcon className='w-5 text-[#b39700]' />
              </span>
              دارای هدیه
            </p>
          </div>
        </div>
      </div>
      <div className='my-4'>
        <h3 className='font-bold text-2xl'>توضیحات</h3>
        <p>{product?.longDesc}</p>
      </div>
      <div className='my-4'>
        <h3 className='font-bold text-2xl'>جزئیات</h3>
        <table className='w-full [&>tr>th]:text-start [&>tr>th]:p-2 [&>tr>td]:w-full [&>tr>th]:text-nowrap [&>tr>td]:p-2 [&>*:nth-child(odd)]:bg-gray-100'>
          <tr>
            <th>برند</th>
            <td>{product?.brand}</td>
          </tr>
          <tr>
            <th>مدل</th>
            <td>{product?.model}</td>
          </tr>
          <tr>
            <th>سایز قاب</th>
            <td>{product?.caseSize}</td>
          </tr>
          <tr>
            <th>شکل قاب</th>
            <td>{product?.caseShape}</td>
          </tr>
          <tr>
            <th>جنس قاب</th>
            <td>{product?.caseMaterial}</td>
          </tr>
          <tr>
            <th>رنگ قاب</th>
            <td>{product?.caseColor}</td>
          </tr>
          <tr>
            <th>جنس بند</th>
            <td>{product?.bandMaterial}</td>
          </tr>
          <tr>
            <th>رنگ بند</th>
            <td>{product?.bandColor}</td>
          </tr>
          <tr>
            <th>رنگ عقربه</th>
            <td>{product?.dialColor}</td>
          </tr>
          <tr>
            <th>محرکه</th>
            <td>{product?.movement}</td>
          </tr>
          <tr>
            <th>مقاومت در برابر آب</th>
            <td>{product?.waterResistance}</td>
          </tr>
        </table>
      </div>
      <div className='my-4 bg-gray-100 text-center py-4 px-8' id='rating'>
        <h3 className='font-bold text-2xl'>امتیاز: 4.0 از 5</h3>
        <div className='flex items-center max-w-max m-auto'>
          <StarIcon className='w-10 fill-[#ff6250] text-[#ff6250]' />
          <StarIcon className='w-10 fill-[#ff6250] text-[#ff6250]' />
          <StarIcon className='w-10 fill-[#ff6250] text-[#ff6250]' />
          <StarIcon className='w-10 fill-[#ff6250] text-[#ff6250]' />
          <StarIcon className='w-10 text-[#ff6250]' />
        </div>
        <p className='text-gray-400 text-sm'>6200 نظر</p>
        <div className='max-w-[500px] m-auto [&>*]:my-2'>
          <div className='flex items-center'>
            5 ستاره
            <div className='flex-1 bg-gray-300 rounded-md overflow-hidden mr-2'>
              <div
                className='bg-gray-700 text-xs leading-none py-1 text-center text-white'
                style={{ width: "50%" }}
              >
                3100
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            4 ستاره
            <div className='flex-1 bg-gray-300 rounded-md overflow-hidden mr-2'>
              <div
                className='bg-gray-700 text-xs leading-none py-1 text-center text-white'
                style={{ width: "30%" }}
              >
                1860
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            3 ستاره
            <div className='flex-1 bg-gray-300 rounded-md overflow-hidden mr-2'>
              <div
                className='bg-gray-700 text-xs leading-none py-1 text-center text-white'
                style={{ width: "15%" }}
              >
                930
              </div>
            </div>
          </div>

          <div className='flex items-center'>
            2 ستاره
            <div className='flex-1 bg-gray-300 rounded-md overflow-hidden mr-2'>
              <div
                className='bg-gray-700 text-xs leading-none py-1 text-center text-white'
                style={{ width: "3%" }}
              >
                186
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            1 ستاره
            <div className='flex-1 bg-gray-300 rounded-md overflow-hidden mr-2'>
              <div
                className='bg-gray-700 text-xs leading-none py-1 text-center text-white'
                style={{ width: "2%" }}
              >
                124
              </div>
            </div>
          </div>
        </div>
        <button className='px-4 py-2 bg-black text-white'>ثبت دیدگاه</button>
      </div>
      <div className='my-4'>
        <h3 className='font-bold text-2xl'>دیدگاه ها</h3>
        {relatedReviews.map((review, index) => {
          return (
            <div key={index} className='border-b py-2 [&>*]:my-2 text-justify'>
              <p className='text-sm text-gray-600'>
                <span className='mr-2'>2024/05/02</span>
                {review.username}
              </p>
              <div className='flex'>
                {Array.from(
                  { length: 5 },
                  (_, index) => index < review.rating
                ).map((isFilled) =>
                  isFilled ? (
                    <StarIcon
                      key={index}
                      className='w-5 fill-[#ff6250] text-[#ff6250]'
                    />
                  ) : (
                    <StarIcon
                      key={index}
                      className='w-5 fill-[#none] text-[#ff6250]'
                    />
                  )
                )}
              </div>
              <p>{review.comment}</p>
              <div className='flex gap-4'>
                <button className='flex gap-1 items-center border p-2 active:scale-95 rounded-md'>
                  <span className='text-sm text-gray-500'>2</span>
                  <HandThumbUpIcon className='w-6 ' />
                </button>
                <button className='flex gap-1 items-center border p-2 active:scale-95 rounded-md'>
                  <span className='text-sm text-gray-500'>1</span>
                  <HandThumbDownIcon className='w-6 ' />
                </button>
              </div>
            </div>
          );
        })}
        <button className='px-4 py-2 bg-black text-white my-4'>
          ثبت دیدگاه
        </button>
      </div>
    </main>
  );
};

export default ProductDetail;
