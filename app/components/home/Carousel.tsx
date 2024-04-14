"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface Slide {
  id: number;
  image: StaticImageData;
  url: string;
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
  const [focused, setFocused] = useState(false);

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

    const threshold = slideWidth * 0.3;
    const deltaX = e.pageX - startX;

    if (deltaX < threshold) {
      handleNextSlide();
    } else if (deltaX > -threshold) {
      handlePrevSlide();
    } else {
      carouselRef.current!.scrollTo({
        left: startScrollLeft,
        behavior: "smooth",
      });
    }
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

    if (autoplay && !hovered && !focused && !isDragging) {
      interval = setInterval(() => {
        handleNextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, hovered, handleNextSlide, focused, isDragging]);

  return (
    <div
      className='w-full relative rounded-md my-4 shadow-lg shadow-gray-600'
      tabIndex={0}
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
              href={slide.url}
              key={index}
              className={`slide snap-center scroll-mx-60 ${
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
                placeholder={"blur"}
                className='w-full max-h-[300px] object-cover'
                draggable={false}
                tabIndex={-1}
              />
            </Link>
          );
        })}
      </div>

      <div className='absolute bottom-1 sm:bottom-2 md:bottom-3 lg:bottom-4 left-1/2 '>
        <button
          className={`mr-4 text-white rounded-full z-10 ${
            autoplay ? "bg-rose-500" : "bg-blue-500"
          }`}
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
              className='w-4 h-4 sm:w-5  sm:h-5 md:w-6 md:h-6'
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
              className='w-4 h-4 sm:w-5  sm:h-5 md:w-6 md:h-6'
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type='button'
        aria-label='next slide button'
        className='absolute top-0 bottom-0 left-0 bg-opacity-10 font-bold hover:bg-opacity-100 transform bg-gray-100 px-[0.75%] transition-bg-opacity focus:bg-opacity-100'
        tabIndex={0}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4 sm:w-5  sm:h-5 md:w-6 md:h-6 opacity-100 bg-gray-100 rounded-full'
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type='button'
        aria-label='next slide button'
        className='absolute right-0 top-0 bottom-0 font-bold bg-opacity-10 hover:bg-opacity-100 transform bg-gray-100 px-[0.75%] transition-bg-opacity focus:bg-opacity-100'
        tabIndex={0}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-4 h-4 sm:w-5  sm:h-5 md:w-6 md:h-6 opacity-100 bg-gray-100 rounded-full'
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
