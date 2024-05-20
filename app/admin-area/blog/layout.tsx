import "./blog.css";
import BLogSideNav from "@/app/components/admin/BLogSideNav";
export default async function AdminBlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <BLogSideNav />
      </div>
      <div className='flex-grow py-4 px-3 md:overflow-y-auto md:px-2'>
        {children}
      </div>
    </div>
  );
}
