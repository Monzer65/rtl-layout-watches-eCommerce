import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center'>
        <div className='text-red-500 mb-4'>
          <svg
            className='w-16 h-16 mx-auto'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M18.364 5.636a9 9 0 11-12.728 0M12 9v4m0 4h.01'
            ></path>
          </svg>
        </div>
        <h2 className='text-2xl font-bold mb-2'>ورود غیرمجاز</h2>
        <p className='text-gray-600 mb-4'>
          شما اجازه دسترسی به این صفحه را ندارید
        </p>
        <Link
          href='/login'
          className='inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'
        >
          ورود به حساب کاربری
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
