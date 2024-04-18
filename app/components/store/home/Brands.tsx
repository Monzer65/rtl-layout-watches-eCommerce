"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface Brand {
  src: StaticImageData;
  url: string;
}
interface BrandProps {
  brandImages: Brand[];
}

const Brands: React.FC<BrandProps> = ({ brandImages }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;

    const matchMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateAnimationPreference() {
      if (!scroller) return;
      if (!matchMedia.matches) {
        scroller.setAttribute("data-animated", "true");
      } else {
        scroller.removeAttribute("data-animated");
      }

      const scrollerInner = scroller?.querySelector(".scroller__inner");
      if (!scrollerInner) return;
      if (scrollerInner.getAttribute("data-cloned") === "true") return;
      const scrollerInnerContent = Array.from(scrollerInner?.children || []);
      scrollerInnerContent.forEach((item) => {
        const duplicatedBrandImages = item.cloneNode(true) as HTMLElement;
        duplicatedBrandImages.setAttribute("aria-hidden", "true");
        scrollerInner?.appendChild(duplicatedBrandImages);
      });
      scrollerInner.setAttribute("data-cloned", "true");
    }

    updateAnimationPreference();
  }, []);

  return (
    <div className='my-8 sm:my-16'>
      <div className='flex justify-between items-center border-b-2 sm:border-b-4 pb-2 px-4 border-black'>
        <h2 className='font-semibold text-base sm:text-lg md:text-xl lg:text-2xl'>
          برترین برندها
        </h2>
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
      <div className='my-4'>
        <div ref={scrollerRef} className='scroller max-w-[1440px] mx-auto '>
          <div
            ref={scrollerInnerRef}
            className={`scroller__inner flex gap-4 flex-wrap animate-infinite_scroll`}
          >
            {brandImages.map((brand, index) => (
              <Link href={brand.url} key={index} className=''>
                <Image
                  src={brand.src}
                  alt={`brand ${index + 1}`}
                  height={100}
                  className=''
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
