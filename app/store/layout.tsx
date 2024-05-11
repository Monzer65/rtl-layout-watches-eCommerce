import type { Metadata } from "next";
import { notonaskh } from "@/app/components/fonts";
import "./store.css";

import logo from "@/public/images/logo.svg";
import namad_1 from "@/public/images/namad_1.webp";
import namad_2 from "@/public/images/namad_2.png";
import namad_3 from "@/public/images/namad_3.webp";
import supportImage_1 from "@/public/images/support_1.png";
import supportImage_2 from "@/public/images/suppport_2.png";
import supportImage_3 from "@/public/images/support_3.png";
import telegramIcon from "@/public/images/telegram.svg";
import whatsappIcon from "@/public/images/whatsapp.svg";
import instagramIcon from "@/public/images/instagram.svg";
import Header from "../components/store/Header";
import Footer from "../components/store/Footer";
import Search from "../components/Search";
import CartProvider from "../contexts/CartContext";

export const metadata: Metadata = {
  title: "فروشگاه ساعت",
  description: "از میان تمام برندهای ساعت موجود در دنیا انتخاب کنید.",
};

const namadImages = [
  { src: namad_1, url: "" },
  { src: namad_2, url: "" },
  { src: namad_3, url: "" },
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

export default async function StoreLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className={`pt-0 pb-16 md:pb-0 relative ${notonaskh.className}`}>
        <div className='sticky top-0 right-0 left-0 md:hidden z-10 py-2 shadow-md bg-white'>
          <Search placeholder='جستجو...' />
        </div>
        <Header logo={logo} />
        {modal}
        {children}
        <Footer
          namadImages={namadImages}
          supportImages={supportImages}
          social={social}
        />
      </div>
    </CartProvider>
  );
}
