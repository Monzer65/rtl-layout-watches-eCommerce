import Link from "next/link";
import Image from "next/image";
import StoreNavLinks from "./StoreNav-links";
const StoreSideNav = () => {
  return (
    <div className='flex h-full flex-col px-3 py-4 md:px-2'>
      <Link className='h-20 p-4 bg-gray-700 shadow-sm mb-2' href='/admin-area'>
        <Image
          src='/images/logo-1.svg'
          alt='logo'
          width={100}
          height={100}
          className='filter invert sepia-0 saturate-[10] hue-rotate-[420deg]'
        />
      </Link>
      <div className='flex grow flex-row justify-between gap-2 md:gap-0 md:flex-col md:space-x-0'>
        <StoreNavLinks />
      </div>
    </div>
  );
};

export default StoreSideNav;
