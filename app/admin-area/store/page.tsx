import { getProducts } from "@/app/lib/data_products";
import { Product } from "@/app/lib/definitions";

const AdminStorePage = async () => {
  const query = "";
  const currentPage = 1;
  const pageSize = 10;
  const data = await getProducts(query, currentPage, pageSize);
  const products = data.products as Product[];

  return (
    <div>
      StorePage
      {products && <p>{products[0].name}</p>}
      {products && <p>{products[0].brand}</p>}
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense> 
        or:
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div> */}
      {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
    </div>
  );
};

export default AdminStorePage;
