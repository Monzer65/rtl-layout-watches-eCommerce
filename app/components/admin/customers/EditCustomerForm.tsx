"use client";

import { updateCustomer } from "@/app/lib/actions";
import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "react-dom";
import { Customer } from "@/app/lib/definitions";

export default function EditCustomerForm({
  customer = {} as Customer,
}: {
  customer?: Customer;
}) {
  const [state, dispatch] = useFormState(
    updateCustomer.bind(null, customer._id),
    undefined
  );

  return (
    <form
      className='max-w-md mx-auto p-4 border rounded shadow'
      action={dispatch}
    >
      <div className='mb-4'>
        <label htmlFor='name' className='block font-semibold mb-1'>
          نام
        </label>
        <input
          type='text'
          id='name'
          name='name'
          defaultValue={customer.name}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='email' className='block font-semibold mb-1'>
          ایمیل
        </label>
        <input
          type='email'
          id='email'
          name='email'
          defaultValue={customer.email}
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label htmlFor='password' className='block font-semibold mb-1'>
          پسورد جدید
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label className='block font-semibold mb-1'>رُل</label>
        <div className='flex gap-4'>
          <label>
            <input
              type='checkbox'
              name='roles'
              value='user'
              defaultChecked={customer.roles.includes("user")}
            />{" "}
            یوزر عادی
          </label>
          <label>
            <input
              type='checkbox'
              name='roles'
              value='admin'
              defaultChecked={customer.roles.includes("admin")}
            />{" "}
            ادمین
          </label>
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='address' className='block font-semibold mb-1'>
          آدرس
        </label>
        <input
          type='text'
          id='address'
          name='address'
          defaultValue={customer.address}
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='flex gap-4'>
        <SubmitButton type='submit'>ذخیره</SubmitButton>
        <Link
          href='/admin-area/store/customers'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          کنسل
        </Link>
      </div>
      {state?.error && (
        <div id='amount-error' aria-live='polite'>
          <p className='mt-2 text-sm text-red-500'>{state.error}</p>
        </div>
      )}
    </form>
  );
}
