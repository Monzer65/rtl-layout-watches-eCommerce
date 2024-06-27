import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import CreateInvoiceForm from "@/app/components/admin/invoices/CreateInvoiceForm";
import { fetchCustomers } from "@/app/lib/data_customers";
import { getProducts } from "@/app/lib/data_products";
import { Customer, Product } from "@/app/lib/definitions";
import { HomeIcon } from "@heroicons/react/24/outline";

const InvoiceCreatePage = async () => {
  const query = "";
  const currentPage = 1;
  const pageSize = 1000;
  const customersData = await fetchCustomers(query, currentPage, pageSize);
  const productsData = await getProducts(query, currentPage, pageSize);
  const customers = customersData.customers as Customer[];
  const products = productsData.products as Product[];

  return (
    <div className='max-w-[800px] md:mt-[5rem]'>
      <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
        ایجاد فاکتور جدید
      </h1>
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
          },
          {
            label: "ایجاد فاکتور",
            href: `/admin-area/store/invoices/create`,
            active: true,
          },
        ]}
      />
      <CreateInvoiceForm customers={customers} products={products} />
    </div>
  );
};

export default InvoiceCreatePage;
