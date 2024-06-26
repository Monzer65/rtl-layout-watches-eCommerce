import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const MainCategories = ({
  mainCategories,
}: {
  mainCategories: { title: string; src: StaticImageData; url: string }[];
}) => {
  return (
    <div className='flex gap-2 items-center justify-center my-8 '>
      {mainCategories.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.url}
            className='p-2 flex items-center flex-col rounded-full max-w-[70px] min-[430px]:max-w-[100px] sm:max-w-[150px] lg:max-w-[200px] hover:scale-105 transform duration-500 overflow-clip'
          >
            <Image
              src={item.src}
              alt={`womens category`}
              height={200}
              className='max-h-[200px] object-cover rounded-full'
            />
            <h2 className='font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base mt-1 sm:mt-2'>
              {item.title}
            </h2>
          </Link>
        );
      })}
    </div>
  );
};

export default MainCategories;
