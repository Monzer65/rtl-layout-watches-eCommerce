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
import sample from "@/public/images/sample.png";
import sample_1 from "@/public/images/sample_1.jpg";
import wonderDealsImage from "@/public/images/wonderDeals.svg";
import discountImage from "@/public/images/discount.svg";
import NewArrival from "./components/home/NewArrival";
import MiddleGrid from "./components/home/MiddleGrid";
import ShortDesc from "./components/home/ShortDesc";
import etemad from "@/public/images/etemad.webp";
import kasbokar from "@/public/images/kasbokar.webp";
import supportImage_1 from "@/public/images/support_1.png";
import supportImage_2 from "@/public/images/suppport_2.png";
import supportImage_3 from "@/public/images/support_3.png";
import telegramIcon from "@/public/images/telegram.svg";
import whatsappIcon from "@/public/images/whatsapp.svg";
import instagramIcon from "@/public/images/instagram.svg";
import Footer from "./components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const SLIDES = [
    { id: 1, image: c1Image, url: "/" },
    { id: 2, image: c2Image, url: "/" },
    { id: 3, image: c3Image, url: "/" },
    { id: 4, image: c4Image, url: "/" },
  ];

  const mainCategories = [
    { title: "زنانه", src: womens, url: "/" },
    { title: "مردانه", src: mens, url: "/" },
    { title: "بچگانه", src: kids, url: "/" },
  ];

  const products = [
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 18,
      priceAfterDiscount: 13,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko Astron GPS Solar SSH145J1",
      detailUrl: "",
      imageSrc: sample_1,
      priceBeforeDiscount: 15,
      priceAfterDiscount: 12,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 23000,
      priceAfterDiscount: 17000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 1324000,
      priceAfterDiscount: 1300000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15,
      priceAfterDiscount: 12,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15,
      priceAfterDiscount: 12,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15,
      priceAfterDiscount: 12,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15000000,
      priceAfterDiscount: 12200000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15000000,
      priceAfterDiscount: 12200000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15000000,
      priceAfterDiscount: 12200000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15000000,
      priceAfterDiscount: 12200000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15000000,
      priceAfterDiscount: 12200000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15000000,
      priceAfterDiscount: 12200000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15000000,
      priceAfterDiscount: 12200000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
    {
      title: "Seiko SSB321",
      detailUrl: "",
      imageSrc: sample,
      priceBeforeDiscount: 15000000,
      priceAfterDiscount: 12200000,
      itemsLeft: 5,
      deliveryMethod: "ارسال سریع",
    },
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

  const namadImages = [
    { src: etemad, url: "" },
    { src: kasbokar, url: "" },
  ];

  const supportImages = [
    { src: supportImage_1, title: "پشتیبانی 24 ساعته", url: "" },
    { src: supportImage_2, title: "ضمانت اصالت کالا", url: "" },
    { src: supportImage_3, title: "ارسال سریع به تمامی نقاط", url: "" },
  ];

  const social = [
    { src: telegramIcon, url: "" },
    { src: whatsappIcon, url: "" },
    { src: instagramIcon, url: "" },
  ];

  return (
    <>
      <div className=''>
        <header className='sticky top-0 right-0 left-0 bg-white z-10'>
          {/* <Banner /> */}
          <Navigation />
        </header>
        <main className='px-8'>
          <Carousel slides={SLIDES} />
          <MainCategories mainCategories={mainCategories} />
          <WonderDeals
            products={products}
            wonderDealsImage={wonderDealsImage}
            discountImage={discountImage}
          />
          <MiddleGrid />
          <NewArrival products={products} />
          <Brands brandImages={brandImages} />
        </main>
      </div>
      <footer>
        <section className='flex justify-between p-8 border-t'>
          {supportImages.map((item, index) => {
            return (
              <Link key={index} href={item.url} className='text-center'>
                <Image
                  src={item.src}
                  alt='support image'
                  height={50}
                  className='max-h-[50px] object-contain m-auto'
                />
                <p className='mt-2'>{item.title}</p>
              </Link>
            );
          })}
        </section>
        <section className='px-8'>
          <ShortDesc namadImages={namadImages} />
        </section>
        <Footer social={social} />
      </footer>
    </>
  );
}
