"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Slide {
  id: number;
  image: StaticImageData;
}

interface SliderProps {
  slides: Slide[];
}

const Carousel: React.FC<SliderProps> = ({ slides }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);

  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);

  const duplicatedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const setInitialSlideWidth = () => {
      if (carouselRef.current) {
        const width = carouselRef.current.offsetWidth;
        setSlideWidth(width);

        carouselRef.current.scrollTo({ left: -width, behavior: "instant" });
      }
    };
    setInitialSlideWidth();
    window.addEventListener("resize", setInitialSlideWidth);
    return () => {
      window.removeEventListener("resize", setInitialSlideWidth);
    };
  }, []);

  const handlePrevSlide = () => {
    carouselRef.current?.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  const handleNextSlide = useCallback(() => {
    carouselRef.current?.scrollBy({ left: -slideWidth, behavior: "smooth" });
  }, [slideWidth]);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX);
    setStartScrollLeft(carouselRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) return;
    const deltaX = e.pageX - startX;
    carouselRef.current!.scrollLeft = startScrollLeft - deltaX;
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const infinitScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const isAtRightEnd = carousel.scrollLeft === 0;
    const isAtLeftEnd =
      Math.ceil(carousel.scrollLeft) ===
      -(carousel.scrollWidth - carousel.offsetWidth);

    if (isAtRightEnd) {
      console.log("You've reached right end");
      carousel.classList.add("no-transition");
      carousel.scrollLeft = -(carousel.scrollWidth - 2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
    } else if (isAtLeftEnd) {
      console.log("You've reached left end");
      carousel.classList.add("no-transition");
      carousel.scrollLeft = -carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
  };

  const handleToggleAutoplay = () => {
    setAutoplay((prevAutoplay) => !prevAutoplay);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay && !hovered) {
      interval = setInterval(() => {
        handleNextSlide();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoplay, hovered, handleNextSlide]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='w-full relative rounded-md mt-1 focus:outline-none focus:ring focus:ring-blue-400'
      tabIndex={0}
      role='button'
      aria-live='polite'
    >
      <div
        ref={carouselRef}
        className={`w-full grid grid-flow-col auto-cols-[100%] overflow-x-auto rounded-md carousel ${
          isDragging
            ? "scroll-auto snap-none"
            : "scroll-smooth snap-x snap-mandatory"
        }`}
        tabIndex={-1}
        onMouseDown={handleDragStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onScroll={infinitScroll}
      >
        {duplicatedSlides.map((slide, index) => {
          return (
            <Link
              href={"/"}
              key={index}
              className={`slide snap-center ${
                isDragging ? "cursor-grab select-none" : ""
              }`}
              draggable={false}
              tabIndex={-1}
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                width={1440}
                height={350}
                className='w-full max-h-[300px] object-cover'
                tabIndex={-1}
              />
            </Link>
          );
        })}
      </div>

      <div className='absolute bottom-4 left-0 right-0 flex justify-center items-center'>
        <button
          className='mr-4 bg-orange-700 text-white rounded-full z-10 focus:outline-none focus:ring focus:ring-blue-400'
          onClick={handleToggleAutoplay}
          tabIndex={0}
        >
          {autoplay ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z'
              />
            </svg>
          )}
        </button>
      </div>

      <button
        ref={nextBtnRef}
        onClick={handleNextSlide}
        type='button'
        aria-label='next slide button'
        className='absolute left-0 top-0 bottom-0 font-bold opacity-20 hover:opacity-100 transform bg-gray-100 px-[0.75%] transition-opacity focus:outline-none focus:ring focus:ring-blue-400 focus:opacity-100'
        tabIndex={0}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
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
        type='button'
        aria-label='next slide button'
        className='absolute right-0 top-0 bottom-0 font-bold opacity-20 hover:opacity-100 transform bg-gray-100 px-[0.75%] transition-opacity focus:outline-none focus:ring focus:ring-blue-400 focus:opacity-100'
        tabIndex={0}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
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

export default Carousel;
