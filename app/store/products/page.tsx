"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import PriceRange from "./filters/PriceRangeOptions";

const PriceRangeOptions = () => {
  // Replace with your price range component
  return <div>Price Range Component</div>;
};

const BrandOptions = () => {
  // Replace with your brand checkboxes component
  return <div>Brand Checkboxes Component</div>;
};

const ModelOptions = () => {
  // Replace with your model options component
  return <div>Model Options Component</div>;
};

const filters = [
  { title: "بازه قیمت", children: <PriceRange min={0} max={10000} /> },
  { title: "برند", children: <BrandOptions /> },
  { title: "مدل", children: <ModelOptions /> },
  { title: "اندازه قاب", children: "" },
  { title: "شکل قاب", children: "" },
  { title: "جنس بدنه", children: "" },
  { title: "جنس بند", children: "" },
  { title: "رنگ بدنه", children: "" },
  { title: "رنگ صفحه", children: "" },
  { title: "رنگ بند", children: "" },
  { title: "نوع موتور", children: "" },
  { title: "نیروی محرکه", children: "" },
];

const Products = () => {
  const [openFilters, setOpenFilters] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleFilter = (index: number) => {
    setOpenFilters((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <main className='px-8 grid md:grid-cols-5 relative'>
      <div className='min-h-[50px] max-h-[500px] md:sticky top-36 right-0 overflow-y-auto bg-red-400 p-2 [&>*:not(:last-child)]:border-b [&>*]:p-2 border border-gray-600 rounded-xl'>
        <div className='flex justify-between border-none'>
          <h3 className='text-xl font-semibold'>فیلترها</h3>
          <button className='text-sm'>حذف همه فیلترها</button>
        </div>
        {filters.map((filter, i) => {
          return (
            <div key={i}>
              <button
                onClick={() => toggleFilter(i)}
                className='w-full flex items-center justify-between'
              >
                <p>{filter.title}</p>
                <ChevronLeftIcon
                  className={`w-4 duration-300  ${
                    openFilters[i] ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openFilters[i] && (
                <div className='text-sm py-4'>{filter.children}</div>
              )}
            </div>
          );
        })}
      </div>
      <div className='min-h-screen w-full bg-blue-400 md:col-span-4 '>
        <div className='bg-fuchsia-400 px-4'>some header</div>
        <div className='grid grid-cols-[repeat(auto-fit_,_minmax(250px_,_1fr))] gap-2 px-4 pb-4'>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
          <div className='bg-black min-h-[200px]'></div>
        </div>
      </div>
    </main>
  );
};

export default Products;
