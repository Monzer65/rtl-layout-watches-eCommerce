import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import { CreateCustomer } from "@/app/components/admin/customers/Buttons";
import CustomersTable from "@/app/components/admin/customers/CustomersTable";
import Pagination from "@/app/components/admin/Pagination";
import { CreateProductButton } from "@/app/components/admin/products/Buttons";
import ProductsTable from "@/app/components/admin/products/ProductsTable";
import Search from "@/app/components/admin/Search";
import { getProducts } from "@/app/lib/data_products";
import { Product } from "@/app/lib/definitions";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";

const productsPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    wonderDeals?: string;
    minPrice?: string;
    maxPrice?: string;
    brands?: string;
    genders?: string;
    sort?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const wonderDeals = searchParams?.wonderDeals || "";
  const minPrice = searchParams?.minPrice || "";
  const maxPrice = searchParams?.maxPrice || "";
  const brands = searchParams?.brands || "";
  const genders = searchParams?.genders || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 2;
  const data = await getProducts(
    query,
    wonderDeals,
    minPrice,
    maxPrice,
    brands,
    genders,
    sort,
    currentPage,
    pageSize
  );
  const products = data.products as Product[];

  return (
    <div>
      <div className='max-w-[800px]'>
        <Search placeholder='جستجوی نام محصول یا برند ...' />
      </div>
      <div className='flex gap-4 items-center mt-10 mb-4'>
        <h1 className='text-base sm:text-lg md:text-2xl font-bold'>محصولات</h1>
        <CreateProductButton />
      </div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "داشبورد فروشگاه",
            href: "/admin-area/store",
            icon: <HomeIcon />,
          },
          {
            label: "مدیریت محصولات",
            href: `/admin-area/store/products`,
            active: true,
          },
        ]}
      />
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
