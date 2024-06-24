"use client";

import { updateCustomer } from "@/app/lib/actions";
import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState } from "react-dom";
import { Customer } from "@/app/lib/definitions";
import { RocketLaunchIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
    <form className='mx-auto my-8 p-4 border rounded shadow' action={dispatch}>
      <div className='mb-4'>
        <label htmlFor='username' className='block font-semibold mb-1'>
          نام کاربری
        </label>
        <input
          type='text'
          id='username'
          name='username'
          defaultValue={customer.username}
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
          رمز عبور جدید
        </label>
        <input
          type='password'
          id='password'
          name='password'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label className='block font-semibold mb-1'>نقش</label>
        <div className='flex gap-4'>
          <label>
            <input
              type='checkbox'
              name='roles'
              value='user'
              defaultChecked={customer?.roles.includes("user")}
            />{" "}
            کاربر عادی
          </label>
          <label>
            <input
              type='checkbox'
              name='roles'
              value='admin'
              defaultChecked={customer?.roles.includes("admin")}
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
      <div className='flex items-center gap-4'>
        <Link
          href='/admin-area/store/customers'
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
