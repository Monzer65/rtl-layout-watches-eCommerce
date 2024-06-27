import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import { CreateInvoiceButton } from "@/app/components/admin/invoices/Buttons";
import InvoicesTable from "@/app/components/admin/invoices/InvoicesTable";
import Pagination from "@/app/components/admin/Pagination";
import Search from "@/app/components/admin/Search";
import { fetchInvoices } from "@/app/lib/data_invoices";
import { Invoice } from "@/app/lib/definitions";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";

const InvoicesPage = async ({
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
  const data = await fetchInvoices(query, currentPage, pageSize);
  const invoices = data.invoices as Invoice[];

  if (!data) return <div>No Data fetched</div>;
  // console.log("data for invoces page", invoices);
  return (
    <div>
      <div className='max-w-[800px]'>
        <Search placeholder='جستجوی نام کاربری یا فاکتور ...' />
      </div>
      <div className='flex gap-4 items-center mt-10 mb-4'>
        <h1 className='text-base sm:text-lg md:text-2xl font-bold'>فاکتورها</h1>
        <CreateInvoiceButton />
      </div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "داشبورد فروشگاه",
            href: "/admin-area/store",
            icon: <HomeIcon />,
          },
          {
            label: "مدیریت فاکتورها",
            href: `/admin-area/store/invoices`,
            active: true,
          },
        ]}
      />
      <div>
        <Suspense key={query + currentPage} fallback={<p>درحال بارگزاری...</p>}>
          <div className='overflow-auto'>
            <InvoicesTable invoices={invoices} />
          </div>
        </Suspense>
        <div className='mt-5 flex w-full justify-center'>
          <Pagination totalPages={data.totalPages || 1} />
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
