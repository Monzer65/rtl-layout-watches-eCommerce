"use client";
import { useEffect, useRef, useState } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (autoplay && !hovered) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 2000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [autoplay, hovered, slides.length]);

  const handleToggleAutoplay = () => {
    setAutoplay((prevAutoplay) => !prevAutoplay);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(event.clientX);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = event.clientX - startX;
    const newSlide = Math.min(
      slides.length - 1,
      Math.max(0, currentSlide - Math.round(deltaX / 100))
    );

    setCurrentSlide(newSlide);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className='relative w-full flex'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='w-full h-60 rounded-md overflow-hidden relative'>
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            right: `${-currentSlide * 100}%`,
          }}
          className='w-full h-full absolute flex transition-all duration-300'
        >
          {slides.map((slide, index) => (
            <Link
              key={slide.id}
              href={"/"}
              className='relative shrink-0 w-full h-full'
              style={{ backgroundImage: `url(${slide.image || ""})` }}
            >
              <Image
                src={slides[index].image}
                alt={`Slide ${slide.id}`}
                layout='responsive'
                className='w-full max-h-[300px] snap-center touch-auto'
              />
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={handleNextSlide}
        className='absolute left-0 top-0 bottom-0 font-bold opacity-20 hover:opacity-100 transform bg-gray-100 py-2 px-4 transition-opacity'
      >
        ❯
      </button>
      <button
        onClick={handlePrevSlide}
        className='absolute right-0 top-0 bottom-0 font-bold opacity-20 hover:opacity-100 transform bg-gray-100 py-2 px-4 transition-opacity'
      >
        ❮
      </button>
      <div className='absolute bottom-4 left-0 right-0 flex justify-center items-center w-fit m-auto'>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 mx-1 rounded-full ${
              index === currentSlide ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
        <button
          className=' bg-blue-500 text-white p-1 rounded-full mr-4'
          onClick={handleToggleAutoplay}
        >
          {autoplay ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 5.25v13.5m-7.5-13.5v13.5'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
