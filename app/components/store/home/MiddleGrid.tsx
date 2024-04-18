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
            className={`item snap-center scroll-mx-60`}
          >
            <Image
              src={item.src}
              alt={`Item ${index + 1}`}
              height={350}
              placeholder={"blur"}
              className='w-full max-h-[200px] sm:max-h-[300px] object-cover rounded-md'
            />
          </Link>
        );
      })}
    </div>
  );
};

export default MiddleGrid;
