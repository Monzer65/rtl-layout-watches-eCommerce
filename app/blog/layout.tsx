import type { Metadata } from "next";
import { notonaskh } from "@/app/components/fonts";
import "./blog.css";
import BlogHeader from "../components/blog/Header";
import BlogFooter from "../components/blog/Footer";
import BreadCrumb from "../components/blog/BreadCrumbs";

export const metadata: Metadata = {
  title: "فروشگاه ساعت",
  description: "از میان تمام برندهای ساعت موجود در دنیا انتخاب کنید.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={notonaskh.className}>
      <BlogHeader />
      <div>
        <BreadCrumb />
      </div>
      {children}
      <BlogFooter />
    </div>
  );
}
