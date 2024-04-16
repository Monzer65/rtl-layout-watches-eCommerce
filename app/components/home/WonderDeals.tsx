"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const WonderDeals = ({
  products,
  wonderDealsImage,
  discountImage,
}: {
  products: {
    title: string;
    detailUrl: string;
    imageSrc: StaticImageData;
    priceBeforeDiscount: number;
    priceAfterDiscount: number;
    itemsLeft: number;
    deliveryMethod: string;
  }[];
  wonderDealsImage: string;
  discountImage: string;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    scrollLeft: 0,
  });
  const [slideWidth, setSlideWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    handleBtnsVisibilityOnScroll();
    const setInitialSlideWidth = () => {
      if (carouselRef.current) {
        const firstSlide = carouselRef.current.querySelector(
          ".slide"
        ) as HTMLElement;
        if (firstSlide) {
          const newSlideWidth = firstSlide.offsetWidth;
          setSlideWidth(newSlideWidth);
        }
      }
    };
    setInitialSlideWidth();
    const handleResize = () => {
      setInitialSlideWidth();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    const handleScroll = () => {
      handleBtnsVisibilityOnScroll();
    };
    if (carouselElement) {
      carouselElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleBtnsVisibilityOnScroll = () => {
    if (carouselRef.current && prevBtnRef.current && nextBtnRef.current) {
      const currentScrollPosition = carouselRef.current.scrollLeft;
      const isAtRightEnd = currentScrollPosition === 0;
      const isAtLeftEnd =
        Math.ceil(currentScrollPosition) ===
        -(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      if (isAtRightEnd) {
        console.log("0 pos");
        prevBtnRef.current.style.display = "none";
      } else if (isAtLeftEnd) {
        console.log("max pos");
        nextBtnRef.current.style.display = "none";
      } else {
        prevBtnRef.current.style.display = "block";
        nextBtnRef.current.style.display = "block";
      }
    }
  };

  const handlePrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.classList.add("snap-mandatory", "snap-x");
      carouselRef.current.scrollBy({ left: slideWidth, behavior: "smooth" });
    }
  };

  const handleNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.classList.add("snap-mandatory", "snap-x");
      carouselRef.current.scrollBy({ left: -slideWidth, behavior: "smooth" });
    }
  };

  const handleDragStart = (e: React.MouseEvent<HTMLElement>) => {
    const slider = carouselRef.current;
    const link = linkRef.current;
    if (!slider || !link) return;
    setIsDragging(true);
    const startX = e.pageX - slider.clientWidth;
    const scrollLeft = slider.scrollLeft;
    mouseCoords.current = { startX, scrollLeft };
    slider.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const slider = carouselRef.current;
    if (!isDragging || !slider) return;
    e.preventDefault();
    const x = e.pageX - slider.clientWidth;
    const walkX = (x - mouseCoords.current.startX) * 1.5;
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    slider.querySelectorAll("a").forEach((anchortag) => {
      anchortag.style.pointerEvents = "none";
    });
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLElement>) => {
    const slider = carouselRef.current;
    const link = linkRef.current;
    if (!slider || !link) return;
    setIsDragging(false);
    if (!carouselRef.current) return;
    slider.style.cursor = "default";
    slider.querySelectorAll("a").forEach((anchortag) => {
      anchortag.style.pointerEvents = "";
    });
  };

  const discountPercentage = (
    priceBefore: number,
    priceAfter: number
  ): number => {
    const result = 100 - Math.round((priceAfter * 100) / priceBefore);
    return result;
  };

  return (
    <div
      className='w-full relative rounded-md my-4 shadow-lg shadow-gray-600'
      tabIndex={0}
      aria-live='polite'
    >
      <div
        className={`relative text-gray-700 bg-red-500 rounded-lg p-2 sm:p-4 flex gap-2 sm:gap-4 overflow-x-auto overscroll-x-contain ${
          isDragging ? "cursor-grab" : "cursor-default"
        }`}
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
      >
        <Link
          href={"/"}
          className='slide flex flex-col items-center justify-center gap-1 md:gap-2 flex-none max-w-[120px] sm:max-w-[150px] md:max-w-[200px] text-[10px] sm:text-xs md:text-sm lg:text-base p-2 snap-end'
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
              ref={linkRef}
              className={`grid grid-rows-[min-content] gap-2 flex-[0_0_auto] max-w-[120px] sm:max-w-[150px] md:max-w-[200px] text-[10px] sm:text-xs md:text-sm lg:text-base bg-gray-100 p-2 rounded-md shadow-lg shadow-red-900 snap-start`}
            >
              <Image
                src={item.imageSrc}
                alt='sample'
                draggable={"false"}
                className='h-[70px] sm:h-[100px] md:h-[130px] lg:h-[150px] object-contain'
              />
              <p className='text-center leading-4'>{item.title}</p>
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
                  <span className='font-bold ml-1'>
                    {item.priceAfterDiscount.toLocaleString()}
                  </span>
                  <span className='text-[8px] sm:text-xs'>تومان</span>
                  <span className='text-white text-[8px] sm:text-xs mr-2 font-semibold bg-red-500 rounded-lg px-[0.25rem] '>
                    {discount}%
                  </span>
                </p>
                <p className='line-through decoration-red-500'>
                  <span className='text-[8px] sm:text-xs'>
                    {item.priceBeforeDiscount.toLocaleString()}
                  </span>
                </p>
              </div>
            </Link>
          );
        })}

        <div className='flex flex-col justify-center items-center flex-[0_0_auto] w-[100px] sm:w-[130px] md:w-[170px] text-[10px] sm:text-xs md:text-sm lg:text-base bg-gray-100 p-2 rounded-md shadow-lg shadow-red-900 snap-start'>
          <Link href={"/"} className='grid gap-2 font-semibold'>
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
          </Link>
        </div>
      </div>

      <button
        ref={nextBtnRef}
        onClick={handleNextSlide}
        aria-label='next products group button'
        className='absolute top-1/2 -left-4 font-bold -translate-y-1/2 bg-gray-100 border border-gray-400 hover:bg-gray-200 p-1 rounded-full'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 19.5 8.25 12l7.5-7.5'
          />
        </svg>
      </button>
      <button
        ref={prevBtnRef}
        onClick={handlePrevSlide}
        aria-label='previous product group button'
        className='absolute -right-4 top-1/2 -translate-y-1/2 font-bold bg-gray-100 hover:bg-gray-200 border border-gray-400 p-1 rounded-full'
        tabIndex={0}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m8.25 4.5 7.5 7.5-7.5 7.5'
          />
        </svg>
      </button>
    </div>
  );
};

export default WonderDeals;
