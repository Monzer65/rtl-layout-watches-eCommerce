import "./store.css";
import StoreSideNav from "@/app/components/admin/StoreSideNav";
export default async function AdminStoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <StoreSideNav />
      </div>
      <div className='flex-grow py-4 px-3 md:overflow-y-auto md:px-2'>
        {children}
      </div>
    </div>
  );
}
