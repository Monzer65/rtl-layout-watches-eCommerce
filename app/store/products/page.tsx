import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import Pagination from "@/app/components/admin/Pagination";
import FiltersAndSort from "@/app/components/store/products/filters/Filters&Sort";
import ProductCard from "@/app/components/store/products/ProductCard";
import { getProducts } from "@/app/lib/data_products";
import { Product } from "@/app/lib/definitions";
import { HomeIcon } from "@heroicons/react/24/outline";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 10;
  const data = await getProducts(query, currentPage, pageSize);
  const products = data.products as Product[];
  return (
    <main className='px-8 pt-4 md:pt-12 lg:pt-4'>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "صفحه اصلی",
            href: "/store",
            icon: <HomeIcon />,
          },
          {
            label: "محصولات",
            href: `/store/products`,
            active: true,
          },
        ]}
      />
      <div className='grid gap-2 lg:grid-cols-5 relative'>
        <FiltersAndSort productsLength={data.totalCount} />
        <div className='lg:col-start-2 lg:col-end-6'>
          <div className='grid grid-cols-[repeat(auto-fit_,_minmax(250px,_1fr))] gap-2 pb-2'>
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
          <div className='mt-5 flex w-full justify-center'>
            <Pagination totalPages={data.totalPages || 1} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;

// "use client";
// import {
//   AdjustmentsHorizontalIcon,
//   BarsArrowDownIcon,
//   ChevronLeftIcon,
//   ShoppingBagIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { useState } from "react";
// import PriceRange from "../../components/store/products/filters/PriceRangeOptions";
// import Options from "../../components/store/products/filters/CheckboxOptions";
// import Image from "next/image";
// import Link from "next/link";
// import { products } from "@/app/data";
// import AddToCart from "@/app/components/store/products/AddToCart";

// const brands = [
//   "Rolex",
//   "Omega",
//   "Seiko",
//   "Casio",
//   "Timex",
//   "Citizen",
//   "Grand Seiko",
//   "Patek Philippe",
//   "Cartier",
//   "Tag Heuer",
// ];
// const models = [
//   "Submariner",
//   "Speedmaster",
//   "Prospex",
//   "G-Shock",
//   "Weekender",
//   "Eco-Drive",
//   "Spring Drive",
//   "Nautilus",
//   "Santos",
//   "Carrera",
// ];
// const caseSizes = [
//   "40mm",
//   "42mm",
//   "43mm",
//   "46mm",
//   "38mm",
//   "Brass",
//   "High-Intensity Titanium",
//   "White Gold",
// ];
// const caseShape = ["Round", "Divers", "Grand Seiko", "Square"];
// const caseMaterials = ["Stainless Steel", "Resin", "Crocodile", "Alligator"];
// const caseColors = ["Silver", "Black", "Rose Gold", "Steel"];
// const bandMaterials = [
//   "Oystersteel",
//   "Leather",
//   "Stainless Steel",
//   "Crocodile",
//   "Alligator",
// ];
// const bandColors = ["Black", "Brown", "Silver"];
// const dialColors = ["Black", "White", "Blue"];
// const movements = ["Automatic", "Quartz", "Spring Drive"];
// const waterResistance = [
//   "1 ATM",
//   "2 ATM",
//   "3 ATM",
//   "4 ATM",
//   "5 ATM",
//   "6 ATM",
//   "7 ATM",
//   "8 ATM",
//   "9 ATM",
//   "10 ATM",
// ];
// const others = ["Calendar", "Chronometer", "Solar power"];

// const Products = () => {
//   const [openOptions, setOpenOptions] = useState<{ [key: number]: boolean }>(
//     {}
//   );
//   const [checkedOptions, setCheckedOptions] = useState<{
//     [key: string]: boolean;
//   }>({});

//   const [openFilters, setOpenFilters] = useState(false);
//   const [openSort, setOpenSort] = useState(false);

//   const toggleOptions = (index: number) => {
//     setOpenOptions((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }));
//   };

//   const toggleCheckOption = (option: string) => {
//     setCheckedOptions((prevState) => ({
//       ...prevState,
//       [option]: !prevState[option],
//     }));
//   };

//   const toggleSort = () => {
//     setOpenSort(!openSort);
//   };

//   const toggleFilters = () => {
//     setOpenFilters(!openFilters);
//   };

//   // useEffect(() => {
//   //   const handleResize = () => {
//   //     setOpenFilters(false);
//   //     setOpenSort(false);
//   //   };
//   //   window.addEventListener("resize", handleResize);
//   //   return () => window.removeEventListener("resize", handleResize);
//   // }, []);

//   const sorts = [
//     "ارزانترین",
//     "گرانترین",
//     "بیشترین تخفیف",
//     "جدیدترین",
//     "پرفروشترین",
//   ];

//   return (
// <main className='px-8 grid lg:grid-cols-5 relative'>
//   <div
//     className={`${
//       openFilters ? "block" : "hidden"
//     } lg:hidden fixed inset-0 bg-gray-600 opacity-70 z-30`}
//     onClick={() => setOpenFilters(false)}
//   ></div>
//   <div
//     className={`filters fixed inset-x-0 lg:block transition-all duration-500 ${
//       openFilters ? "max-h-[350px] bottom-0" : "max-h-0 -bottom-44"
//     } bg-white lg:bg-none lg:max-w-[350px] min-h-[50px] lg:max-h-[500px] lg:sticky lg:top-36 lg:right-0 z-40 lg:z-auto overflow-y-auto px-2 pt-2 pb-8 [&>*:not(:last-child)]:border-b [&>*]:p-2 lg:border border-gray-600 lg:rounded-xl`}
//   >
//     <div className='flex justify-between'>
//       <h3 className='text-xl font-semibold'>فیلترها</h3>
//       <button className='text-sm'>حذف همه فیلترها</button>
//       <button onClick={() => setOpenFilters(false)} className='lg:hidden'>
//         <XMarkIcon className='w-8' />
//       </button>
//     </div>
//     {filters.map((filter, i) => {
//       return (
//         <div key={i}>
//           <button
//             onClick={() => toggleOptions(i)}
//             className='w-full flex items-center justify-between'
//           >
//             <p>{filter.title}</p>
//             <ChevronLeftIcon
//               className={`w-4 duration-300  ${
//                 openOptions[i] ? "rotate-90" : ""
//               }`}
//             />
//           </button>
//           {openOptions[i] && (
//             <div className='text-sm py-4'>{filter.options}</div>
//           )}
//         </div>
//       );
//     })}
//   </div>
//   <div className='min-h-screen w-full lg:col-span-4'>
//     <div className='flex justify-between px-4 mb-4'>
//       <div className='flex gap-2 items-center'>
//         <button
//           onClick={toggleFilters}
//           className='flex gap-1 ml-4 lg:hidden'
//         >
//           <AdjustmentsHorizontalIcon className='w-6' />
//           فیلتر
//         </button>
//         <button
//           onClick={toggleSort}
//           className='flex gap-1 md:pointer-events-none'
//         >
//           <BarsArrowDownIcon className='w-6' />
//           مرتب سازی<span className='hidden md:inline-block'>:</span>
//         </button>
//         <div
//           className={`${
//             openSort ? "block" : "hidden"
//           } md:hidden fixed inset-0 bg-gray-600 opacity-70 z-30`}
//           onClick={() => setOpenSort(false)}
//         ></div>
//         <div
//           className={`flex flex-col md:hidden fixed inset-x-0 bg-white p-4 z-40 transition-all duration-500 ${
//             openSort ? "max-h-[350px] bottom-0" : "max-h-0 -bottom-44"
//           }`}
//         >
//           <div className='flex justify-between'>
//             <p>مرتب سازی بر اساس:</p>
//             <button onClick={() => setOpenSort(false)}>
//               <XMarkIcon className='w-5' />
//             </button>
//           </div>
//           {sorts.map((item, index) => (
//             <button
//               key={index}
//               className='text-sm md:text-gray-400 text-start border-b py-4'
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//         {sorts.map((item, index) => (
//           <button
//             key={index}
//             className='hidden md:block text-sm text-gray-400 hover:border-b'
//           >
//             {item}
//           </button>
//         ))}
//       </div>
//       <p className='text-sm text-gray-400'>124 کالا</p>
//     </div>
//     <div className='grid grid-cols-[repeat(auto-fit_,_minmax(250px_,_1fr))] gap-2 lg:px-4 pb-4'>
//       {products.map((item, index) => (
//         <div
//           key={index}
//           className='min-h-[200px] p-2 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-transform duration-300 ease-in-out'
//         >
//           <Link href={`/store/products/${item._id}`}>
//             <Image
//               src={item.imgSrc}
//               alt={`product ${item.title}`}
//               width={200}
//               height={200}
//               className='w-full h-[200px] object-contain'
//             />
//             <h3 className='text-lg font-bold my-2 mx-4'>{item.title}</h3>
//           </Link>
//           <p className='text-base text-gray-800 my-2 mx-4'>{item.price}</p>
//           <AddToCart
//             _id={item._id}
//             image={item.image}
//             title={item.title}
//             shortDesc={item.shortDesc}
//             price={item.price}
//             quantity={1}
//             btnText={"افزودن به سبد"}
//           />
//         </div>
//       ))}
//     </div>
//   </div>
// </main>
//   );
// };

// export default Products;
