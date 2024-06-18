"use client";

import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "react-dom";
import { createProduct } from "@/app/lib/actions";
import {
  PlusCircleIcon,
  RocketLaunchIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const CreateProductForm = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const addImageUrl = (url: string) => {
    if (url.length < 3) return;
    setImageUrls([...imageUrls, url]);
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const [state, dispatch] = useFormState(createProduct, undefined);

  return (
    <form
      action={dispatch}
      className={`mx-auto my-8 p-4 border rounded shadow ${
        state?.error ? "border-red-500" : ""
      }`}
    >
      <div className='mb-4'>
        <label htmlFor='productName' className='block font-semibold mb-1'>
          نام محصول<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='productName'
          id='productName'
          placeholder='ساعت مچی مردانه'
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='manufacturer' className='block font-semibold mb-1'>
          تولید کننده<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='manufacturer'
          id='manufacturer'
          placeholder='شرکت کاسیو'
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='manufacture_location'
          className='block font-semibold mb-1'
        >
          محل تولید
        </label>
        <input
          type='text'
          name='manufacture_location'
          id='manufacture_location'
          placeholder='ژاپن'
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='brand' className='block font-semibold mb-1'>
          برند<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='brand'
          id='brand'
          placeholder='کاسیو'
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='model' className='block font-semibold mb-1'>
          مدل<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='model'
          id='model'
          placeholder='A158WA'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='gender' className='block font-semibold mb-1'>
          جنسیت<span className='text-red-500'>*</span>
        </label>
        <select name='gender' id='gender' className='w-full p-2 border rounded'>
          <option value='male'>مردانه</option>
          <option value='female'>زنانه</option>
          <option value='unspecified'>نامشخص</option>
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor='style' className='block font-semibold mb-1'>
          استایل
        </label>
        <input
          type='text'
          name='style'
          id='style'
          placeholder='کلاسیک دیجیتال'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='functions' className='block font-semibold mb-1'>
          عملکردها
        </label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <div className='flex gap-1 [&>*]:cursor-pointer'>
            <input
              type='checkbox'
              name='functions'
              id='alarm'
              value='آلارم'
              className='mr-2'
            />
            <label htmlFor='alarm'>آلارم</label>
          </div>
          <div className='flex gap-1 [&>*]:cursor-pointer'>
            <input
              type='checkbox'
              name='functions'
              id='calendar'
              value='تقویم'
              className='mr-2'
            />
            <label htmlFor='calendar'>تقویم</label>
          </div>
          <div className='flex gap-1 [&>*]:cursor-pointer'>
            <input
              type='checkbox'
              name='functions'
              id='led'
              value='لامپ ال ای دی'
              className='mr-2'
            />
            <label htmlFor='led'>لامپ ال ای دی</label>
          </div>
          <div className='flex gap-1 [&>*]:cursor-pointer'>
            <input
              type='checkbox'
              name='functions'
              id='chronometer'
              value='کرنومتر'
              className='mr-2'
            />
            <label htmlFor='chronometer'>کرنومتر</label>
          </div>
          <div className='flex gap-1 [&>*]:cursor-pointer'>
            <input
              type='checkbox'
              name='functions'
              id='heartrate'
              value='سنسور ضربان قلب'
              className='mr-2'
            />
            <label htmlFor='heartrate'>سنسور ضربان قلب</label>
          </div>
          <div className='flex gap-1 [&>*]:cursor-pointer'>
            <input
              type='checkbox'
              name='functions'
              id='gps'
              value='جی پی اس'
              className='mr-2'
            />
            <label htmlFor='gps'>جی پی اس</label>
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <span className='block font-semibold mb-1'>ویژگی‌ها</span>
        <div className='grid grid-cols-1 gap-4'>
          <label htmlFor='movement' className='block font-medium'>
            حرکت
            <input
              type='text'
              name='movement'
              id='movement'
              placeholder='کوارتز تک باتری'
              className='w-full p-2 border rounded'
            />
          </label>
          <label htmlFor='bezelMaterial' className='block font-medium'>
            جنس بزل (قاب رویی)
            <input
              type='text'
              name='bezelMaterial'
              id='bezelMaterial'
              placeholder='رزین با پوشش کروم'
              className='w-full p-2 border rounded'
            />
          </label>
          <label
            htmlFor='bezelColor'
            className='block font-medium text-gray-700'
          >
            رنگ بزل (قاب رویی)
            <input
              type='color'
              name='bezelColor'
              id='bezelColor'
              className='mt-1 block w-[150px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </label>

          <label htmlFor='caseMaterial' className='block font-medium'>
            جنس بدنه
            <input
              type='text'
              name='caseMaterial'
              id='caseMaterial'
              placeholder='رزین با پوشش کروم'
              className='w-full p-2 border rounded'
            />
          </label>
          <label
            htmlFor='caseColor'
            className='block font-medium text-gray-700'
          >
            رنگ بدنه
            <input
              type='color'
              name='caseColor'
              id='caseColor'
              className='mt-1 block w-[150px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </label>
          <label htmlFor='bandMaterial' className='block font-medium'>
            جنس بند
            <input
              type='text'
              name='bandMaterial'
              id='bandMaterial'
              placeholder='استیل ضدزنگ'
              className='w-full p-2 border rounded'
            />
          </label>
          <label
            htmlFor='bandColor'
            className='block font-medium text-gray-700'
          >
            رنگ بند
            <input
              type='color'
              name='bandColor'
              id='bandColor'
              className='mt-1 block w-[150px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </label>
          <label
            htmlFor='dialColor'
            className='block font-medium text-gray-700'
          >
            رنگ دایال
            <input
              type='color'
              name='dialColor'
              id='dialColor'
              className='mt-1 block w-[150px] border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </label>
          <label htmlFor='waterResistance' className='block font-medium'>
            مقاومت در برابر آب
            <input
              type='text'
              name='waterResistance'
              id='waterResistance'
              placeholder='3 اتمسفر'
              className='w-full p-2 border rounded'
            />
          </label>
          <label htmlFor='warranty' className='block font-medium'>
            گارانتی
            <input
              type='text'
              name='warranty'
              id='warranty'
              placeholder='2 سال'
              className='w-full p-2 border rounded'
            />
          </label>
        </div>
      </div>

      <div className='mb-4'>
        <span className='block font-semibold mb-1'>خصوصیات</span>
        <div className='grid grid-cols-1 gap-4'>
          <label htmlFor='caseShape' className='block font-medium'>
            شکل قاب
            <input
              type='text'
              name='caseShape'
              id='caseShape'
              placeholder='چهارگوش، دایره ...'
              className='w-full p-2 border rounded'
            />
          </label>
          <label htmlFor='caseDiameter' className='block font-medium'>
            قطر قاب (میلیمتر)
            <input
              type='number'
              name='caseDiameter'
              id='caseDiameter'
              placeholder='33'
              className='w-full p-2 border rounded'
            />
          </label>
          <label htmlFor='caseThickness' className='block font-medium'>
            ضخامت قاب (میلیمتر)
            <input
              type='number'
              name='caseThickness'
              id='caseThickness'
              placeholder='8'
              className='w-full p-2 border rounded'
            />
          </label>
          <label htmlFor='lugWidth' className='block font-medium'>
            عرض لاگ (میلیمتر)
            <input
              type='number'
              name='lugWidth'
              id='lugWidth'
              placeholder='18'
              className='w-full p-2 border rounded'
            />
          </label>
          <label htmlFor='weight' className='block font-medium'>
            وزن (گرم)
            <input
              type='number'
              name='weight'
              id='weight'
              placeholder='48'
              className='w-full p-2 border rounded'
            />
          </label>
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='compilation' className='block font-semibold mb-1'>
          مجموعه
        </label>
        <input
          type='text'
          name='compilation'
          id='compilation'
          placeholder='دست ساز'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='price' className='block font-semibold mb-1'>
          قیمت (ریال)<span className='text-red-500'>*</span>
        </label>
        <input
          type='number'
          name='price'
          id='price'
          placeholder='12000000'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='sale_price' className='block font-semibold mb-1'>
          قیمت فروش (ریال)<span className='text-red-500'>*</span>
        </label>
        <input
          type='number'
          name='sale_price'
          id='sale_price'
          placeholder='9990000'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='description' className='block font-semibold mb-1'>
          توضیحات<span className='text-red-500'>*</span>
        </label>
        <textarea
          name='description'
          id='description'
          className='w-full p-2 border rounded'
          rows={3}
          draggable={false}
          placeholder=''
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='stock' className='block font-semibold mb-1'>
          موجودی
        </label>
        <input
          type='number'
          name='stock'
          id='stock'
          placeholder='8'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='reference' className='block font-semibold mb-1'>
          شناسه مرجع
        </label>
        <input
          type='text'
          name='reference'
          id='reference'
          placeholder='REF12345'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='sku' className='block font-semibold mb-1'>
          شناسه اس کی یو<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='sku'
          id='sku'
          placeholder='SKU12345'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='ean_upc' className='block font-semibold mb-1'>
          شناسه ای ای ان یو پی سی
        </label>
        <input
          type='text'
          name='ean_upc'
          id='ean_upc'
          placeholder='EAN1234512345'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4 [&>*]:cursor-pointer font-bold'>
        <label htmlFor='availability' className='flex gap-1'>
          <input
            type='checkbox'
            id='availability'
            name='availability'
            defaultChecked
          />
          <span>در دسترس</span>
        </label>
      </div>

      <div className='mb-4'>
        <label htmlFor='images' className='block font-semibold mb-1'>
          لینک تصاویر<span className='text-red-500'>*</span>
        </label>

        {imageUrls.map((url, index) => (
          <div key={index} className='flex items-center gap-4 mb-1'>
            <button
              type='button'
              className='text-red-500'
              onClick={() => removeImageUrl(index)}
            >
              <span className='sr-only'>افزودن لینک تصویر</span>
              <XMarkIcon className='w-6' />
            </button>
            <input
              type='text'
              name='images'
              value={url}
              readOnly
              className='p-1 rounded border'
            />
          </div>
        ))}

        <label
          htmlFor='ImageInput'
          className='flex justify-between items-center gap-4 font-semibold mb-1'
        >
          <span className='sr-only'>افزودن تصویر</span>
          <input
            type='text'
            name='imageInput'
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addImageUrl(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
            placeholder='لینک تصویر را وارد کنید و دکمه انتر را بزنید'
            className='w-full p-2 border rounded'
          />
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              const input = document.querySelector(
                'input[name="imageInput"]'
              ) as HTMLInputElement;
              addImageUrl(input.value);
              input.value = "";
            }}
            className=''
          >
            <span className='sr-only'>افزودن لینک تصویر</span>
            <PlusCircleIcon className='w-10 text-blue-600' />
          </button>
        </label>
      </div>

      <div className='mb-4'>
        <label htmlFor='releaseDate' className='block font-semibold mb-1'>
          تاریخ تولید (میلادی)
        </label>
        <input
          type='date'
          name='releaseDate'
          id='releaseDate'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='tags' className='block font-semibold mb-1'>
          تگ ها
        </label>
        <input
          type='text'
          name='tags'
          id='tags'
          placeholder='مردانه، کلاسیک ...'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='flex items-center gap-4'>
        <Link
          href='/admin-area/store/customers'
          className='flex gap-1 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          <XMarkIcon className='w-4 md:w-6' />
          انصراف
        </Link>
        <SubmitButton type='submit' className='gap-1'>
          <RocketLaunchIcon className='w-4 md:w-6' />
          ارسال
        </SubmitButton>
      </div>
      {state?.error && (
        <div
          id='amount-error'
          aria-live='polite'
          className='fixed bottom-6 md:bottom-4 left-0 md:left-auto md:right-0 max-w-[200px] m-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded'
        >
          {state.error}
        </div>
      )}
    </form>
  );
};

export default CreateProductForm;
