"use client";

import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "react-dom";
import {
  ArchiveBoxIcon,
  CheckIcon,
  ClockIcon,
  RocketLaunchIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { createInvoice } from "@/app/lib/actions";
import { useState } from "react";
import { Customer, Product } from "@/app/lib/definitions";
import Image from "next/image";

export default function CreateInvoiceForm({
  customers,
  products,
}: {
  customers: Customer[];
  products: Product[];
}) {
  const [state, dispatch] = useFormState(createInvoice, undefined);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const isValidProductId = (productId: string) => {
    return products.some((p) => p._id === productId);
  };

  const handleProductSelect = (productId: string) => {
    if (
      isValidProductId(productId) &&
      !selectedProductIds.includes(productId)
    ) {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const handleProductRemove = (index: number) => {
    setSelectedProductIds(selectedProductIds.filter((_, i) => i !== index));
  };

  return (
    <form className='mx-auto my-8 p-4 border rounded shadow' action={dispatch}>
      <div className='mb-4'>
        <label htmlFor='customer' className='mb-2 block text-sm font-medium'>
          انتخاب مشتری
        </label>
        <div className='relative'>
          <select
            id='customer'
            name='customer'
            className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pr-10 text-sm outline-2 placeholder:text-gray-500'
            defaultValue=''
            aria-describedby='customer-error'
          >
            <option value='' disabled>
              یک مشتری را برای صدور فاکتور جدید انتخاب کنید
            </option>
            {customers.map((customer) => (
              <option key={customer._id} value={JSON.stringify(customer)}>
                {customer.username}
              </option>
            ))}
          </select>
          <UserCircleIcon className='pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='productId' className='mb-2 block text-sm font-medium'>
          انتخاب محصول
        </label>
        <div className='relative'>
          <input
            list='productId'
            name='productId'
            className='border border-gray-200 pr-10 py-2 text-sm outline-2 placeholder:text-gray-500'
            onChange={(e) => handleProductSelect(e.target.value)}
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
              onClick={() => handleProductRemove(index)}
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
                  defaultValue={1}
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
            />
          </div>
        );
      })}

      <div className='mb-4'>
        <label htmlFor='tax' className='block font-semibold mb-1'>
          مالیات
        </label>
        <input
          type='number'
          id='tax'
          name='tax'
          className='w-full p-2 border rounded'
        />
      </div>

      <fieldset className='mb-4'>
        <legend className='mb-2 block text-sm font-medium'>
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
                className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
              />
              <label
                htmlFor='failed'
                className='mr-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white'
              >
                پرداخت ناموفق <CheckIcon className='h-4 w-4' />
              </label>
            </div>
          </div>
        </div>
        {/* <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
      </fieldset>

      <div className='mb-4'>
        <label htmlFor='paymentMethod' className='block font-semibold mb-1'>
          روش پرداخت
        </label>
        <input
          type='text'
          id='paymentMethod'
          name='paymentMethod'
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
        <div id='amount-error' aria-live='polite'>
          <p className='mt-2 text-sm text-red-500'>{state.error}</p>
        </div>
      )}
    </form>
  );
}
