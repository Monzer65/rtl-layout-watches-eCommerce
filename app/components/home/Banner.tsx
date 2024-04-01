import Image from "next/image";
import bannerBg from "@/public/images/advertising-banner-background.jpeg";
import Link from "next/link";

const Banner = () => {
  return (
    <Link
      href={"/"}
      className='py-2 px-8 flex justify-between items-center bg-banner_bg_pattern bg-contain'
    >
      <p className='font-bold text-xl px-2 py-1 text-black bg-gray-100'>
        بنر تبلیغات
      </p>
      <div className='text-xl px-2 py-1 text-black bg-gray-100'>
        Prompt logos here
      </div>
    </Link>
  );
};

export default Banner;
