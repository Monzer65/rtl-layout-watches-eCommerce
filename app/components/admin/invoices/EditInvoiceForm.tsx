"use client";

// import { updateInvoice } from "@/app/lib/actions";
import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "react-dom";
import { Invoice } from "@/app/lib/definitions";
import { RocketLaunchIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function EditInvoiceForm({
  invoice = {} as Invoice,
}: {
  invoice?: Invoice;
}) {
  // const [state, dispatch] = useFormState(
  //   updateInvoice.bind(null, invoice._id),
  //   undefined
  // );

  return (
    <form
      className='mx-auto my-8 p-4 border rounded shadow'
      action={"dispatch"}
    >
      <div className='mb-4'>
        <label htmlFor='invoiceNumber' className='block font-semibold mb-1'>
          نام کاربری
        </label>
        <input
          type='text'
          id='invoiceNumber'
          name='invoiceNumber'
          defaultValue={invoice.invoiceNumber}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='customer' className='block font-semibold mb-1'>
          مشتری
        </label>
        <input
          type='text'
          id='customer'
          name='customer'
          defaultValue={invoice.customer.name}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='customerEmail' className='block font-semibold mb-1'>
          ایمیل مشتری
        </label>
        <input
          type='email'
          id='customerEmail'
          name='customerEmail'
          defaultValue={invoice.customer.email}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='customerPhone' className='block font-semibold mb-1'>
          شماره تلفن مشتری
        </label>
        <input
          type='tel'
          id='customerPhone'
          name='customerPhone'
          defaultValue={invoice.customer.phone}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='customerAddress' className='block font-semibold mb-1'>
          آدرس مشتری
        </label>
        <input
          type='text'
          id='customerAddress'
          name='customerAddress'
          defaultValue={`${invoice.customer.address.street}, ${invoice.customer.address.city}, ${invoice.customer.address.state}, ${invoice.customer.address.zip}, ${invoice.customer.address.country}`}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='subtotal' className='block font-semibold mb-1'>
          مبلغ زیرقیمت
        </label>
        <input
          type='number'
          id='subtotal'
          name='subtotal'
          defaultValue={invoice.subtotal}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='tax' className='block font-semibold mb-1'>
          مالیات
        </label>
        <input
          type='number'
          id='tax'
          name='tax'
          defaultValue={invoice.tax}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='total' className='block font-semibold mb-1'>
          مبلغ کل
        </label>
        <input
          type='number'
          id='total'
          name='total'
          defaultValue={invoice.total}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='paymentStatus' className='block font-semibold mb-1'>
          وضعیت پرداخت
        </label>
        <select
          id='paymentStatus'
          name='paymentStatus'
          defaultValue={invoice?.paymentStatus || "pending"}
          className='w-full p-2 border rounded'
        >
          <option value='pending'>در انتظار پرداخت</option>
          <option value='Paid'>پرداخت شده</option>
          <option value='failed'>پرداخت ناموفق</option>
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor='paymentMethod' className='block font-semibold mb-1'>
          روش پرداخت
        </label>
        <input
          type='text'
          id='paymentMethod'
          name='paymentMethod'
          defaultValue={invoice.paymentMethod}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='transactionId' className='block font-semibold mb-1'>
          شناسه تراکنش
        </label>
        <input
          type='text'
          id='transactionId'
          name='transactionId'
          defaultValue={invoice.transactionId}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='invoiceDate' className='block font-semibold mb-1'>
          تاریخ فاکتور
        </label>
        <input
          type='date'
          id='invoiceDate'
          name='invoiceDate'
          defaultValue={invoice.invoiceDate.toISOString().slice(0, 10)}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='dueDate' className='block font-semibold mb-1'>
          تاریخ پرداخت
        </label>
        <input
          type='date'
          id='dueDate'
          name='dueDate'
          defaultValue={invoice.dueDate.toISOString().slice(0, 10)}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='notes' className='block font-semibold mb-1'>
          یادداشت
        </label>
        <textarea
          id='notes'
          name='notes'
          defaultValue={invoice.notes}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='flex items-center gap-4'>
        <Link
          href='/admin-area/store/invoices'
          className='flex gap-1 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          <XMarkIcon className='w-4 md:w-6' />
          انصراف
        </Link>
        <SubmitButton type='submit' className='gap-1'>
          <RocketLaunchIcon className='w-4 md:w-6' />
          ارسال
        </SubmitButton>
      </div>
      {/* {state?.error && (
        <div id='amount-error' aria-live='polite'>
          <p className='mt-2 text-sm text-red-500'>{state.error}</p>
        </div>
      )} */}
    </form>
  );
}
