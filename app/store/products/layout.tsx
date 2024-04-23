import type { Metadata } from "next";

import BreadCrumb from "@/app/components/store/products/BreadCrumb";

export const metadata: Metadata = {
  title: "فروشگاه ساعت",
  description: "از میان تمام برندهای ساعت موجود در دنیا انتخاب کنید.",
};

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`pt-0 md:pt-[8.5rem] pb-4 relative`}>
      <BreadCrumb />
      {children}
    </div>
  );
}
