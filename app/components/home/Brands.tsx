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
    <div
      ref={scrollerRef}
      className='scroller max-w-[1440px] mx-auto my-4 sm:my-8'
    >
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
  );
};

export default Brands;
