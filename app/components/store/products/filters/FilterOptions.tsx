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
  const [range, setRange] = useState({ start: 0, end: 100 });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();

  const [query, setQuery] = useState(
    searchParams.get("query")?.toString() || ""
  );

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

    Object.entries(selectedOptions).forEach(([parent, values]) => {
      if (values.length > 0) {
        queryParams.set(parent, values.join(","));
      } else {
        queryParams.delete(parent);
      }
    });

    queryParams.set("min-price", String(range.start));
    queryParams.set("max-price", String(range.end));

    replace(`${pathname}?${queryParams.toString()}`);
  };

  const handleClearFilters = () => {
    const queryParams = new URLSearchParams();
    setSelectedOptions({});
    setOpenedOptions({});
    setRange({ start: 0, end: 100 });
    replace(`${pathname}?`);
  };

  const handleToggleOptions = (parent: string) => {
    setOpenedOptions((prevState) => ({
      ...prevState,
      [parent]: !prevState[parent],
    }));
  };

  useEffect(() => {
    const initialSelectedOptions: SelectedOptions = {};
    const initialRange = { start: 0, end: 100 };
    const initialOpenedOptions: OpenedOptions = {};

    searchParams.forEach((value, key) => {
      if (key in options) {
        initialSelectedOptions[key] = value.split(",");
        initialOpenedOptions[key] = true;
      } else if (key === "min-price") {
        initialRange.start = parseInt(value);
      } else if (key === "max-price") {
        initialRange.end = parseInt(value);
      }
    });

    setSelectedOptions(initialSelectedOptions);
    setRange(initialRange);
    setOpenedOptions(initialOpenedOptions);
  }, [searchParams]);

  return (
    <div className='relative pb-10'>
      <PriceRange range={range} setRange={setRange} />
      {Object.entries(options).map(([parent, values]) => (
        <div key={parent} className='bg-gray-100 p-2 mb-2'>
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
                  className='m-[0.125rem] mr-1 block min-h-[1.5rem] ps-[1.5rem]'
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
      <div className='flex gap-2 sticky bottom-0 right-1/2'>
        <button
          className='px-2 py-1 flex-1 rounded-md bg-blue-600 text-white hover:bg-blue-700'
          onClick={handleApplyFilters}
        >
          اعمال فیلتر
        </button>
        <button
          className='px-2 py-1 flex-1 rounded-md bg-red-600 text-white hover:bg-red-700'
          onClick={handleClearFilters}
        >
          حذف فیلتر
        </button>
      </div>
    </div>
  );
};

export default FilterOptions;
