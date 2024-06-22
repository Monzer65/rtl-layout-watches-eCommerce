"use client";

import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "react-dom";
import { createProduct } from "@/app/lib/actions";
import {
  ArrowUturnLeftIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Image from "next/image";

const CreateProductForm = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [state, dispatch] = useFormState(createProduct, undefined);

  const addImageUrl = (url: string) => {
    if (url.length < 3) return;
    setImageUrls([...imageUrls, url]);
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const addImageFile = (e: any) => {
    const images = e.target.files;
    const newImages = [...images].filter((img) => {
      // Check for image size and image format here
      // if(img.size < 1024 * 1024 && img.type.startsWith("image/")) return img
      return img;
    });

    setImageFiles((prev) => [...newImages, ...prev]);
  };

  const removeImageFile = (index: number) => {
    const result = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (result) {
      // Logic to delete the image
      const updatedImages = [...imageFiles];
      updatedImages.splice(index, 1);
      setImageFiles(updatedImages);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (!imageFiles.length) return alert("عکس باید انتخاب شود");
    if (imageFiles.length > 3) return alert("حداکثر 3 عکس انتخاب شود");

    imageFiles.forEach((img, index) => {
      formData.append(`images`, img);
    });

    dispatch(formData);
  };

  return (
    <form
      action={handleSubmit}
      className={`mx-auto my-8 p-4 border rounded shadow ${
        state?.error ? "border-red-500" : ""
      }`}
    >
      <div className='mb-4'>
        <label htmlFor='name' className='block font-semibold mb-1'>
          نام محصول<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='ساعت مچی مردانه'
          className='w-full p-2 border rounded'
          required
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
          required
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
          required
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
          required
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
          required
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='gender' className='block font-semibold mb-1'>
          جنسیت<span className='text-red-500'>*</span>
        </label>
        <select
          name='gender'
          id='gender'
          className='w-full p-2 border rounded'
          required
        >
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
        <label htmlFor='price' className='block font-medium'>
          قیمت (تومان)<span className='text-red-500'>*</span>
          <input
            type='number'
            name='price'
            id='price'
            min='0'
            placeholder='۳۰۰۰۰۰'
            className='w-full p-2 border rounded'
            required
          />
        </label>
      </div>

      <div className='mb-4'>
        <label htmlFor='buy_price' className='block font-medium'>
          قیمت خرید(تومان)<span className='text-red-500'>*</span>
          <input
            type='number'
            name='buy_price'
            id='buy_price'
            min='0'
            placeholder='۳۰۰۰۰۰'
            className='w-full p-2 border rounded'
            required
          />
        </label>
      </div>

      <div className='mb-4'>
        <label htmlFor='sale_price' className='block font-semibold mb-1'>
          قیمت فروش (ریال)<span className='text-red-500'>*</span>
        </label>
        <input
          type='number'
          name='sale_price'
          id='sale_price'
          placeholder='۳۰۰۰۰۰'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='short_description' className='block font-semibold mb-1'>
          توضیحات کوتاه
        </label>
        <textarea
          name='short_description'
          id='short_description'
          rows={2}
          placeholder='یک ساعت دیجیتال کلاسیک با صفحه‌ی نقره‌ای و بند استیل ضدزنگ، دارای آلارم و کرنومتر.'
          className='w-full p-2 border rounded'
          required
        ></textarea>
      </div>

      <div className='mb-4'>
        <label htmlFor='description' className='block font-semibold mb-1'>
          توضیحات
        </label>
        <textarea
          name='description'
          id='description'
          rows={6}
          placeholder='یک ساعت دیجیتال کلاسیک از برند کاسیو، مدل A158WA، با طراحی شیک و مقاوم در برابر آب تا 3 اتمسفر. این ساعت دارای آلارم، تقویم، لامپ ال ای دی و کرنومتر می‌باشد.'
          className='w-full p-2 border rounded'
          required
        ></textarea>
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
        <label htmlFor='file' className='block font-semibold mb-1'>
          فایل تصاویر
        </label>
        <input
          type='file'
          accept='image/'
          multiple
          name='file'
          id='file'
          onChange={addImageFile}
          className='w-full p-2 border rounded'
          required
        />

        <div className='flex gap-2 flex-wrap [&>*]:border '>
          {imageFiles.map((img, index) => {
            const url = URL.createObjectURL(img);
            return (
              <div key={index} className='relative'>
                <Image
                  src={url}
                  alt={""}
                  width={100}
                  height={100}
                  className='object-cover'
                />
                <button
                  onClick={(e) => {
                    e.preventDefault;
                    removeImageFile(index);
                  }}
                  type='button'
                  className='absolute top-0 right-0 text-red-600 bg-slate-300 bg-opacity-45'
                >
                  <XMarkIcon className='w-6' />{" "}
                  <span className='sr-only'>حذف تصویر</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Link
          href='/admin-area/store/products'
          className='flex gap-1 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 active:scale-95'
        >
          <ArrowUturnLeftIcon className='w-4 md:w-6' />
          انصراف
        </Link>
        <SubmitButton
          type='submit'
          className='flex-1 gap-1 text-center active:scale-95'
        >
          <RocketLaunchIcon className='w-4 md:w-6' />
          ایجاد محصول
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
