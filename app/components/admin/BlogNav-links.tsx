"use client";
import {
  BookOpenIcon,
  UsersIcon,
  UserGroupIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
// import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "مجله",
    href: "/admin-area/blog/magazine",
    icon: BookOpenIcon,
  },
  {
    name: "نویسندگان",
    href: "/admin-area/blog/authors",
    icon: UsersIcon,
  },
  {
    name: "کاربران",
    href: "/admin-area/blog/users",
    icon: UserGroupIcon,
  },
];

const BlogNavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col md:flex-row md:h-[48px] grow items-center justify-center gap-2 rounded-md md:rounded-none bg-gray-50 text-[10px] sm:text-xs md:text-sm lg:text-base font-medium hover:bg-gray-800 hover:text-white md:flex-none md:justify-start p-1 md:p-2 md:px-3 ${
              pathname === link.href && "bg-gray-800 text-white"
            }`}
          >
            <LinkIcon className='w-4 sm:w-5 md:w-6' />
            <p className=''>{link.name}</p>
          </Link>
        );
      })}
      <div className='hidden h-auto w-full grow rounded-md md:rounded-none bg-gray-50 md:block'></div>

      {/* <LogoutLink className='flex h-[48px] grow items-center justify-center gap-2 rounded-md md:rounded-none bg-gray-50 text-sm font-medium hover:bg-gray-800 hover:text-red-400 md:flex-none md:justify-start md:py-2 md:px-3'>
        {" "}
        <PowerIcon className='w-6' />{" "}
        <span className='hidden md:block'>خروج</span>
      </LogoutLink> */}
    </>
  );
};

export default BlogNavLinks;
