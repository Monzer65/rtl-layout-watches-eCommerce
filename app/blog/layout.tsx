import type { Metadata } from "next";
import { notonaskh } from "@/app/components/fonts";
import "./blog.css";

export const metadata: Metadata = {
  title: "فروشگاه ساعت",
  description: "از میان تمام برندهای ساعت موجود در دنیا انتخاب کنید.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={notonaskh.className}>{children}</div>;
}
