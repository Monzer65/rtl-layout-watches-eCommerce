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
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);

  const slideWidth = carouselRef.current?.offsetWidth || 0;

  const duplicatedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
    carouselRef.current?.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
    carouselRef.current?.scrollBy({ left: -slideWidth, behavior: "smooth" });
  }, [slideWidth, slides.length]);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    if (!carouselRef.current) return;

    if (e.key === "ArrowRight") {
      carouselRef.current.scrollLeft += slideWidth;
    } else if (e.key === "ArrowLeft") {
      carouselRef.current.scrollLeft -= slideWidth;
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

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const initialSlideIndex = 1;
    const initialSlidePosition = slideWidth * initialSlideIndex;

    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialSlidePosition;
      setCurrentSlide(initialSlideIndex);
    }
  }, [slideWidth]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay && !hovered) {
      interval = setInterval(() => {
        handleNextSlide();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoplay, hovered, handleNextSlide]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='w-full relative rounded-md mt-1 focus:outline-none focus:ring focus:ring-blue-400'
      tabIndex={0}
      onKeyDown={handleKeyDown}
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
              tabIndex={-1}
              draggable={false}
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                width={1440}
                height={350}
                className='w-full max-h-[300px] object-cover'
              />
            </Link>
          );
        })}
      </div>

      <div className='absolute bottom-4 left-0 right-0 flex justify-center'>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 mx-1 rounded-full bg-gray-300 ${
              index === currentSlide ? "bg-blue-400" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>

      <button
        ref={nextBtnRef}
        onKeyDown={handleKeyDown}
        onClick={handleNextSlide}
        type='button'
        aria-label='next slide button'
        className='absolute left-0 top-0 bottom-0 font-bold opacity-20 hover:opacity-100 transform bg-gray-100 py-2 px-4 transition-opacity focus:outline-none focus:ring focus:ring-blue-400 focus:opacity-100'
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
        onKeyDown={handleKeyDown}
        onClick={handlePrevSlide}
        type='button'
        aria-label='next slide button'
        className='absolute right-0 top-0 bottom-0 font-bold opacity-20 hover:opacity-100 transform bg-gray-100 py-2 px-4 transition-opacity focus:outline-none focus:ring focus:ring-blue-400 focus:opacity-100'
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

      <button
        className='absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full z-10'
        onClick={handleToggleAutoplay}
      >
        {autoplay ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default Carousel;
