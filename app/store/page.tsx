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
import sample from "@/public/images/sample.png";
import sample_1 from "@/public/images/sample_1.jpg";

const slides = [
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
    type: "جدید ترینها",
  },
  {
    title: "Seiko Astron GPS Solar SSH145J1",
    detailUrl: "",
    imageSrc: sample_1,
    priceBeforeDiscount: 15,
    priceAfterDiscount: 12,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 23000,
    priceAfterDiscount: 17000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 1324000,
    priceAfterDiscount: 1300000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15,
    priceAfterDiscount: 12,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15,
    priceAfterDiscount: 12,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15,
    priceAfterDiscount: 12,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 12200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "جدید ترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 11000000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "پرفروشترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 9500000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "پرفروشترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 13224000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "پرفروشترینها",
  },
  {
    title: "Seiko SSB321",
    detailUrl: "",
    imageSrc: sample,
    priceBeforeDiscount: 15000000,
    priceAfterDiscount: 14200000,
    itemsLeft: 5,
    deliveryMethod: "ارسال سریع",
    type: "پرفروشترینها",
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

const Store = () => {
  return (
    <main className='px-8'>
      {/* <Carousel slides={slides} />
          <MainCategories mainCategories={mainCategories} />
          <WonderDeals
            products={products}
            wonderDealsImage={wonderDealsImage}
            discountImage={discountImage}
          />
          <MiddleGrid />
          <NewArrival products={products} />
          <Brands brandImages={brandImages} /> */}
      فروشگاه فروشگاه فروشگاه فروشگاه فروشگاه
    </main>
  );
};

export default Store;
