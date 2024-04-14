import Navigation from "./components/Navigation";
import Banner from "./components/home/Banner";
import Carousel from "./components/home/Carousel";
import c1Image from "@/public/images/c1.webp";
import c2Image from "@/public/images/c2.webp";
import c3Image from "@/public/images/c3.webp";
import c4Image from "@/public/images/c4.webp";
import brand1 from "@/public/images/brands/Boss.jpg";
import brand2 from "@/public/images/brands/EmporioArmani.jpg";
import brand3 from "@/public/images/brands/MichaelKors.jpg";
import brand4 from "@/public/images/brands/Tissot.jpg";
import brand5 from "@/public/images/brands/casio.jpg";
import brand6 from "@/public/images/brands/citizen.jpg";
import brand7 from "@/public/images/brands/fossil.jpg";
import brand8 from "@/public/images/brands/gshock.png";
import brand9 from "@/public/images/brands/guess.png";
import brand10 from "@/public/images/brands/timex.png";
import brand11 from "@/public/images/brands/vivw_s.jpg";
import womens from "@/public/images/categories/women.webp";
import mens from "@/public/images/categories/men.webp";
import kids from "@/public/images/categories/kids.webp";
import Brands from "./components/home/Brands";
import MainCategories from "./components/home/MainCategories";
import WonderDeals from "./components/home/WonderDeals";

export default function Home() {
  const SLIDES = [
    { id: 1, image: c1Image, url: "/" },
    { id: 2, image: c2Image, url: "/" },
    { id: 3, image: c3Image, url: "/" },
    { id: 4, image: c4Image, url: "/" },
  ];

  const brandImages = [
    { src: brand1, url: "/" },
    { src: brand2, url: "/" },
    { src: brand3, url: "/" },
    { src: brand4, url: "/" },
    { src: brand5, url: "/" },
    { src: brand6, url: "/" },
    { src: brand7, url: "/" },
    { src: brand8, url: "/" },
    { src: brand9, url: "/" },
    { src: brand10, url: "/" },
    { src: brand11, url: "/" },
  ];

  const mainCategories = [
    { title: "زنانه", src: womens, url: "/" },
    { title: "مردانه", src: mens, url: "/" },
    { title: "بچگانه", src: kids, url: "/" },
  ];

  return (
    <main className=''>
      <header className='sticky top-0 right-0 left-0 bg-white z-10'>
        {/* <Banner /> */}
        <Navigation />
      </header>
      <main className='px-8'>
        <Carousel slides={SLIDES} />
        <MainCategories mainCategories={mainCategories} />
        <WonderDeals />
        <Brands brandImages={brandImages} />
      </main>
    </main>
  );
}
