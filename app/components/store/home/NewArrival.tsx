"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const NewArrival = ({
  products,
}: {
  products: {
    title: string;
    detailUrl: string;
    imageSrc: StaticImageData;
    priceBeforeDiscount: number;
    priceAfterDiscount: number;
    itemsLeft: number;
    deliveryMethod: string;
    type: string;
  }[];
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
        prevBtnRef.current.style.display = "none";
      } else if (isAtLeftEnd) {
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
    if (!slider) return;
    setIsDragging(true);
    const startX = e.pageX - slider.clientWidth;
    const scrollLeft = slider.scrollLeft;
    mouseCoords.current = { startX, scrollLeft };
    slider.style.cursor = "grabbing";
    slider.classList.remove("snap-mandatory", "snap-x");
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
    if (!slider) return;
    setIsDragging(false);
    if (!carouselRef.current) return;
    slider.style.cursor = "grab";
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

  const buttonTypes = ["جدید ترینها", "پرفروشترینها"];

  const [active, setActive] = useState(buttonTypes[0]);

  return (
    <div className='my-8 sm:my-16'>
      <div className='flex justify-between items-center border-b-2 sm:border-b-4 pb-2 px-4 border-black'>
        <div className='flex gap-2'>
          {buttonTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => {
                setActive(type);
                console.log(type);
              }}
              className={`font-semibold border rounded-md px-2 py-1 hover:scale-105 active:scale-100 text-base sm:text-lg md:text-xl lg:text-2xl ${
                active === type
                  ? "bg-gray-700 text-white opacity-100"
                  : "bg-gray-50 text-gray-700 opacity-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <Link
          href={"/"}
          className='flex items-center justify-center text-[14px] sm:text-sm md:text-base lg:text-lg hover:scale-105'
        >
          مشاهده همه{" "}
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5 8.25 12l7.5-7.5'
              />
            </svg>
          </span>
        </Link>
      </div>

      <div className='w-full relative' tabIndex={0} aria-live='polite'>
        <div
          className={`no-scrollbar relative text-gray-700 py-2 sm:py-4 flex gap-2 sm:gap-4 overflow-x-auto overscroll-x-contain hover:cursor-grab`}
          ref={carouselRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
        >
          {products
            .filter((item) => item.type === active)
            .map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.detailUrl}
                  ref={linkRef}
                  className={`slide grid grid-rows-[min-content] gap-2 flex-[0_0_auto] max-w-[120px] sm:max-w-[150px] md:max-w-[200px] text-gray-500 text-[10px] sm:text-xs md:text-sm lg:text-base bg-white p-2 rounded-md ${
                    index === 0 ? "snap-end" : "snap-start"
                  } `}
                >
                  <Image
                    src={item.imageSrc}
                    alt='sample'
                    draggable={"false"}
                    className='h-[70px] sm:h-[100px] md:h-[130px] lg:h-[150px] object-contain'
                  />
                  <p className='text-center leading-4'>{item.title}</p>

                  <div className='text-center'>
                    <p className=''>
                      <span className='font-bold ml-1'>
                        {item.priceAfterDiscount.toLocaleString()}
                      </span>
                      <span className='text-[8px] sm:text-xs'>تومان</span>
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
    </div>
  );
};

export default NewArrival;
