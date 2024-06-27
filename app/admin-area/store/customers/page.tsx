import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import { CreateCustomer } from "@/app/components/admin/customers/Buttons";
import CustomersTable from "@/app/components/admin/customers/CustomersTable";
import Pagination from "@/app/components/admin/Pagination";
import Search from "@/app/components/admin/Search";
import { fetchCustomers } from "@/app/lib/data_customers";
import { Customer } from "@/app/lib/definitions";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";

const CustomersPage = async ({
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
  const data = await fetchCustomers(query, currentPage, pageSize);
  const customers = data.customers as Customer[];

  return (
    <div>
      <div className='max-w-[800px]'>
        <Search placeholder='جستجوی نام کاربری یا ایمیل ...' />
      </div>
      <div className='flex gap-4 items-center mt-10 mb-4'>
        <h1 className='text-base sm:text-lg md:text-2xl font-bold'>مشتریان</h1>
        <CreateCustomer />
      </div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "داشبورد فروشگاه",
            href: "/admin-area/store",
            icon: <HomeIcon />,
          },
          {
            label: "مدیریت مشتریان",
            href: `/admin-area/store/customers`,
            active: true,
          },
        ]}
      />
      <div>
        <Suspense key={query + currentPage} fallback={<p>درحال بارگزاری...</p>}>
          <div className='overflow-auto'>
            <CustomersTable customers={customers} />
          </div>
        </Suspense>
        <div className='mt-5 flex w-full justify-center'>
          <Pagination totalPages={data.totalPages || 1} />
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
