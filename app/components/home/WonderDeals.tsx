import Image from "next/image";
import sample from "@/public/images/sample.png";
import sample_1 from "@/public/images/sample_1.jpg";
import wonderDealsImage from "@/public/images/wonderDeals.svg";
import discountImage from "@/public/images/discount.svg";
import Link from "next/link";

const products = [
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 18,
    priceAfterDiscount: 13,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko Astron GPS Solar SSH145J1",
    detailUrl: "",
    imageSrc: sample_1,
    priceBeforeDiscount: 15,
    priceAfterDiscount: 12,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 23000,
    priceAfterDiscount: 17000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 1324000,
    priceAfterDiscount: 1300000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15,
    priceAfterDiscount: 12,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15,
    priceAfterDiscount: 12,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15,
    priceAfterDiscount: 12,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
  },
];

const WonderDeals = () => {
  const discountPercentage = (
    priceBefore: number,
    priceAfter: number
  ): number => {
    const result = 100 - Math.round((priceAfter * 100) / priceBefore);
    return result;
  };

  return (
    <div className='text-gray-700 bg-red-500 rounded-lg p-2 sm:p-4 flex gap-2 sm:gap-4 overflow-x-auto overscroll-x-contain'>
      <Link
        href={"/"}
        className='flex flex-col items-center justify-center gap-1 md:gap-2 flex-none max-w-[120px] sm:max-w-[150px] md:max-w-[200px] text-[10px] sm:text-xs md:text-sm lg:text-base p-2'
      >
        <Image
          src={wonderDealsImage}
          alt='wonder Deals'
          className='w-full aspect-square max-h-[50px] sm:max-h-[80px] md:max-h-[100px] lg:max-h-[110px] object-contain'
        />
        <Image
          src={discountImage}
          alt='discount'
          className='w-full aspect-square max-h-[50px] sm:max-h-[80px] md:max-h-[100px] lg:max-h-[110px] object-contain'
        />
        <p className='flex justify-center items-center text-white'>
          مشاهده همه
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5 8.25 12l7.5-7.5'
              />
            </svg>
          </span>
        </p>
      </Link>
      {products.map((item, index) => {
        const discount = discountPercentage(
          item.priceBeforeDiscount,
          item.priceAfterDiscount
        );
        return (
          <Link
            key={index}
            href={item.detailUrl}
            className='grid grid-rows-[min-content] gap-2 flex-[0_0_auto] max-w-[120px] sm:max-w-[150px] md:max-w-[200px] text-[10px] sm:text-xs md:text-sm lg:text-base bg-gray-100 p-2 rounded-md shadow-lg shadow-red-900'
          >
            <Image
              src={item.imageSrc}
              alt='sample'
              className='h-[70px] sm:h-[100px] md:h-[130px] lg:h-[150px] object-contain'
            />
            <p className='font-bold text-center leading-3'>{item.title}</p>
            <p className='inline-flex items-center gap-1 text-[8px] sm:text-xs'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-blue-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                />
              </svg>
              {item.deliveryMethod}{" "}
            </p>
            <div className=''>
              <p className=''>
                {item.priceAfterDiscount.toLocaleString()}{" "}
                <span className='text-[8px] sm:text-xs'>تومان</span>
                <span className='text-white text-[8px] sm:text-xs mr-2 font-semibold bg-red-500 rounded-lg px-[0.25rem] '>
                  {discount}%
                </span>
              </p>
              <p className='line-through decoration-red-500'>
                {item.priceBeforeDiscount.toLocaleString()}
              </p>
            </div>
          </Link>
        );
      })}

      <Link
        href={"/"}
        className='flex flex-col justify-center items-center flex-[0_0_auto] w-[100px] sm:w-[130px] md:w-[170px] text-[10px] sm:text-xs md:text-sm lg:text-base bg-gray-100 p-2 rounded-md shadow-lg shadow-red-900'
      >
        <p className='grid gap-2 font-semibold'>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-blue-600 m-auto'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
              />
            </svg>
          </span>
          مشاهده همه
        </p>
      </Link>
    </div>
  );
};

export default WonderDeals;
