import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import Pagination from "@/app/components/admin/Pagination";
import FiltersAndSort from "@/app/components/store/products/filters/Filters&Sort";
import ProductCard from "@/app/components/store/products/ProductCard";
import { getProducts } from "@/app/lib/data_products";
import { Product } from "@/app/lib/definitions";
import { HomeIcon } from "@heroicons/react/24/outline";

const ProductsPage = async ({
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
  const pageSize = 20;
  // const data = await getProducts(
  //   query,
  //   wonderDeals,
  //   minPrice,
  //   maxPrice,
  //   brands,
  //   genders,
  //   sort,
  //   currentPage,
  //   pageSize
  // );
  // const products = data.products as Product[];

  return (
    <main className='px-8 pt-4 md:pt-12 lg:pt-4'>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "صفحه اصلی",
            href: "/store",
            icon: <HomeIcon />,
          },
          {
            label: "محصولات",
            href: `/store/products`,
            active: true,
          },
        ]}
      />
      <div className='grid gap-2 lg:grid-cols-5 relative'>
        {/* <FiltersAndSort productsLength={data.totalCount} /> */}
        {/* <div className='lg:col-start-2 lg:col-end-6'>
          {products.length ? (
            <div className='grid grid-cols-[repeat(auto-fit_,_minmax(250px,_1fr))] gap-2 pb-2'>
              {products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          ) : (
            <div className='bg-gray-100 rounded-lg p-4 text-center'>
              <h2 className='text-lg font-bold'>محصولی یافت نشد</h2>
              <p className='text-sm'>
                متاسفانه هیچ محصولی منطبق با فیلتر و جستجوی شما یافت نشد
              </p>
            </div>
          )}
          {products.length ? (
            <div className='mt-5 flex w-full justify-center'>
              <Pagination totalPages={data.totalPages || 1} />
            </div>
          ) : null}
        </div> */}
      </div>
    </main>
  );
};

export default ProductsPage;
