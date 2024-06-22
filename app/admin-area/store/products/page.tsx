import { CreateCustomer } from "@/app/components/admin/customers/Buttons";
import CustomersTable from "@/app/components/admin/customers/CustomersTable";
import Pagination from "@/app/components/admin/Pagination";
import { CreateProductButton } from "@/app/components/admin/products/Buttons";
import ProductsTable from "@/app/components/admin/products/ProductsTable";
import Search from "@/app/components/admin/Search";
import { getProducts } from "@/app/lib/data";
import { Product } from "@/app/lib/definitions";
import { Suspense } from "react";

const productsPage = async ({
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
  const data = await getProducts(query, currentPage, pageSize);
  const products = data.products as Product[];

  console.log(products);
  return (
    <div>
      <div className='max-w-[800px]'>
        <Search placeholder='جستجوی نام محصول یا برند ...' />
      </div>
      <div className='flex gap-4 items-center mt-10 mb-4'>
        <h1 className='text-base sm:text-lg md:text-2xl font-bold'>محصولات</h1>
        <CreateProductButton />
      </div>
      <div>
        <Suspense key={query + currentPage} fallback={<p>درحال بارگزاری...</p>}>
          <div className='overflow-x-auto'>
            <ProductsTable products={products} />
          </div>
        </Suspense>
        <div className='mt-5 flex w-full justify-center'>
          <Pagination totalPages={data.totalPages || 1} />
        </div>
      </div>
    </div>
  );
};

export default productsPage;
