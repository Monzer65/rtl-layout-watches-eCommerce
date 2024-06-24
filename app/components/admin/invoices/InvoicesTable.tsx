"use client";
import { Invoice } from "@/app/lib/definitions";
import Link from "next/link";
import { UpdateInvoiceButton } from "./Buttons";
import { DeleteInvoice } from "./DeleteInvoiceForm";

export default function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <table className='border-collapse w-full text-xs sm:text-sm md:text-base'>
      <thead>
        <tr>
          <th className='border p-2'>شماره فاکتور</th>
          <th className='border p-2'>مشتری</th>
          <th className='border p-2'>تاریخ فاکتور</th>
          <th className='border p-2'>تاریخ سررسید</th>
          <th className='border p-2'>مبلغ کل</th>
          <th className='border p-2'>وضعیت پرداخت</th>
          <th className='border p-2'>توضیحات</th>
          <th className='border p-2'>عملیات</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {invoices.map((invoice) => (
          <tr key={invoice._id.toString()}>
            <td className='border p-2 relative' dir='ltr'>
              {invoice?.invoiceNumber}
            </td>
            <td className='border p-2'>
              <Link
                href={`/admin-area/store/customers/${invoice.customer.customerId}/edit`}
                className='hover:underline text-blue-700'
              >
                {invoice?.customer.name}
              </Link>
            </td>
            <td className='border p-2'>
              {new Date(invoice?.invoiceDate).toLocaleDateString("fa-IR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </td>
            <td className='border p-2'>
              {new Date(invoice?.dueDate).toLocaleDateString("fa-IR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </td>
            <td className='border p-2'>{invoice?.total}</td>
            <td className='border p-2'>
              {invoice?.paymentStatus.trim().toLocaleLowerCase() === "paid"
                ? "پرداخت شده"
                : invoice?.paymentStatus.trim().toLocaleLowerCase() ===
                  "pending"
                ? "در انتظار"
                : "ناموفق"}
            </td>
            <td className='border p-2'>{invoice?.notes}</td>
            <td className='border p-2'>
              <div className='flex gap-2 justify-between'>
                <UpdateInvoiceButton id={invoice._id.toString()} />
                <DeleteInvoice id={invoice._id.toString()} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
