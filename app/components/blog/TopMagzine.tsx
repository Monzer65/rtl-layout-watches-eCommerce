import { ArrowUpLeftIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Magazine = {
  id: number;
  author: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: StaticImageData;
  dateCreated: string;
};

const TopMagzine = ({ magazines }: { magazines: Magazine[] }) => {
  return (
    <div className='max-w-[800px] m-auto'>
      <div className='flex justify-between my-8'>
        <h1 className='font-bold text-2xl'>برترین مطالب</h1>
        <Link href={"/blog/magazine"} className='grid grid-cols-2 gap-1'>
          مشاهده همه
          <ArrowUpLeftIcon className='w-4' />
        </Link>
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-1 gap-8 sm:gap-4'>
        {magazines.map((magazine) => (
          <div key={magazine.id} className='grid md:grid-cols-3'>
            <div className='col-span-2 grid md:flex md:gap-4'>
              <Link href={`/blog/magazine/${magazine.id}`}>
                <Image
                  src={magazine.image}
                  alt={magazine.title}
                  width={250}
                  height={250}
                  className='w-full sm:w-auto sm:max-w-[250px]'
                />
              </Link>
              <div className='flex flex-col justify-between'>
                <div>
                  <Link href={`/blog/magazine/${magazine.id}`}>
                    <h2 className='font-bold text-2xl text-gray-800 text-pretty'>
                      {magazine.title}
                    </h2>
                  </Link>
                  <p className='font-semibold text-lg text-gray-700'>
                    {magazine.dateCreated}
                  </p>
                </div>
                <div>
                  <p className='text-gray-600'>زمان مطالعه: 4 دقیقه</p>
                  <p className='text-gray-600'>نویسنده: {magazine.author}</p>
                </div>
              </div>
            </div>
            <div className='md:max-w-[200px] text-justify'>
              <p>{magazine.shortDesc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMagzine;
