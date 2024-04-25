"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import PriceRange from "./filters/PriceRangeOptions";
import Options from "./filters/CheckboxOptions";
import productImage from "@/public/images/sample.png";
import productImage_1 from "@/public/images/sample_1.jpg";
import Image from "next/image";
import Link from "next/link";

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

const products = [
  { title: "Seiko model", imgSrc: productImage, price: 250000 },
  { title: "Seiko model", imgSrc: productImage, price: 250000 },
  { title: "Seiko model", imgSrc: productImage, price: 250000 },
  { title: "Seiko model", imgSrc: productImage, price: 250000 },
  { title: "Seiko model", imgSrc: productImage, price: 250000 },
  { title: "Seiko model", imgSrc: productImage, price: 250000 },
  { title: "Seiko model", imgSrc: productImage, price: 250000 },
  { title: "Seiko model", imgSrc: productImage_1, price: 250000 },
  { title: "Seiko model", imgSrc: productImage_1, price: 250000 },
  { title: "Seiko model", imgSrc: productImage_1, price: 250000 },
  { title: "Seiko model", imgSrc: productImage_1, price: 250000 },
  { title: "Seiko model", imgSrc: productImage_1, price: 250000 },
  { title: "Seiko model", imgSrc: productImage_1, price: 250000 },
  { title: "Seiko model", imgSrc: productImage_1, price: 250000 },
  { title: "Seiko model", imgSrc: productImage_1, price: 250000 },
];

const Products = () => {
  const [openFilters, setOpenFilters] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [checkedOptions, setCheckedOptions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleFilter = (index: number) => {
    setOpenFilters((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleOption = (option: string) => {
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
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
          onToggleOption={toggleOption}
          options={others}
        />
      ),
      type: "checkBox",
    },
  ];

  return (
    <main className='px-8 grid lg:grid-cols-5 relative'>
      <div className='filters min-h-[50px] max-h-[500px] lg:sticky top-36 right-0 overflow-y-auto px-2 pt-2 pb-8 [&>*:not(:last-child)]:border-b [&>*]:p-2 border border-gray-600 rounded-xl'>
        <div className='flex justify-between'>
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
                <div className='text-sm py-4'>{filter.options}</div>
              )}
            </div>
          );
        })}
      </div>
      <div className='min-h-screen w-full lg:col-span-4 '>
        <div className='px-4'>sorting goes here</div>
        <div className='grid grid-cols-[repeat(auto-fit_,_minmax(250px_,_1fr))] gap-2 lg:px-4 pb-4'>
          {products.map((item, index) => (
            <div
              key={index}
              className='min-h-[200px] p-2 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 ease-in-out'
            >
              <Link href={"/"}>
                <Image
                  src={item.imgSrc}
                  alt={`product ${item.title}`}
                  className='w-full h-[200px] object-contain'
                />
                <h3 className='text-lg font-bold my-2 mx-4'>{item.title}</h3>
              </Link>
              <p className='text-base text-gray-800 my-2 mx-4'>{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
