"use client";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import StarRating from "./StarRating";
import { useState } from "react";

const ReviewForm = () => {
  const [powerInput, setPowerInput] = useState("");
  const [powerList, setPowerList] = useState<string[]>([]);
  const [weaknessInput, setWeaknessInput] = useState("");
  const [weaknessList, setWeaknessList] = useState<string[]>([]);

  return (
    <form>
      <div className='my-4'>
        <StarRating />
      </div>
      <div className='mb-6 relative'>
        <label
          htmlFor='power'
          className='block text-sm font-medium text-gray-700'
        >
          نقاط قوت
        </label>
        <input
          type='text'
          name='power'
          onChange={(e) => setPowerInput(e.target.value)}
          autoComplete='off'
          placeholder='نقاط قوت'
          className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
        />
        <button
          type='button'
          onClick={() => {
            setPowerList((currentList) => [...currentList, powerInput]);
          }}
          aria-label='adding power points'
          className='absolute left-4 top-[28px]'
        >
          <PlusCircleIcon className='w-8 text-green-600' />
        </button>
        <ul className='my-2 pr-8 list-disc marker:text-green-700 marker:bg-gray-100'>
          {powerList.map((item, index) => (
            <li key={item} className='px-2 py-1 bg-gray-100 mt-1 rounded-md'>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className='mb-4 relative'>
        <label
          htmlFor='weakness'
          className='block text-sm font-medium text-gray-700'
        >
          نقاط ضعف
        </label>
        <input
          type='text'
          name='weakness'
          onChange={(e) => setWeaknessInput(e.target.value)}
          autoComplete='off'
          placeholder='نقاط ضعف'
          className='relative mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
        />
        <button
          type='button'
          onClick={() => {
            setWeaknessList((currentList) => [...currentList, weaknessInput]);
          }}
          aria-label='adding power points'
          className='absolute left-4 top-[28px]'
        >
          <PlusCircleIcon className='w-8 text-green-600' />
        </button>
        <ul className='my-2 list-disc pr-8 marker:text-red-500'>
          {weaknessList.map((item, index) => (
            <li key={item} className='px-2 py-1 bg-gray-100 mt-1 rounded-md'>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className='mb-6'>
        <label
          htmlFor='comment-text'
          className='block text-sm font-medium text-gray-700'
        >
          متن نظر
        </label>
        <textarea
          name='comment-text'
          className='mt-1 block w-full min-h-[200px] border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-none'
          placeholder='نظر خود را بنویسید'
        />
      </div>
      <div className='mb-6 flex flex-col gap-2'>
        <div className='flex gap-1'>
          <input
            type='radio'
            id='suggest'
            name='suggestions'
            value={"suggest"}
            className="relative h-5 w-5 appearance-none rounded-full border-2 border-solid border-gray-500 outline-none focus-within:outline-gray-500 checked:border-gray-700 checked:bg-primary checked:after:absolute checked:after:block checked:after:h-[80%] checked:after:w-[80%] checked:after:-translate-x-[10%]   checked:after:translate-y-[10%] checked:after:rounded-full checked:after:bg-blue-500 checked:after:content-[''] hover:cursor-pointer"
          />
          <label
            htmlFor='suggest'
            className='block font-medium text-gray-700 hover:cursor-pointer'
          >
            محصول را پیشنهاد میکنم
          </label>
        </div>
        <div className='flex gap-1'>
          <input
            type='radio'
            id='not-suggest'
            name='suggestions'
            value={"not-suggest"}
            className="relative h-5 w-5 appearance-none rounded-full border-2 border-solid border-gray-500 outline-none focus-within:outline-gray-500 checked:border-gray-700 checked:bg-primary checked:after:absolute checked:after:block checked:after:h-[80%] checked:after:w-[80%] checked:after:-translate-x-[10%]   checked:after:translate-y-[10%] checked:after:rounded-full checked:after:bg-blue-500 checked:after:content-[''] hover:cursor-pointer"
          />
          <label
            htmlFor='not-suggest'
            className='block font-medium text-gray-700 hover:cursor-pointer'
          >
            محصول را پیشنهاد نمیکنم
          </label>
        </div>
        <div className='flex gap-1'>
          <input
            type='radio'
            id='not-sure'
            name='suggestions'
            value={"not-sure"}
            className="relative h-5 w-5 appearance-none rounded-full border-2 border-solid border-gray-500 outline-none focus-within:outline-gray-500 checked:border-gray-700 checked:bg-primary checked:after:absolute checked:after:block checked:after:h-[80%] checked:after:w-[80%] checked:after:-translate-x-[10%]   checked:after:translate-y-[10%] checked:after:rounded-full checked:after:bg-blue-500 checked:after:content-[''] hover:cursor-pointer"
          />
          <label
            htmlFor='not-sure'
            className='block font-medium text-gray-700 hover:cursor-pointer'
          >
            مطمئن نیستم
          </label>
        </div>
      </div>
      <button
        onClick={(e) => e.preventDefault()}
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        افزودن نظر
      </button>
    </form>
  );
};

export default ReviewForm;
