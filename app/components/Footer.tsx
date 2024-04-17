"use client";

import Link from "next/link";

// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import { LatLngExpression } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
// import "leaflet-defaulticon-compatibility";
import Image, { StaticImageData } from "next/image";

const Footer = ({
  social,
}: {
  social: { src: StaticImageData; url: string }[];
}) => {
  // const position = [35.3144, 46.9923] as LatLngExpression;

  return (
    <div className=''>
      <div className='grid md:grid-cols-3 lg:grid-cols-5 gap-4 py-16 px-8 md:items-start w-full '>
        <section className='grid gap-2 text-center md:text-start'>
          <h2 className='font-bold text-xl sm:text-2xl text-green-600'>
            درباره
          </h2>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            درباره ما
          </Link>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            تماس با ما
          </Link>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            درباره حریم خصوصی
          </Link>
        </section>
        <section className='grid gap-2 text-center md:text-start'>
          <h2 className='font-bold text-xl sm:text-2xl text-green-600'>
            خدمات
          </h2>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            گارانتی و خدمات پس از فروش
          </Link>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            ضمانت اصالت
          </Link>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            تضمین قیمت
          </Link>
        </section>
        <section className='grid gap-2 text-center md:text-start'>
          <h2 className='font-bold text-xl sm:text-2xl text-green-600'>
            راهنما
          </h2>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            راهنمای خرید
          </Link>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            روش ارسال سفارش
          </Link>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            روش پرداخت
          </Link>
          <Link
            href={"/"}
            className='w-max text-center text-ellipsis m-auto md:m-0 hover:text-green-600'
          >
            پرسشهای متداول
          </Link>
        </section>
        <section className='md:col-span-3 lg:col-span-2'>
          <p>
            تلفن پشتیبانی: ۰۰۰۰۰ - ۰۰۰ | ۰۰۰-۹۰۰۰۰ | ۷ روز هفته، ۲۴ ساعته
            پاسخگوی شما هستیم
          </p>
          <div className='flex gap-2 my-2'>
            <span>ما را دنبال کنید:</span>
            {social.map((item, index) => {
              return (
                <Link key={index} href={item.url} className='hover:scale-105'>
                  <Image
                    src={item.src}
                    alt={`social image ${index + 1}`}
                    width={30}
                    height={30}
                    className='w-[30px] h-[30px] object-cover'
                  />
                </Link>
              );
            })}
          </div>
          <p>آدرس: ..............</p>
          {/* <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{
              minHeight: "100px",
              maxWidth: "100%",
              margin: "auto",
              zIndex: "0 !important",
              position: "relative",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
              <Popup>
                آدرس دفتر مرکزی <br /> تلفن یا اطلاعات دیگر
              </Popup>
            </Marker>
          </MapContainer> */}
        </section>
      </div>
      <div className='text-xs text-center bg-gray-100 py-8'>
        <p>کليه حقوق اين وب سايت متعلق به ایکس می‌باشد.</p>
        <p>
          استفاده از مطالب فروشگاه اینترنتی ایکس فقط برای مقاصد غیر تجاری و با
          ذکر منبع بلامانع است.
        </p>
        <p>
          Copyright © <span>{new Date().getFullYear()}</span> | watchshop - All
          rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
