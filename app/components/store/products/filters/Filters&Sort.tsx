"use client";
import { useCallback, useEffect, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  BarsArrowDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterOptions from "./FilterOptions";

const FiltersAndSort = ({
  productsLength,
}: {
  productsLength: number | undefined;
}) => {
  const [openFilters, setOpenFilters] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const toggleFilters = () => {
    setOpenFilters(!openFilters);
  };

  const toggleSort = () => {
    setOpenSort(!openSort);
  };

  useEffect(() => {
    const handleResize = () => {
      setOpenSort(false);
      setOpenFilters(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sorts = [
    "ارزانترین",
    "گرانترین",
    "بیشترین تخفیف",
    "جدیدترین",
    "پرفروشترین",
    "بالاترین امتیاز",
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "1");
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <div
        className={`${
          openFilters ? "block" : "hidden"
        } lg:hidden fixed inset-0 bg-gray-600 opacity-70 z-30`}
        onClick={() => setOpenFilters(false)}
      ></div>
      <div
        className={`filters overflow-y-scroll fixed inset-x-0 lg:block transition-all duration-500 ${
          openFilters ? "max-h-[350px] bottom-0" : "max-h-0 -bottom-44"
        } bg-white lg:bg-none lg:max-w-[350px] min-h-[50px] lg:max-h-[500px] lg:sticky lg:top-36 lg:right-0 z-40 lg:z-auto overflow-y-auto px-2 [&>*:not(:last-child)]:border-b lg:border border-gray-600 lg:rounded-xl`}
      >
        <div className='flex justify-between py-4 sticky top-0 bg-white z-30'>
          <h3 className='text-xl font-semibold'>فیلترها</h3>
          <button onClick={() => setOpenFilters(false)} className='lg:hidden'>
            <XMarkIcon className='w-8 hover:animate-[wiggle_1s_ease-in-out_infinite] hover:text-red-500' />
          </button>
        </div>
        <FilterOptions setOpenFilters={setOpenFilters} />
      </div>
      <div className='w-full lg:col-start-2 lg:col-end-6 lg:absolute lg:-top-10'>
        <div className='flex justify-between mb-4'>
          <div className='flex gap-2 items-center'>
            <button
              onClick={toggleFilters}
              className='flex gap-1 ml-4 lg:hidden'
            >
              <AdjustmentsHorizontalIcon className='w-6' />
              فیلتر
            </button>
            <button
              onClick={toggleSort}
              className='flex gap-1 md:pointer-events-none'
            >
              <BarsArrowDownIcon className='w-6' />
              مرتب سازی<span className='hidden md:inline-block'>:</span>
            </button>
            <div
              className={`${
                openSort ? "block" : "hidden"
              } md:hidden fixed inset-0 bg-gray-600 opacity-70 z-30`}
              onClick={() => setOpenSort(false)}
            ></div>
            <div
              className={`flex flex-col md:hidden fixed inset-x-0 bg-white p-4 z-40 transition-all duration-500 ${
                openSort ? "max-h-[350px] bottom-0" : "max-h-0 -bottom-44"
              }`}
            >
              <div className='flex justify-between'>
                <p className='text-xl font-semibold'>مرتب سازی بر اساس:</p>
                <button onClick={() => setOpenSort(false)}>
                  <XMarkIcon className='w-8 hover:animate-[wiggle_1s_ease-in-out_infinite] hover:text-red-500' />
                </button>
              </div>
              {sorts.map((item, index) => (
                <button
                  key={index}
                  className='text-sm text-start border-b p-2 hover:bg-gray-100'
                  onClick={() => {
                    router.push(
                      pathname +
                        "?" +
                        createQueryString("sort", item.toString())
                    );
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className='hidden md:flex gap-2'>
              {sorts.map((item, index) => (
                <button
                  key={index}
                  className='hidden md:block text-sm text-gray-500 hover:border-b'
                  onClick={() => {
                    router.push(
                      pathname +
                        "?" +
                        createQueryString("sort", item.toString())
                    );
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <p className='text-sm text-gray-400'>{productsLength} کالا</p>
        </div>
      </div>
    </>
  );
};

export default FiltersAndSort;
