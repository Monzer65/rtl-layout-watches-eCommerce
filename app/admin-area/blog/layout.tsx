import "./blog.css";
import BLogSideNav from "@/app/components/admin/BLogSideNav";
export default async function AdminBlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative flex flex-col md:flex-row'>
      <div className='sticky top-0 md:h-screen w-full flex-none md:w-64'>
        <BLogSideNav />
      </div>
      <div className='flex-grow py-4 px-3 md:px-2'>{children}</div>
    </div>
  );
}
