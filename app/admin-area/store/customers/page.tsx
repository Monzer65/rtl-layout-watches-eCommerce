import { CreateCustomer } from "@/app/components/admin/customers/Buttons";
import CustomersTable from "@/app/components/admin/customers/CustomersTable";
import Pagination from "@/app/components/admin/Pagination";
import Search from "@/app/components/admin/Search";
import { fetchCustomers } from "@/app/lib/data";
import Link from "next/link";
import { Suspense } from "react";

const customers = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 2;
  const data = await fetchCustomers(query, currentPage, pageSize);

  return (
    <div>
      <div className='max-w-[800px]'>
        <Search placeholder='جستجو...' />
      </div>
      <h1 className='text-2xl font-bold mt-10'>مشتریان</h1>
      <div>
        <CreateCustomer />
        <Suspense
          key={query + currentPage}
          fallback={<p>loading skeleton...</p>}
        >
          {data.customers &&
            data.customers.map((customer, index) => (
              <Link
                key={index}
                href={`/admin-area/store/customers/${customer._id}/edit`}
              >
                {customer.email}
              </Link>
            ))}
          {/* <CustomersTable query={query} currentPage={currentPage} /> */}
        </Suspense>
        <div className='mt-5 flex w-full justify-center'>
          <Pagination totalPages={data.totalPages || 1} />
        </div>
      </div>
    </div>
  );
};

export default customers;
