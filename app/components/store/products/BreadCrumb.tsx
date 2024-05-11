"use client";

import { ChevronLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const convertBreadcrumb = (string: string) => {
  if (string === "store") string = "خانه";
  if (string === "products") string = "محصولات";
  if (string === "CART") string = "سبد خرید";
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .toUpperCase();
};

const BreadCrumb = () => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] =
    useState<{ breadcrumb: string; href: string }[]>();

  useEffect(() => {
    if (pathname) {
      const linkPath = pathname.split("/");
      linkPath.shift();
      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });
      setBreadcrumbs(pathArray);
    }
  }, [pathname]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav aria-label='breadcrumbs' className='w-full p-8'>
      <ol className='breadcrumb flex items-center gap-2'>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <li key={breadcrumb.href} className={`flex items-center gap-1`}>
              {i > 0 ? <ChevronLeftIcon className='w-4' /> : null}
              <div
              // className={`${
              //   i === breadcrumbs.length - 1 ? "bg-blue-300" : "bg-gray-300 "
              // } px-2 py-1 rounded-md h-full`}
              >
                {i === breadcrumbs.length - 1 ? (
                  <div className='flex items-center gap-1'>
                    {i === 0 ? <HomeIcon className='w-5 ml-1' /> : null}
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                  </div>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className='flex items-center gap-1'
                  >
                    {i === 0 ? <HomeIcon className='w-5 ml-1' /> : null}
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
