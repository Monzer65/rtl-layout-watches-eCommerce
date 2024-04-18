import Image from "next/image";
import bannerBg from "@/public/images/advertising-banner-background.jpeg";
import Link from "next/link";

const Banner = () => {
  return (
    <Link
      href={"/"}
      className='py-2 px-8 flex justify-between items-center bg-orange-100'
    >
      <p className='font-bold text-sm sm:text-base lg:text-xl px-2 py-1 text-black '>
        بنر تبلیغات
      </p>
      <div className='text-sm sm:text-base lg:text-xl  px-2 py-1 text-black '>
        Prompt logos here
      </div>
    </Link>
  );
};

export default Banner;
