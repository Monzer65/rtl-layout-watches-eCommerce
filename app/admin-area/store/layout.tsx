import "./store.css";
import StoreSideNav from "@/app/components/admin/StoreSideNav";
export default async function AdminStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex flex-col md:flex-row'>
      <div className='sticky top-0 md:h-screen w-full flex-none md:w-64'>
        <StoreSideNav />
      </div>
      <div className='flex-grow py-4 px-3 md:px-2'>{children}</div>
    </div>
  );
}
