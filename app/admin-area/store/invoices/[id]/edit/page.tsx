import EditInvoiceForm from "@/app/components/admin/invoices/EditInvoiceForm";
import { fetchCustomers } from "@/app/lib/data_customers";
import { fetchInvoiceById } from "@/app/lib/data_invoices";
import { getProducts } from "@/app/lib/data_products";
import {
  Customer,
  Invoice,
  ItemInInvoice,
  Product,
} from "@/app/lib/definitions";
import { formatIranianDateTime } from "@/app/lib/helpers/formatDateAndTime";

const InvoiceEditPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const invoiceData = await fetchInvoiceById(id);
  const query = "";
  const currentPage = 1;
  const pageSize = 1000;
  const customersData = await fetchCustomers(query, currentPage, pageSize);
  const productsData = await getProducts(query, currentPage, pageSize);
  const customers = customersData.customers as Customer[];
  const products = productsData.products as Product[];
  const invoice = invoiceData.invoice as Invoice;

  // converting object ids to string
  // if (invoiceData.invoice) {
  //   invoice = {
  //     ...invoiceData.invoice,
  //     _id: invoiceData.invoice._id,
  //     customer: {
  //       ...invoiceData.invoice.customer,
  //       customerId: invoiceData.invoice.customer.customerId.toString(),
  //     },
  //     items: invoiceData.invoice.items.map((item: ItemInInvoice) => ({
  //       ...item,
  //       productId: item.productId.toString(),
  //     })),
  //   };
  // }

  return (
    <div className='max-w-[800px] md:mt-[5rem]'>
      <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
        ویرایش فاکتور
      </h1>
      <p>
        تاریخ ایجاد:{" "}
        {invoice?.invoiceDate
          ? formatIranianDateTime(invoice.invoiceDate)
          : "N/A"}
      </p>

      <p>
        آخرین ویرایش:{" "}
        {invoice?.updatedAt ? formatIranianDateTime(invoice.updatedAt) : "N/A"}
      </p>

      <EditInvoiceForm
        invoice={invoice}
        customers={customers}
        products={products}
      />
    </div>
  );
};

export default InvoiceEditPage;
