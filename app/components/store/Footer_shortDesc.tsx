"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const ShortDesc = ({
  namadImages,
}: {
  namadImages: { src: StaticImageData; url: string }[];
}) => {
  const dotsRef = useRef<HTMLSpanElement>(null);
  const moreTextRef = useRef<HTMLSpanElement>(null);
  const [showMore, setShowMore] = useState(false);

  const toggleTextVisibility = () => {
    setShowMore(!showMore);
  };

  return (
    <div className='flex flex-col md:flex-row gap-8 items-center md:items-start border-y py-4'>
      <div className='flex flex-col flex-1 items-center'>
        <div>
          <h2 className='font-bold text-xl sm:text-2xl'>
            فروشگاه اینترنتی ایکس
          </h2>
          <p
            className={`leading-7 text-justify ${!showMore ? "truncated" : ""}`}
          >
            فروشگاه ایکس مرجع تخصصی نقد و بررسی و خرید اینترنتی ساعت مچی ، زیور
            و اکسسوری اصل با گارانتی معتبر شرکتی است که با ارائه نامدارترین
            برندهای جهان در زمینه ساعت مچی ، زیور و اکسسوری مانند اوماکس ، سیکو
            ( سیکو 5) ، کاسیو ( جی شاک ، ادیفایس ) ، سیتیزن ، اورینت ، رومانسون
            ، الیکسا ، کاندینو ، دنیل ولینگتون ، فستینا ، آیس واچ ، اسپریت ، پیر
            کاردین ، پوما ، اینگرسول و غیره تنوع بی‌نظیر و انتخاب های فراوانی را
            در اختیار خریداران عزیز قرار می‌دهد.{" "}
            <span ref={dotsRef}>{!showMore ? "..." : ""}</span>
            <span
              ref={moreTextRef}
              className={`overflow-hidden ${showMore ? "h-full" : "h-0 grid"}`}
            >
              {" "}
              فرایند انتخاب و خرید ساعت به عنوان کالایی به شدت تخصصی، همواره
              پیچیدگی‌های فراوانی برای مصرف‌کننده داشته و در عین حال به دلیل
              هزینه‌های نسبتاً بالا و وجود نمونه های غیراصل، حساسیت بسیاری برای
              مشتریان آنها دارد. با پررنگ‌تر شدن نقش و کاربرد این طبقه کالا در
              زندگی امروزی و خلق شدن محصولات جدید با کاربردهایی نو و در عین حال
              ضروری برای همگان، انتخاب و خرید این دسته از کالاها هر روز با
              اهمیت‌تر می‌شوند. فروشگاه ایکس با ارائه ضمانت اصالت و گارانتی کالا
              ، 7 روز ضمانت بازگشت کالا و تضمین بهترین قیمت و ارائه امکاناتی
              نظیر نقد و بررسی، درج کامل جزیی ترین مشخصات کالاها و همچنین راه
              اندازی مجله تخصصی ساعت (وومَگ) در تلاش است که این حساسیت را تا حد
              بسیار زیادی مرتفع نموده و تجربه خرید اینترنتی ساعت مچی ، زیور و
              اکسسوری را در میان کاربران ایرانی بهبود چشمگیری ببخشد. فروشگاه
              ایکس می کوشد تا با همکاری نزدیک با واردکنندگان اصلی برندهای معتبر
              ساعت مچی در ایران و بکارگیری نهایت توان و ابزارهای در دسترس در
              تعاملات خود با آن ها و ایجاد فرایند قیمت‌ گذاری کاملاً شرکتی و
              سراسری (که توسط شرکت وارد کننده اعلام می شود) و ارائه خدمات پس از
              فروش با کیفیت بسیار بالا، امکان ارائه کالای اصل با پایین‌ترین
              قیمت‌ و بهترین خدمات را فراهم آورد. برای کسب اطلاعات بیشتر صفحه
              درباره واچ آنلاین را مطالعه نمایید یا از طریق لینک های زیر به
              محصولات مورد نظر خود دسترسی بیابید.
            </span>
          </p>
        </div>
        <button
          onClick={toggleTextVisibility}
          className='text-sky-600 hover:text-sky-700 bg-gray-50 hover:bg-white border px-2 py-1 rounded-md'
        >
          {showMore ? "کمتر" : "بیشتر"}
        </button>
      </div>
      <div className='flex md:flex-col gap-2'>
        {namadImages.map((item, index) => {
          return (
            <Link key={index} href={item.url} className='border p-2 rounded-sm'>
              <Image
                src={item.src}
                alt={`namad image ${index + 1}`}
                width={100}
                height={100}
                className='w-[60px] md:w-[100px] h-[60px] md:h-[100px] object-contain'
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShortDesc;
