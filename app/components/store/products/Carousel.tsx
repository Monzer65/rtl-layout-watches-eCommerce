"use client";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import { MouseEvent, MouseEventHandler, useRef, useState } from "react";

const ImageThumbnail = ({
  image,
  index,
  isActive,
  onClick,
}: {
  image: StaticImageData;
  index: number;
  isActive: boolean;
  onClick: MouseEventHandler;
}) => (
  <Image
    src={image}
    alt={`Thumbnail ${index + 1}`}
    className={`w-[50px] object-cover cursor-pointer p-1 rounded-lg ${
      isActive ? "border-2 border-red-600" : "border border-gray-500"
    }`}
    onClick={onClick}
  />
);

const Carousel = ({ images }: { images: StaticImageData[] | undefined }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const lensRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const zoomedImageRef = useRef<HTMLDivElement>(null);

  const toggleElementsDisplay = (display: boolean) => {
    const zoomImage = zoomedImageRef.current;
    const lens = lensRef.current;

    if (!zoomImage || !lens) return;

    lens.style.display = display ? "block" : "none";
    zoomImage.style.display = display ? "block" : "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    const mainImage = mainImageRef.current;
    const lens = lensRef.current;
    const zoomImage = zoomedImageRef.current;

    if (!mainImage || !lens || !zoomImage) return;

    const { left, top, width, height } = mainImage.getBoundingClientRect();
    const lensWidth = lens.offsetWidth;
    const lensHeight = lens.offsetHeight;
    const lensHalfWidth = lensWidth / 2;
    const lensHalfHeight = lensHeight / 2;

    let lensX = e.pageX - left - lensHalfWidth;
    let lensY = e.pageY - top - lensHalfHeight;

    lensX = Math.max(0, Math.min(lensX, width - lensWidth));
    lensY = Math.max(0, Math.min(lensY, height - lensHeight));

    lens.style.left = `${lensX}px`;
    lens.style.top = `${lensY}px`;

    const scaleFactor = 1.45;
    const bgX = (lensX / width) * 100 * scaleFactor;
    const bgY = (lensY / height) * 100 * scaleFactor;

    zoomImage.style.backgroundPosition = `${bgX}% ${bgY}%`;
  };

  return (
    <div className='relative'>
      <div className=''>
        <div
          ref={mainImageRef}
          onMouseEnter={() => toggleElementsDisplay(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => toggleElementsDisplay(false)}
          className='relative '
        >
          {images && images.length > 0 && (
            <Image
              src={images[currentImageIndex]}
              alt={`Product Image ${currentImageIndex + 1}`}
              className='w-[350px] h-[350px] object-contain cursor-pointer m-auto'
            />
          )}
          <div className='absolute flex flex-col gap-4 right-2 top-2 '>
            <button className='bg-black p-2 rounded-full hover:scale-105'>
              <HeartIcon className='w-6 text-white' />
            </button>
            <button className='bg-black p-2 rounded-full hover:scale-105'>
              <ShareIcon className='w-6 text-white' />
            </button>
          </div>
          <div className='hidden lg:block pointer-events-none'>
            <div
              ref={lensRef}
              className='halftone hidden w-[100px] h-[100px] absolute'
            ></div>
          </div>
        </div>

        <div className='flex justify-center gap-1 w-full overflow-x-auto my-4'>
          {images?.map((image, index) => (
            <ImageThumbnail
              key={index}
              image={image}
              index={index}
              isActive={index === currentImageIndex}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className='hidden lg:block absolute md:-left-full md:top-0'>
        <div
          ref={zoomedImageRef}
          className='hidden  bg-left-top bg-no-repeat shadow-xl shadow-black'
          style={{
            backgroundImage: `url(${images && images[currentImageIndex].src})`,
            backgroundSize: "300% 300%",
            width: "350px",
            height: "350px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Carousel;
