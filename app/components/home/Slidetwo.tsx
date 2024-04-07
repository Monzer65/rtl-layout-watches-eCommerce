"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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

  const carouselRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);

  const slideWidth = carouselRef.current?.offsetWidth || 1000;

  const duplicatedSlides = useMemo(() => {
    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides]);

  const firstSlide = (
    carouselRef.current?.querySelector(".slide") as HTMLElement
  )?.offsetWidth;

  // useEffect(() => {
  //   const nextBtn = nextBtnRef.current;
  //   const prevBtn = prevBtnRef.current;

  //   if (!nextBtn || !prevBtnRef) return;

  //   nextBtn.addEventListener("click", () => {
  //     carouselRef.current?.scrollBy({ left: -firstSlide, behavior: "smooth" });
  //   });

  //   prevBtn.addEventListener("click", () => {
  //     carouselRef.current?.scrollBy({ left: firstSlide, behavior: "smooth" });
  //   });

  //   return () => {
  //     nextBtn.removeEventListener("click", () => {
  //       carouselRef.current?.scrollBy({
  //         left: -firstSlide,
  //         behavior: "smooth",
  //       });
  //     });
  //     prevBtn.removeEventListener("click", () => {
  //       carouselRef.current?.scrollBy({ left: firstSlide, behavior: "smooth" });
  //     });
  //   };
  // }, [firstSlide]);

  const handlePrevSlide = () => {
    console.log(" prev clicked");
    carouselRef.current?.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  const handleNextSlide = () => {
    console.log(" next clicked");
    carouselRef.current?.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

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

    // In RTL, when scrollLeft is 0, it means we're at the right end
    const isAtRightEnd = carousel.scrollLeft === 0;
    // In RTL, scrollLeft is negative as you scroll left, so we compare against the negative value
    const isAtLeftEnd =
      Math.ceil(carousel.scrollLeft) ===
      -(carousel.scrollWidth - carousel.offsetWidth);

    if (isAtRightEnd) {
      console.log("You've reached right end");
      carousel.classList.add("no-transition");
      // This will move the scroll position to the end of the slides (last slide)
      carousel.scrollLeft = -(carousel.scrollWidth - 2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
    } else if (isAtLeftEnd) {
      console.log("You've reached left end");
      carousel.classList.add("no-transition");
      // This will move the scroll position to the beginning of the slides (first slide)
      carousel.scrollLeft = -carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
  };

  return (
    <div
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
                className='w-full max-h-[300px]'
              />
            </Link>
          );
        })}
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
    </div>
  );
};

export default Carousel;
