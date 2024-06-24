"use client";

import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "react-dom";
import { updateProduct } from "@/app/lib/actions";
import {
  ArrowUturnLeftIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import { Product } from "@/app/lib/definitions";

const EditProductForm = ({
  product = {} as Product,
}: {
  product?: Product;
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>(product.images);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [clientErrors, setClientErrors] = useState<string[]>([]);
  const [state, dispatch] = useFormState(
    updateProduct.bind(null, product._id),
    undefined
  );

  const allowedDomains = [
    "imgbb.com",
    "cloudinary.com",
    "casio.com",
    "picsum.photos",
    "lh3.googleusercontent.com",
  ];

  const isValidImageUrl = (url: string) => {
    const imageExtensionRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (!imageExtensionRegex.test(url)) return false;
    const hostname = new URL(url).hostname;
    return allowedDomains.some((domain) => hostname.endsWith(domain));
  };

  const addImageUrl = (url: string) => {
    setClientErrors([]);
    if (state) {
      state.error = undefined;
    }

    if (url.length < 3) {
      setClientErrors(["یو آر ال خیلی کوتاه است"]);
      return;
    }
    if (isValidImageUrl(url)) {
      setImageUrls([...imageUrls, url]);
    } else {
      setClientErrors([
        "یو آر ال نامعتبر. فقط از سایتها و فرمتهای تعیین شده استفاده کنید",
      ]);

      console.error("Invalid image URL:", url);
    }
  };

  const removeImageUrl = (index: number) => {
    const result = window.confirm("از حذف این تصویر مطمئنید؟");
    if (result) {
      setImageUrls(imageUrls.filter((_, i) => i !== index));
    }
  };

  const addImageFile = (e: any) => {
    setClientErrors([]);
    const images = e.target.files;
    const newImages = [...images].filter((img) => {
      // if(img.size < 1024 * 1024 && img.type.startsWith("image/")) return img
      if (!img.type.startsWith("image/")) {
        setClientErrors(["فایل انتخاب شده یک تصویر نیست"]);
        return false;
      }
      return true;
    });

    setImageFiles((prev) => [...newImages, ...prev]);
  };

  const removeImageFile = (index: number) => {
    const result = window.confirm("از حذف این تصویر مطمئنید؟");
    if (result) {
      const updatedImages = [...imageFiles];
      updatedImages.splice(index, 1);
      setImageFiles(updatedImages);
    }
  };
  const handleSubmit = (formData: FormData) => {
    setClientErrors([]);
    imageFiles.forEach((img, index) => {
      formData.append(`images`, img);
    });
    dispatch(formData);
  };

  return (
    <form
      action={handleSubmit}
      className={`mx-auto my-8 p-4 border rounded shadow ${
        state?.error || clientErrors.length > 0 ? "border-red-500" : ""
      }`}
    >
      <div className='mb-4'>
        <label
          htmlFor='name'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          نام محصول<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='name'
          id='name'
          defaultValue={product?.name}
          placeholder='ساعت مچی مردانه'
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='sku'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          شناسه اس کی یو<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='sku'
          id='sku'
          defaultValue={product?.SKU}
          placeholder='SKU12345'
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='manufacturer'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          تولید کننده<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='manufacturer'
          id='manufacturer'
          defaultValue={product?.manufacturer}
          placeholder='شرکت کاسیو'
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='manufacture_location'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          محل تولید
        </label>
        <input
          type='text'
          name='manufacture_location'
          id='manufacture_location'
          defaultValue={product?.manufacture_location}
          placeholder='ژاپن'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='brand'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          برند<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='brand'
          id='brand'
          defaultValue={product?.brand}
          placeholder='کاسیو'
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='model'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          مدل<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='model'
          id='model'
          defaultValue={product?.model}
          placeholder='A158WA'
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='gender'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          جنسیت<span className='text-red-500'>*</span>
        </label>
        <select
          name='gender'
          id='gender'
          defaultValue={product?.gender || "نامشخص"}
          className='w-full p-2 border rounded'
          required
        >
          <option value='مردانه'>مردانه</option>
          <option value='زنانه'>زنانه</option>
          <option value='نامشخص'>نامشخص</option>
        </select>
      </div>

      <div className='mb-4'>
        <label
          htmlFor='style'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          استایل
        </label>
        <input
          type='text'
          name='style'
          id='style'
          defaultValue={product?.style}
          placeholder='کلاسیک دیجیتال'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='functions'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          عملکردها
        </label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <div className='flex gap-1 [&>*]:cursor-pointer'>
            <input
              type='checkbox'
              name='functions'
              id='alarm'
              defaultChecked={product?.functions.includes("آلارم")}
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
              defaultChecked={product.functions.includes("تقویم")}
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
              defaultChecked={product.functions.includes("لامپ ال ای دی")}
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
              defaultChecked={product.functions.includes("کرنومتر")}
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
              defaultChecked={product.functions.includes("سنسور ضربان قلب")}
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
              defaultChecked={product.functions.includes("جی پی اس")}
              value='جی پی اس'
              className='mr-2'
            />
            <label htmlFor='gps'>جی پی اس</label>
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <span className='block font-bold mb-1 text-xl text-blue-900'>
          ویژگی‌ها
        </span>
        <div className='flex flex-wrap gap-4 '>
          <div className=''>
            <label htmlFor='movement' className='block font-semibold mb-1'>
              حرکت
            </label>
            <input
              type='text'
              name='movement'
              id='movement'
              defaultValue={product?.features?.movement}
              placeholder='کوارتز تک باتری'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>
          <div className=''>
            <label htmlFor='bezelMaterial' className='block font-medium'>
              جنس بزل (قاب رویی)
            </label>
            <input
              type='text'
              name='bezelMaterial'
              id='bezelMaterial'
              defaultValue={product?.features?.bezelMaterial}
              placeholder='رزین با پوشش کروم'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>

          <div className=''>
            <label
              htmlFor='bezelColor'
              className='block font-medium text-gray-700'
            >
              رنگ بزل (قاب رویی)
            </label>
            <input
              type='color'
              name='bezelColor'
              id='bezelColor'
              defaultValue={product?.features?.bezelColor}
              className='mt-1 block border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>

          <div className=''>
            <label htmlFor='caseMaterial' className='block font-medium'>
              جنس بدنه
            </label>
            <input
              type='text'
              name='caseMaterial'
              id='caseMaterial'
              defaultValue={product?.features?.caseMaterial}
              placeholder='رزین با پوشش کروم'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>

          <div className=''>
            <label
              htmlFor='caseColor'
              className='block font-medium text-gray-700'
            >
              رنگ بدنه
            </label>
            <input
              type='color'
              name='caseColor'
              id='caseColor'
              defaultValue={product?.features?.caseColor}
              className='mt-1 block border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>

          <div className=''>
            <label htmlFor='bandMaterial' className='block font-medium'>
              جنس بند
            </label>
            <input
              type='text'
              name='bandMaterial'
              id='bandMaterial'
              defaultValue={product?.features?.bandMaterial}
              placeholder='استیل ضدزنگ'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>

          <div className=''>
            <label
              htmlFor='bandColor'
              className='block font-medium text-gray-700'
            >
              رنگ بند
            </label>
            <input
              type='color'
              name='bandColor'
              id='bandColor'
              defaultValue={product?.features?.bandColor}
              className='mt-1 block border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>

          <div className=''>
            <label
              htmlFor='dialColor'
              className='block font-medium text-gray-700'
            >
              رنگ دایال
            </label>
            <input
              type='color'
              name='dialColor'
              id='dialColor'
              defaultValue={product?.features?.dialColor}
              className='mt-1 block border-gray-300 shadow-sm focus:border-indigo-300 rounded-full focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>

          <div className=''>
            <label htmlFor='waterResistance' className='block font-medium'>
              مقاومت در برابر آب
            </label>
            <input
              type='text'
              name='waterResistance'
              id='waterResistance'
              defaultValue={product?.features?.waterResistance}
              placeholder='3 اتمسفر'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>

          <div className=''>
            <label htmlFor='warranty' className='block font-medium'>
              گارانتی
            </label>
            <input
              type='text'
              name='warranty'
              id='warranty'
              defaultValue={product?.features?.warranty}
              placeholder='2 سال'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <span className='block font-bold mb-1 text-xl text-blue-900'>
          خصوصیات
        </span>
        <div className='flex flex-wrap gap-4'>
          <div className=''>
            <label htmlFor='caseShape' className='block font-medium'>
              شکل قاب
            </label>
            <input
              type='text'
              name='caseShape'
              id='caseShape'
              defaultValue={product?.specifications?.caseShape}
              placeholder='چهارگوش، دایره ...'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>

          <div className=''>
            <label htmlFor='caseDiameter' className='block font-medium'>
              قطر قاب (میلیمتر)
            </label>
            <input
              type='number'
              name='caseDiameter'
              id='caseDiameter'
              min={1}
              defaultValue={product?.specifications?.caseDiameter}
              placeholder='33'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>
          <div className=''>
            <label htmlFor='caseThickness' className='block font-medium'>
              ضخامت قاب (میلیمتر)
            </label>
            <input
              type='number'
              name='caseThickness'
              id='caseThickness'
              min={1}
              defaultValue={product?.specifications?.caseThickness}
              placeholder='8'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>

          <div className=''>
            <label htmlFor='lugWidth' className='block font-medium'>
              عرض لاگ (میلیمتر)
            </label>
            <input
              type='number'
              name='lugWidth'
              id='lugWidth'
              min={1}
              defaultValue={product?.specifications?.lugWidth}
              placeholder='18'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>

          <div className=''>
            <label htmlFor='weight' className='block font-medium'>
              وزن (گرم)
            </label>
            <input
              type='number'
              name='weight'
              id='weight'
              min={1}
              defaultValue={product?.specifications?.weight}
              placeholder='48'
              className='max-w-[150px] p-2 border rounded'
            />
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <label
          htmlFor='compilation'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          مجموعه
        </label>
        <input
          type='text'
          name='compilation'
          id='compilation'
          defaultValue={product?.compilation}
          placeholder='دست ساز'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='price'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          قیمت (تومان)<span className='text-red-500'>*</span>
        </label>
        <input
          type='number'
          name='price'
          id='price'
          defaultValue={product?.price}
          min={0}
          placeholder='۳۰۰۰۰۰'
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='buy_price'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          قیمت خرید (تومان)
        </label>
        <input
          type='number'
          name='buy_price'
          id='buy_price'
          defaultValue={product?.buy_price}
          min='0'
          placeholder='۳۰۰۰۰۰'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='sale_price'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          قیمت فروش (تومان)
        </label>
        <input
          type='number'
          name='sale_price'
          id='sale_price'
          min={0}
          defaultValue={product?.sale_price}
          placeholder='۳۰۰۰۰۰'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='short_description'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          توضیحات کوتاه
        </label>
        <textarea
          name='short_description'
          id='short_description'
          defaultValue={product?.short_description}
          rows={2}
          placeholder='یک ساعت دیجیتال کلاسیک با صفحه‌ی نقره‌ای و بند استیل ضدزنگ، دارای آلارم و کرنومتر.'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          توضیحات
        </label>
        <textarea
          name='description'
          id='description'
          defaultValue={product?.description}
          rows={6}
          placeholder='یک ساعت دیجیتال کلاسیک از برند کاسیو، مدل A158WA، با طراحی شیک و مقاوم در برابر آب تا 3 اتمسفر. این ساعت دارای آلارم، تقویم، لامپ ال ای دی و کرنومتر می‌باشد.'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='stock'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          موجودی
        </label>
        <input
          type='number'
          name='stock'
          id='stock'
          defaultValue={product?.stock}
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
            defaultChecked={product.availability === true}
          />
          <span>در دسترس</span>
        </label>
      </div>

      <div className='mb-4'>
        <label
          htmlFor='releaseDate'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          تاریخ تولید (میلادی)
        </label>
        <input
          type='date'
          name='releaseDate'
          id='releaseDate'
          defaultValue={product.releaseDate.toISOString().split("T")[0]}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='tags'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          تگ ها
        </label>
        <input
          type='text'
          name='tags'
          id='tags'
          defaultValue={product?.tags}
          placeholder='مردانه، کلاسیک ...'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='images'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          لینک تصاویر
        </label>

        <label
          htmlFor='ImageInput'
          className='flex justify-between items-center gap-4'
        >
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
            placeholder='لینک تصویر را از casio.com, res.cloudinary.com و ... وارد کنید و دکمه انتر را بزنید'
            className='w-full p-2 border rounded mb-1'
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

        {imageUrls.map((url, index) => {
          return (
            <div key={index} className='flex items-center gap-4 mb-1'>
              <button
                type='button'
                className='text-red-500'
                onClick={() => removeImageUrl(index)}
              >
                <span className='sr-only'>حذف لینک تصویر</span>
                <XMarkIcon className='w-6' />
              </button>
              {isValidImageUrl(url) ? (
                <Image
                  src={url}
                  alt={`product image ${index + 1}`}
                  width={40}
                  height={40}
                />
              ) : (
                <p className='text-xs text-red-500'>
                  تصویر نامعتبر (فقط از وبسایتهای تعیین شده و با پسوندهای معین
                  مجاز است)
                </p>
              )}
              <input
                type='text'
                name='images'
                value={url}
                readOnly
                className='p-1 rounded border'
              />
            </div>
          );
        })}
      </div>

      <div className='mb-4'>
        <label
          htmlFor='file'
          className='block font-bold mb-1 text-xl text-blue-900'
        >
          فایل تصاویر
        </label>
        <input
          type='file'
          accept='image/'
          multiple
          name='file'
          id='file'
          onChange={addImageFile}
          className='w-full p-2 border rounded mb-1'
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
                  className='object-cover rounded-md'
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

      <div className='mb-4'>
        {product.reviews.length < 1 ? (
          <p>نظری برای این محصول ثبت نشده است</p>
        ) : (
          <>
            <label
              htmlFor='reviews'
              className='block font-bold mb-1 text-xl text-blue-900'
            >
              نظرات درباره این محصول
            </label>
            <div className='border rounded p-2'>
              {product.reviews.map((review, index) => (
                <div key={index} className='mb-2'>
                  <span className='font-semibold text-blue-800'>
                    نظر شماره {index + 1}
                  </span>
                  <div className='flex flex-wrap md:flex-nowrap gap-4'>
                    <div className='flex-1'>
                      <label className='block font-bold mb-1'>
                        آیدی کاربر:
                      </label>
                      <input
                        type='text'
                        name={`reviews[${index}].userId`}
                        defaultValue={review.userId}
                        readOnly
                        className='w-full p-2 border rounded mb-2'
                      />
                    </div>
                    <div className='flex-1'>
                      <label className='block font-semibold mb-1'>
                        امتیاز:
                      </label>
                      <input
                        type='number'
                        name={`reviews[${index}].rating`}
                        min={1}
                        max={5}
                        defaultValue={review.rating}
                        className='w-full p-2 border rounded mb-2'
                      />
                    </div>
                    <div className='flex-1'>
                      <label className='block font-semibold mb-1'>
                        تاریخ ایجاد دیگاه:
                      </label>
                      <input
                        name={`reviews[${index}].date`}
                        type='date'
                        defaultValue={
                          new Date(review.date).toISOString().split("T")[0]
                        }
                        className='w-full p-2 border rounded mb-2'
                      />
                    </div>
                  </div>
                  <label className='block font-semibold mb-1'>دیدگاه:</label>
                  <textarea
                    name={`reviews[${index}].comment`}
                    defaultValue={review.comment}
                    maxLength={1000}
                    className='w-full p-2 border rounded mb-2'
                  />
                </div>
              ))}
            </div>
          </>
        )}
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
          ویرایش محصول
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
      {clientErrors.length >= 1 ? (
        <div
          id='amount-error'
          aria-live='polite'
          className='fixed bottom-6 md:bottom-4 left-0 md:left-auto md:right-0 max-w-[200px] m-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded'
        >
          {clientErrors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      ) : null}
    </form>
  );
};

export default EditProductForm;
