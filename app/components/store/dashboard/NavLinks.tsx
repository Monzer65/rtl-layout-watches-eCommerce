"use client";
import { useUser } from "@/app/contexts/UserContext";
import {
  CalendarDaysIcon,
  CurrencyEuroIcon,
  GiftIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "اطلاعات شخصی",
    href: "/store/dashboard",
    icon: UserCircleIcon,
  },
  {
    name: "پرداخت ها",
    href: "/store/dashboard/payments",
    icon: CurrencyEuroIcon,
  },
  {
    name: "سوابق سفارشات",
    href: "/store/dashboard/orders-history",
    icon: CalendarDaysIcon,
  },
  {
    name: "کارتهای جایزه",
    href: "/store/dashboard/gift-cards",
    icon: GiftIcon,
  },
];

const NavLinks = () => {
  const { user, loading } = useUser();

  const userPermissions = user ? user.roles : [];
  const pathname = usePathname();

  return (
    <>
      <div className=' p-2'>
        <div className='flex flex-col gap-1'>
          {/* {user?.picture ? (
            <Image
              src={user?.picture}
              alt='user image'
              width={100}
              height={100}
              className='rounded-full'
            />
          ) : (
            <div className='w-[100px] h-[100px] bg-gray-100 rounded-full'>
              <UserIcon className='bg-gray-400' />
            </div>
          )} */}
          <div className='w-[100px] h-[100px] bg-gray-100 rounded-full'>
            <UserIcon className='bg-gray-400' />
          </div>
          <h2>{user?.email}</h2>
          <p className='text-sm font-light text-gray-600'>{user?.email}</p>
        </div>
        <div className='grid grid-cols-4 md:grid-cols-1 gap-2 md:text-lg lg:text-xl text-gray-600 mt-8'>
          {links.map((link) => {
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col md:flex-row md:h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start p-1 md:p-2 md:px-3 ${
                  pathname === link.href && "bg-sky-100 text-blue-600"
                }`}
              >
                <LinkIcon className='w-4 sm:w-5 md:w-6' />
                <p className=''>{link.name}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default NavLinks;
