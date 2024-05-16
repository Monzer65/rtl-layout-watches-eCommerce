"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const convertBreadcrumb = (string: string) => {
  if (string === "blog") string = "خانه";
  if (string === "admin-area") string = "کنترل";
  if (string === "dashboard") string = "داشبورد";
  if (string === "magazine") string = "مجله";
  if (string === "news") string = "اخبار";
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
              {i > 0 ? <span className='ml-1'>/</span> : null}
              <div>
                {i === breadcrumbs.length - 1 ? (
                  <div className='flex items-center gap-1'>
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
                  </div>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className='flex items-center gap-1 underline'
                  >
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
