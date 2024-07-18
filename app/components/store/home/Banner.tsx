import Image from "next/image";
import bannerBg from "@/public/images/advertising-banner-background.jpeg";
import Link from "next/link";
import Logo from "../../Logo";

const Banner = () => {
  return (
    <Link
      href={"/"}
      className='py-1 px-8 flex gap2 justify-center items-center bg-white border-b border-b-gray-400'
    >
      <p className='font-bold text-sm sm:text-base lg:text-xl px-2 py-1 text-gray-600 '>
        فروشگاه اینترنتی ساعت
      </p>
      <Logo />
      {/* <div className='text-sm sm:text-base lg:text-xl  px-2 py-1 text-white '>
        Prompt logos here
      </div> */}
    </Link>
  );
};

export default Banner;
