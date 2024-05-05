"use client";
const ReviewButton = () => {
  return (
    <button
      onClick={() => {
        document
          .getElementById("comment-section")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => {
          window.scrollBy(0, 0);
        }, 250);
      }}
      className='px-4 py-2 bg-black text-white'
    >
      ثبت نظر
    </button>
  );
};

export default ReviewButton;
