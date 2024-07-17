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
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const minPrice = searchParams?.minPrice || "";
  const maxPrice = searchParams?.maxPrice || "";
  const sort = searchParams?.sort || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 2;
  const data = await getProducts(
    query,
    minPrice,
    maxPrice,
    sort,
    currentPage,
    pageSize
  );
  const products = data.products as Product[];
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
        <FiltersAndSort productsLength={data.totalCount} />
        <div className='lg:col-start-2 lg:col-end-6'>
          <div className='grid grid-cols-[repeat(auto-fit_,_minmax(250px,_1fr))] gap-2 pb-2'>
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
          <div className='mt-5 flex w-full justify-center'>
            <Pagination totalPages={data.totalPages || 1} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
