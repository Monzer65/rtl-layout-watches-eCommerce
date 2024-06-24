import EditInvoiceForm from "@/app/components/admin/invoices/EditInvoiceForm";
import { fetchInvoiceById } from "@/app/lib/data_invoices";
import { ItemInInvoice } from "@/app/lib/definitions";
import { formatIranianDateTime } from "@/app/lib/helpers/formatDateAndTime";

const InvoiceEditPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const data = await fetchInvoiceById(id);

  // converting object ids to string
  let invoiceData;
  if (data.invoice) {
    invoiceData = {
      ...data.invoice,
      _id: data.invoice._id.toString(),
      customer: {
        ...data.invoice.customer,
        customerId: data.invoice.customer.customerId.toString(),
      },
      items: data.invoice.items.map((item: ItemInInvoice) => ({
        ...item,
        productId: item.productId.toString(),
      })),
    };
  }

  return (
    <div className='max-w-[800px] md:mt-[5rem]'>
      <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
        ویرایش فاکتور
      </h1>
      <p>
        تاریخ ایجاد:{" "}
        {invoiceData?.invoiceDate
          ? formatIranianDateTime(invoiceData.invoiceDate)
          : "N/A"}
      </p>

      <p>
        آخرین ویرایش:{" "}
        {invoiceData?.updatedAt
          ? formatIranianDateTime(invoiceData.updatedAt)
          : "N/A"}
      </p>

      <EditInvoiceForm invoice={invoiceData} />
    </div>
  );
};

export default InvoiceEditPage;
