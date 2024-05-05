import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const Reviews = ({
  relatedReviews,
}: {
  relatedReviews: {
    id: number;
    username: string;
    productId: number;
    comment: string;
    rating: number;
  }[];
}) => {
  return (
    <>
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
    </>
  );
};

export default Reviews;
