import { StarIcon } from "@heroicons/react/24/outline";
import ReviewButton from "./ReviewButton";

const RatingInfo = () => {
  return (
    <>
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
      <ReviewButton />
    </>
  );
};

export default RatingInfo;
