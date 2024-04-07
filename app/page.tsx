import Navigation from "./components/Navigation";
import Banner from "./components/home/Banner";
import Carousel from "./components/home/Carousel";
import c1Image from "@/public/images/c1.webp";
import c2Image from "@/public/images/c2.webp";
import c3Image from "@/public/images/c3.webp";
import c4Image from "@/public/images/c4.webp";

export default function Home() {
  const SLIDES = [
    { id: 1, image: c1Image },
    { id: 2, image: c2Image },
    { id: 3, image: c3Image },
    { id: 4, image: c4Image },
  ];

  return (
    <main className=''>
      <header className='sticky top-0 right-0 left-0 bg-white z-10'>
        <Banner />
        <Navigation />
      </header>
      <Carousel slides={SLIDES} />
    </main>
  );
}
