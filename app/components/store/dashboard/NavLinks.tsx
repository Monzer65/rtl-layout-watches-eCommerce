"use client";
import {
  CalendarDaysIcon,
  CurrencyEuroIcon,
  GiftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
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
  const pathname = usePathname();

  return (
    <>
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
    </>
  );
};

export default NavLinks;
