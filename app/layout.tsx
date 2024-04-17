import type { Metadata } from "next";
import { notonaskh } from "@/app/components/fonts";
import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "فروشگاه ساعت",
  description: "از میان تمام برندهای ساعت موجود در دنیا انتخاب کنید.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl' className='scroll-smooth'>
      <body className={notonaskh.className}>
        <header className='sticky top-0 right-0 left-0 bg-white z-10'>
          {/* <Banner /> */}
          <Navigation />
        </header>
        {children}
      </body>
    </html>
  );
}
