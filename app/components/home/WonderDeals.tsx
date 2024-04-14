import Image from "next/image";
import sample from "@/public/images/sample.png";
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
    <div className='text-gray-700 bg-red-500 rounded-lg flex gap-4 py-4 px-8 overflow-auto'>
      <Link
        href={"/"}
        className='w-[150px] sm:w-[200px] rounded-md flex flex-col gap-2 justify-center items-center flex-none'
      >
        <Image
          src={wonderDealsImage}
          alt='wonder Deals'
          width={100}
          height={100}
        />
        <Image src={discountImage} alt='discount' width={100} height={100} />
        <p className='flex items-center justify-center font-bold text-sm md:text-lg'>
          مشاهده همه
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'
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
            className='w-[150px] sm:w-[220px] bg-gray-50 rounded-md flex-none p-2 flex flex-col items-center justify-between'
          >
            <Image
              src={item.imageSrc}
              alt='sample'
              width={100}
              className='max-w-full'
            />
            <p className='font-bold'>{item.title}</p>
            <p className='inline-flex gap-1 text-xs'>
              <i className='text-blue-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
                  />
                </svg>
              </i>
              {item.deliveryMethod}{" "}
            </p>
            <div className='flex flex-col sm:flex-row justify-between text-sm sm:w-full'>
              <p className=''>
                {item.priceAfterDiscount.toLocaleString()}{" "}
                <span className='text-xs'>تومان</span>
              </p>
              <div className='flex items-center justify-start sm:justify-between gap-1'>
                <p className='line-through decoration-red-500'>
                  {item.priceBeforeDiscount.toLocaleString()}
                </p>
                <p className='text-white text-xs font-semibold bg-red-500 rounded-lg p-[0.1rem] text-center'>
                  {discount}%
                </p>
              </div>
            </div>
          </Link>
        );
      })}
      <div className='w-[150px] sm:w-[200px] bg-gray-50 rounded-md shrink-0 flex items-center justify-center'>
        <Link href={"/"}>
          <i className='flex items-center justify-center text-blue-400'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
              />
            </svg>
          </i>
          <p>مشاهده همه</p>
        </Link>
      </div>
    </div>
  );
};

export default WonderDeals;
