import { ArrowUpLeftIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export type NewsItem = {
  id: number;
  author: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: StaticImageData;
  dateCreated: string;
};

const LastNews = ({ news }: { news: NewsItem[] }) => {
  return (
    <div className='max-w-[800px] mx-auto'>
      <div className='flex justify-between my-8'>
        <h1 className='font-bold text-2xl'>آخرین اخبار</h1>
        <Link href={"/blog/news"} className='grid grid-cols-2 gap-1'>
          مشاهده همه
          <ArrowUpLeftIcon className='w-4' />
        </Link>
      </div>{" "}
      <div className='grid sm:grid-cols-2 md:grid-cols-1 gap-8 sm:gap-4'>
        {news.map((item) => (
          <div key={item.id} className='grid md:grid-cols-3'>
            <div className='col-span-2 grid md:flex md:gap-4'>
              <Link href={`/blog/news/${item.id}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={250}
                  height={250}
                  className='w-full sm:w-auto sm:max-w-[250px]'
                />
              </Link>
              <div className='flex flex-col justify-between'>
                <div>
                  <Link href={`/blog/news/${item.id}`}>
                    <h2 className='font-bold text-2xl text-gray-800 text-pretty'>
                      {item.title}
                    </h2>
                  </Link>
                  <p className='font-semibold text-lg text-gray-700'>
                    {item.dateCreated}
                  </p>
                </div>
                <div>
                  <p className='text-gray-600'>زمان مطالعه: 4 دقیقه</p>
                  <p className='text-gray-600'>نویسنده: {item.author}</p>
                </div>
              </div>
            </div>
            <div className='md:max-w-[200px] text-justify'>
              <p>{item.shortDesc}</p>
            </div>

            {/* <p>{item.longDesc}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastNews;
