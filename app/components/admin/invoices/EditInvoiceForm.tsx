"use client";

import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "react-dom";
import { Customer, Invoice, Product } from "@/app/lib/definitions";
import {
  ArchiveBoxIcon,
  CheckIcon,
  ClockIcon,
  RocketLaunchIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { updateInvoice } from "@/app/lib/actions";

export default function EditInvoiceForm({
  invoice,
  customers,
  products,
}: {
  invoice: Invoice;
  customers: Customer[];
  products: Product[];
}) {
  const [state, dispatch] = useFormState(
    updateInvoice.bind(null, invoice._id),
    undefined
  );

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    invoice?.items?.map((item) => item.productId) || []
  );

  const isValidProductId = (productId: string) => {
    return products.some((p) => p._id === productId);
  };

  const handleProductSelect = (productId: string) => {
    if (isValidProductId(productId)) {
      if (!selectedProductIds.includes(productId)) {
        setSelectedProductIds([...selectedProductIds, productId]);
      }
    }
  };

  const handleProductRemove = (productId: string) => {
    setSelectedProductIds(selectedProductIds.filter((id) => id !== productId));
  };

  return (
    <form className='mx-auto my-8 p-4 border rounded shadow' action={dispatch}>
      <div className='mb-4'>
        <label htmlFor='invoiceNumber' className='block font-semibold mb-1'>
          شماره فاکتور
        </label>
        <input
          type='text'
          id='invoiceNumber'
          name='invoiceNumber'
          defaultValue={invoice?.invoiceNumber || ""}
          readOnly
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='customer' className='block font-semibold mb-1'>
          انتخاب مشتری
        </label>
        <div className='relative'>
          <select
            id='customer'
            name='customer'
            className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pr-10 text-sm outline-2 placeholder:text-gray-500'
            aria-describedby='customer-error'
            required
          >
            <option value='' disabled>
              یک مشتری را برای صدور فاکتور جدید انتخاب کنید
            </option>
            {customers.map((customer) => (
              <option
                key={customer._id}
                selected={customer._id === invoice.customer.customerId}
                value={JSON.stringify(customer)}
              >
                {customer.username}
              </option>
            ))}
          </select>
          <UserCircleIcon className='pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='productId' className='block font-semibold mb-1'>
          انتخاب محصول
        </label>
        <div className='relative'>
          <input
            list='productId'
            name='productId'
            className='border border-gray-200 pr-10 py-2 text-sm outline-2 placeholder:text-gray-500'
            onChange={(e) => handleProductSelect(e.target.value)}
            required={selectedProductIds.length < 1}
          />
          <datalist id='productId'>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}، {product.model}
              </option>
            ))}
          </datalist>
          <ArchiveBoxIcon className='pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
        </div>
      </div>

      {selectedProductIds.map((productId, index) => {
        return (
          <div key={index} className='flex items-center gap-4 mb-1'>
            <button
              type='button'
              className='text-red-500'
              onClick={() => handleProductRemove(productId)}
            >
              <span className='sr-only'>حذف آیتم محصول </span>
              <XMarkIcon className='w-6' />
            </button>
            {isValidProductId(productId) ? (
              <>
                <Image
                  src={
                    products.find((p) => p._id === productId)?.images[0] ?? ""
                  }
                  alt={`product image ${index + 1}`}
                  width={40}
                  height={40}
                />
                <p>{products.find((p) => p._id === productId)?.name}</p>
                <input
                  type='number'
                  name={`quantity-${index}`}
                  defaultValue={
                    invoice.items.find((item) => item.productId === productId)
                      ?.quantity || 1
                  }
                  min={1}
                  className='p-1 rounded border w-16'
                />
              </>
            ) : (
              <p className='text-xs text-red-500'>آیدی نامعتبر</p>
            )}
            <input
              type='text'
              name='products'
              value={JSON.stringify(products.find((p) => p._id === productId))}
              hidden
              readOnly
              className='p-1 rounded border'
              required
            />
          </div>
        );
      })}

      <div className='my-4'>
        <label htmlFor='tax' className='block font-semibold mb-1'>
          مالیات %
        </label>
        <input
          type='number'
          id='tax'
          name='tax'
          defaultValue={invoice?.tax * 100 || "10"}
          min='0'
          max='100'
          step='0.01'
          className='w-full p-2 border rounded'
        />
      </div>

      <fieldset className='my-4'>
        <legend className='block font-semibold mb-1'>
          انتخاب وضعیت پرداخت
        </legend>
        <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
          <div className='flex gap-4'>
            <div className='flex items-center'>
              <input
                id='pending'
                name='paymentStatus'
                type='radio'
                value='pending'
                defaultChecked={
                  invoice?.paymentStatus.toLocaleLowerCase() == "pending"
                }
                className='text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2'
              />
              <label
                htmlFor='pending'
                className='mr-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
              >
                در انتظار پرداخت <ClockIcon className='h-4 w-4' />
              </label>
            </div>
            <div className='flex items-center'>
              <input
                id='paid'
                name='paymentStatus'
                type='radio'
                value='paid'
                defaultChecked={
                  invoice?.paymentStatus.toLocaleLowerCase() == "paid"
                }
                className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
              />
              <label
                htmlFor='paid'
                className='mr-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'
              >
                پرداخت شده <CheckIcon className='h-4 w-4' />
              </label>
            </div>
            <div className='flex items-center'>
              <input
                id='failed'
                name='paymentStatus'
                type='radio'
                value='failed'
                defaultChecked={
                  invoice?.paymentStatus.toLowerCase() === "failed"
                }
                className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
              />
              <label
                htmlFor='failed'
                className='mr-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white'
              >
                پرداخت ناموفق <XMarkIcon className='h-4 w-4' />
              </label>
            </div>
          </div>
        </div>
      </fieldset>

      <div className='mb-4'>
        <label htmlFor='paymentMethod' className='block font-semibold mb-1'>
          روش پرداخت
        </label>
        <input
          type='text'
          id='paymentMethod'
          name='paymentMethod'
          defaultValue={invoice?.paymentMethod || ""}
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
          defaultValue={invoice?.transactionId}
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
          defaultValue={invoice?.invoiceDate?.toISOString().split("T")[0]}
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
          defaultValue={invoice?.dueDate?.toISOString().split("T")[0]}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='notes' className='block font-semibold mb-1'>
          توضیحات
        </label>
        <textarea
          id='notes'
          name='notes'
          defaultValue={invoice?.notes}
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

      {state?.error && (
        <div
          id='amount-error'
          aria-live='polite'
          className='fixed bottom-6 md:bottom-4 left-0 md:left-auto md:right-0 max-w-[200px] m-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded'
        >
          {state.error}
        </div>
      )}
    </form>
  );
}
