import {
  BookOpenIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
  return (
    <main className='min-h-screen'>
      <video
        height='500'
        autoPlay
        loop
        muted
        preload='none'
        className='w-full h-[500px] border object-cover'
      >
        <source
          src='https://www.armandolegin.com/images/montagemini.webm'
          type='video/webm'
        />
        Your browser does not support the video tag.
      </video>
      <div className='text-white text-4xl text-center font-bold absolute top-1/3 right-1/2 translate-x-1/2 text-nowrap'>
        <h1>زمان در گذر...</h1>
        {/* <h2>Timeless Style. Crafted with Precision</h2> */}
      </div>
      <div className='flex gap-4 absolute top-1/2 right-1/2 translate-x-1/2 '>
        <Link
          href={"/store"}
          className='flex gap-1 items-center border px-4 py-2 text-2xl bg-white rounded-md hover:bg-gray-100'
        >
          <BuildingStorefrontIcon className='w-8' />
          فروشگاه
        </Link>
        <Link
          href={"/blog"}
          className='flex gap-1 items-center border px-4 py-2 text-2xl bg-white rounded-md hover:bg-gray-100'
        >
          <BookOpenIcon className='w-8' />
          وبلاگ
        </Link>
      </div>
    </main>
  );
}
