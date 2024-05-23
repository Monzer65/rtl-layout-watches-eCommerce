import { CreateCustomer } from "@/app/components/admin/Buttons";
import CustomersTable from "@/app/components/admin/CustomersTable";
import Pagination from "@/app/components/admin/Pagination";
import Search from "@/app/components/admin/Search";
import { Suspense } from "react";

const customers = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchInvoicesPages(query);

  return (
    <div>
      <Search placeholder='جستجو...' />
      <h1 className='text-2xl font-bold mt-10'>مشتریان</h1>
      <div>
        <CreateCustomer />
        <Suspense
          key={query + currentPage}
          fallback={<p>loading skeleton...</p>}
        >
          {/* <CustomersTable query={query} currentPage={currentPage} /> */}
        </Suspense>
        <div className='mt-5 flex w-full justify-center'>
          <Pagination totalPages={18} />
        </div>
      </div>
    </div>
  );
};

export default customers;
