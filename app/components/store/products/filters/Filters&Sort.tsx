"use client";
import { useEffect, useState } from "react";
import Options from "./CheckboxOptions";
import PriceRange from "./PriceRangeOptions";
import {
  AdjustmentsHorizontalIcon,
  BarsArrowDownIcon,
  ChevronLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const FiltersAndSort = ({
  productsLength,
}: {
  productsLength: number | undefined;
}) => {
  const brands = [
    "Rolex",
    "Omega",
    "Seiko",
    "Casio",
    "Timex",
    "Citizen",
    "Grand Seiko",
    "Patek Philippe",
    "Cartier",
    "Tag Heuer",
  ];
  const models = [
    "Submariner",
    "Speedmaster",
    "Prospex",
    "G-Shock",
    "Weekender",
    "Eco-Drive",
    "Spring Drive",
    "Nautilus",
    "Santos",
    "Carrera",
  ];
  const caseSizes = [
    "40mm",
    "42mm",
    "43mm",
    "46mm",
    "38mm",
    "Brass",
    "High-Intensity Titanium",
    "White Gold",
  ];
  const caseShape = ["Round", "Divers", "Grand Seiko", "Square"];
  const caseMaterials = ["Stainless Steel", "Resin", "Crocodile", "Alligator"];
  const caseColors = ["Silver", "Black", "Rose Gold", "Steel"];
  const bandMaterials = [
    "Oystersteel",
    "Leather",
    "Stainless Steel",
    "Crocodile",
    "Alligator",
  ];
  const bandColors = ["Black", "Brown", "Silver"];
  const dialColors = ["Black", "White", "Blue"];
  const movements = ["Automatic", "Quartz", "Spring Drive"];
  const waterResistance = [
    "1 ATM",
    "2 ATM",
    "3 ATM",
    "4 ATM",
    "5 ATM",
    "6 ATM",
    "7 ATM",
    "8 ATM",
    "9 ATM",
    "10 ATM",
  ];
  const others = ["Calendar", "Chronometer", "Solar power"];

  const [openOptions, setOpenOptions] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [checkedOptions, setCheckedOptions] = useState<{
    [key: string]: boolean;
  }>({});

  const [openFilters, setOpenFilters] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const toggleOptions = (index: number) => {
    setOpenOptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleCheckOption = (option: string) => {
    setCheckedOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };
  const filters = [
    {
      title: "بازه قیمت",
      options: <PriceRange min={0} max={10000} />,
      type: "range",
    },
    {
      title: "برند",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={brands}
        />
      ),
      type: "checkBox",
    },
    {
      title: "مدل",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={models}
        />
      ),
      type: "checkBox",
    },
    {
      title: "اندازه قاب",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={caseSizes}
        />
      ),
      type: "checkBox",
    },
    {
      title: "شکل قاب",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={caseShape}
        />
      ),
      type: "checkBox",
    },
    {
      title: "جنس قاب",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={caseMaterials}
        />
      ),
      type: "checkBox",
    },
    {
      title: "رنگ قاب",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={caseColors}
        />
      ),
      type: "checkBox",
    },
    {
      title: "جنس بند",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={bandMaterials}
        />
      ),
      type: "checkBox",
    },
    {
      title: "رنگ بند",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={bandColors}
        />
      ),
      type: "checkBox",
    },
    {
      title: "رنگ صفحه",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={dialColors}
        />
      ),
      type: "checkBox",
    },
    {
      title: "محرکه",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={movements}
        />
      ),
      type: "checkBox",
    },
    {
      title: "سایر",
      options: (
        <Options
          checkedOptions={checkedOptions}
          onToggleOption={toggleCheckOption}
          options={others}
        />
      ),
      type: "checkBox",
    },
  ];

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
  ];

  return (
    <>
      <div
        className={`${
          openFilters ? "block" : "hidden"
        } lg:hidden fixed inset-0 bg-gray-600 opacity-70 z-30`}
        onClick={() => setOpenFilters(false)}
      ></div>
      <div
        className={`filters fixed inset-x-0 lg:block transition-all duration-500 ${
          openFilters ? "max-h-[350px] bottom-0" : "max-h-0 -bottom-44"
        } bg-white lg:bg-none lg:max-w-[350px] min-h-[50px] lg:max-h-[500px] lg:sticky lg:top-36 lg:right-0 z-40 lg:z-auto overflow-y-auto px-2 pt-2 pb-8 [&>*:not(:last-child)]:border-b lg:border border-gray-600 lg:rounded-xl`}
      >
        <div className='flex justify-between pb-4'>
          <h3 className='text-xl font-semibold'>فیلترها</h3>
          <button className='text-sm hover:text-red-500'>
            حذف همه فیلترها
          </button>
          <button onClick={() => setOpenFilters(false)} className='lg:hidden'>
            <XMarkIcon className='w-8 hover:animate-[wiggle_1s_ease-in-out_infinite] hover:text-red-500' />
          </button>
        </div>
        {filters.map((filter, i) => {
          return (
            <div key={i}>
              <button
                onClick={() => toggleOptions(i)}
                className='w-full flex items-center justify-between p-2 hover:bg-gray-100'
              >
                <p>{filter.title}</p>
                <ChevronLeftIcon
                  className={`w-4 duration-300  ${
                    openOptions[i] ? "rotate-90" : ""
                  }`}
                />
              </button>
              {openOptions[i] && (
                <div className='text-sm py-4'>{filter.options}</div>
              )}
            </div>
          );
        })}
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
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <p className='text-sm text-gray-400'>
            {productsLength ? productsLength : "تعداد نامشخص"} کالا
          </p>
        </div>
      </div>
    </>
  );
};

export default FiltersAndSort;
