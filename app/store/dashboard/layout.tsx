import LogoutBtn from "@/app/components/store/dashboard/LogoutBtn";
import NavLinks from "@/app/components/store/dashboard/NavLinks";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default async function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='my-8 md:my-48 max-w-[800px] m-auto px-4'>
      <div className='flex justify-between items-center pb-2 border-b'>
        <LogoutBtn />
      </div>
      <div className='flex flex-col md:flex-row py-4'>
        <NavLinks />
        <div className='flex-grow p-4'>{children}</div>
      </div>
    </div>
  );
}
