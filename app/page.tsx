import Navigation from "./components/Navigation";
import Banner from "./components/home/Banner";
import Carousel from "./components/home/Carousel";
import c1Image from "@/public/images/c1.webp";
import c2Image from "@/public/images/c2.webp";
import c3Image from "@/public/images/c3.webp";
import c4Image from "@/public/images/c4.webp";

export default function Home() {
  const SLIDES = [
    { image: c1Image },
    { image: c2Image },
    { image: c3Image },
    { image: c4Image },
  ];

  return (
    <main className=''>
      <header className='sticky top-0 right-0 left-0 bg-white mb-4'>
        <Banner />
        <Navigation />
      </header>
      <Carousel slides={SLIDES} />
    </main>
  );
}
