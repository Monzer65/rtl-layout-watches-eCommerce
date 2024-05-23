"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 0 && page <= totalPages) {
      params.set("page", page.toString());
      return `${pathname}?${params.toString()}`;
    }
    return "#";
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        if (currentPage > 4) {
          pages.push("...");
        } else {
          pages.push(2);
        }
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3) {
          pages.push("...");
        } else {
          pages.push(totalPages - 1);
        }
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='flex justify-center items-center gap-2 mt-4'>
      <Link
        href={setPage(currentPage - 1) || "#"}
        className={`flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center text-xs sm:text-sm border rounded-md ${
          currentPage === 1
            ? "bg-white text-gray-700 pointer-events-none opacity-40"
            : "bg-white text-gray-900 hover:bg-gray-200 hover:text-gray-900"
        }`}
      >
        <ArrowRightIcon className='w-4' />
      </Link>
      {pageNumbers.map((page, index) => (
        <Link
          href={typeof page === "number" ? setPage(page) || "#" : "#"}
          key={index}
          className={`flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center text-xs sm:text-sm border rounded-md ${
            currentPage === page
              ? "bg-blue-500 text-gray-100 pointer-events-none"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          } ${typeof page === "string" && "pointer-events-none bg-gray-100"}`}
        >
          {page}
        </Link>
      ))}
      <Link
        href={setPage(currentPage + 1) || "#"}
        className={`flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center text-xs sm:text-sm border rounded-md ${
          currentPage === totalPages
            ? "bg-white text-gray-700 pointer-events-none opacity-40"
            : "bg-white text-gray-900 hover:bg-gray-200 hover:text-gray-900"
        }`}
      >
        <ArrowLeftIcon className='w-4' />
      </Link>
    </div>
  );
};

export default Pagination;
