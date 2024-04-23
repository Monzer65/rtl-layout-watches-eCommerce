import Image from "next/image";
import Link from "next/link";
import midImage_1 from "@/public/images/middle-grid_1.webp";
import midImage_2 from "@/public/images/middle-grid_2.webp";

const MiddleGrid = () => {
  const gridImages = [
    { src: midImage_1, url: "/" },
    { src: midImage_2, url: "/" },
  ];
  return (
    <div
      className={`w-full grid sm:grid-flow-col sm:auto-cols-[calc(50% - 1rem)] gap-4 rounded-md md:my-16`}
    >
      {gridImages.map((item, index) => {
        return (
          <Link
            href={item.url}
            key={index}
            className={`group w-full h-full overflow-clip`}
          >
            <Image
              src={item.src}
              alt={`Item ${index + 1}`}
              placeholder={"blur"}
              className='object-cover rounded-md group-hover:scale-125 duration-[5s] ease'
            />
          </Link>
        );
      })}
    </div>
  );
};

export default MiddleGrid;
