"use client";
import { StarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const labels: { [index: string]: string } = {
  1: "بدرد نخور",
  2: "ضعیف",
  3: "متوسط",
  4: "خوب",
  5: "عالی",
};

function getLabelText(value: number) {
  if (value) {
    return `${value} ستاره (${labels[value]})`;
  }
  return "";
}

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(-1);

  return (
    <div className='flex items-center'>
      <h3 className='font-semibold text-lg ml-2'>امتیاز شما:</h3>
      <label htmlFor={`star-rating-${rating}`}>{getLabelText(rating)}</label>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type='button'
            name={`star-rating-${rating}`}
            key={index}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(ratingValue)}
            aria-label={getLabelText(ratingValue)}
            className='block hover:scale-125'
          >
            <StarIcon
              className={`w-10 ${
                ratingValue <= (hoverRating || rating)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-400 fill-none"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
