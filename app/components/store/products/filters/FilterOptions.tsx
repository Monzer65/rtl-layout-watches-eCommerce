"use client";

import { options } from "@/app/lib/productFilterOptions";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PriceRange from "./PriceRangeOptions";

interface SelectedOptions {
  [key: string]: string[];
}

interface OpenedOptions {
  [key: string]: boolean;
}

const FilterOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [openedOptions, setOpenedOptions] = useState<OpenedOptions>({});
  let max = 100000000;
  const [range, setRange] = useState({ start: 0, end: max });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleOptionChange = (parent: string, value: string) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [parent]: prevState[parent]
        ? prevState[parent].includes(value)
          ? prevState[parent].filter((item) => item !== value)
          : [...prevState[parent], value]
        : [value],
    }));
  };

  const handleApplyFilters = () => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("page", "1");
    queryParams.set("sort", "");

    Object.entries(selectedOptions).forEach(([parent, values]) => {
      if (values.length > 0) {
        queryParams.set(parent, values.join(","));
      } else {
        queryParams.delete(parent);
      }
    });

    const sanitizedRange = {
      start: Math.max(0, Math.min(range.start, max)),
      end: Math.max(0, Math.min(range.end, max)),
    };

    if (sanitizedRange.start <= sanitizedRange.end) {
      queryParams.set("minPrice", String(sanitizedRange.start));
      queryParams.set("maxPrice", String(sanitizedRange.end));
    } else {
      queryParams.delete("minPrice");
      queryParams.delete("maxPrice");
    }

    replace(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const handleClearFilters = () => {
    const queryParams = new URLSearchParams(searchParams);

    // List of filter-related parameters to clear
    const filterParams = [
      "minPrice",
      "maxPrice",
      ...Object.keys(selectedOptions),
    ];

    filterParams.forEach((param) => queryParams.delete(param));

    setSelectedOptions({});
    setOpenedOptions({});
    setRange({ start: 0, end: max });

    replace(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const handleToggleOptions = (parent: string) => {
    setOpenedOptions((prevState) => ({
      ...prevState,
      [parent]: !prevState[parent],
    }));
  };

  useEffect(() => {
    const initialSelectedOptions: SelectedOptions = {};
    const initialRange = { start: 0, end: max };
    const initialOpenedOptions: OpenedOptions = {};

    searchParams.forEach((value, key) => {
      if (key in options) {
        initialSelectedOptions[key] = value.split(",");
        initialOpenedOptions[key] = true;
      } else if (key === "minPrice") {
        const minPrice = parseInt(value);
        if (minPrice >= 0 && minPrice <= max) {
          initialRange.start = minPrice;
        }
      } else if (key === "maxPrice") {
        const maxPrice = parseInt(value);
        if (maxPrice >= 0 && maxPrice <= max) {
          initialRange.end = maxPrice;
        }
      }
    });

    setSelectedOptions(initialSelectedOptions);
    setRange(initialRange);
    setOpenedOptions(initialOpenedOptions);
  }, [max, searchParams]);

  return (
    <div className=' pb-10'>
      <div className='flex gap-2 sticky top-14 right-1/2 z-30 my-2 bg-white w-full'>
        <button
          className='px-2 py-1 flex-1 rounded-md bg-gray-700 text-white hover:bg-gray-800'
          onClick={handleApplyFilters}
        >
          اعمال فیلتر
        </button>
        <button
          className='px-2 py-1 flex-1 rounded-md bg-pink-800 text-white hover:bg-red-900'
          onClick={handleClearFilters}
        >
          حذف فیلتر
        </button>
      </div>
      <PriceRange range={range} setRange={setRange} />
      {Object.entries(options).map(([parent, values]) => (
        <div key={parent} className='bg-white p-2 mb-1'>
          <div
            onClick={() => handleToggleOptions(parent)}
            className='flex justify-between items-center cursor-pointer'
          >
            <h3 className='cursor-pointer'>{parent}</h3>
            <ChevronLeftIcon
              className={`w-5 ${
                openedOptions[parent] ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
          {openedOptions[parent] && (
            <div>
              {values.map((value) => (
                <div
                  key={value}
                  className={`m-[0.125rem] mr-1 block min-h-[1.5rem] ps-[1.5rem] hover:bg-gray-100 ${
                    selectedOptions[parent]?.includes(value)
                      ? "bg-gray-100"
                      : "bg-inherit"
                  }`}
                >
                  <input
                    type='checkbox'
                    id={parent + value}
                    checked={selectedOptions[parent]?.includes(value)}
                    onChange={() => handleOptionChange(parent, value)}
                    className=" relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-gray-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-gray-500 checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-blue-500 checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-blue-500 checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary focus:outline-none"
                  />
                  <label
                    htmlFor={parent + value}
                    className='inline-block ps-[0.15rem] hover:cursor-pointer'
                  >
                    {value}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterOptions;
