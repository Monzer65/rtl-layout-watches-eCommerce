import Link from "next/link";

const Header_mobile_nav = () => {
  return (
    <div className='h-full bg-gray-800' id='mobile-menu'>
      <div className='space-y-1 px-2 pb-3 pt-2'>
        <Link
          href='#'
          className='bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium'
          aria-current='page'
        >
          Dashboard
        </Link>
        <Link
          href='#'
          className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
        >
          Team
        </Link>
        <Link
          href='#'
          className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
        >
          Projects
        </Link>
        <Link
          href='#'
          className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
        >
          Calendar
        </Link>
      </div>
    </div>
  );
};

export default Header_mobile_nav;
