import Image from "next/image";
import logo from "@/public/images/logo-1.svg";
import Link from "next/link";
const AdminAreaPage = async () => {
  return (
    <main className='flex min-h-screen flex-col p-6'>
      <div className='flex h-20 shrink-0 items-center md:items-end justify-center md:justify-start rounded-lg bg-slate-700 p-4 md:h-52'>
        <Image src={logo} alt='logo image' />
      </div>

      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20'>
          <p
            className={` antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            <strong>به داشبورد ادمین خوش آمدید</strong>
          </p>
          <div className='flex gap-4'>
            <Link
              href='/admin-area/store'
              className='flex items-center gap-5 self-start rounded-lg bg-slate-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-500 md:text-base'
            >
              <span>ورود به بخش مدیریت فروشگاه</span>
            </Link>
            <Link
              href='/admin-area/blog'
              className='flex items-center gap-5 self-start rounded-lg bg-slate-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-500 md:text-base'
            >
              <span>ورود به بخش مدیریت بلاگ</span>
            </Link>
          </div>
        </div>
        <div className='flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12'>
          <Image
            src='/images/hero-admin.jpg'
            width={1000}
            height={760}
            className=''
            alt='picture of watch and wrting and designing stuf'
          />
        </div>
      </div>
    </main>
  );
};

export default AdminAreaPage;
