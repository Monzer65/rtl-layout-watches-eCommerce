"use client";

import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState, useFormStatus } from "react-dom";
import { createCustomer } from "@/app/lib/actions";
import { RocketLaunchIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CreateCustomersForm = () => {
  const [state, dispatch] = useFormState(createCustomer, undefined);
  return (
    <form action={dispatch} className='mx-auto my-8 p-4 border rounded shadow'>
      <div className='mb-4'>
        <label htmlFor='username' className='block font-semibold mb-1'>
          نام کاربری
        </label>
        <input
          type='text'
          name='username'
          id='username'
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='email' className='block font-semibold mb-1'>
          ایمیل<span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          name='email'
          id='email'
          className='w-full p-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='password' className='block font-semibold mb-1'>
          رمز عبور<span className='text-red-500'>*</span>
        </label>
        <input
          type='password'
          name='password'
          id='password'
          className='w-full p-2 border rounded'
        />
      </div>

      <div className='mb-4'>
        <label className='block font-semibold mb-1'>نقش</label>
        <div className='flex gap-4'>
          <label>
            <input type='checkbox' name='roles' value='user' /> کاربر عادی
          </label>
          <label>
            <input type='checkbox' name='roles' value='admin' /> ادمین
          </label>
        </div>
      </div>

      <div className='mb-4'>
        <label htmlFor='address' className='block font-semibold mb-1'>
          آدرس
        </label>
        <input
          type='text'
          name='address'
          id='address'
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
        <div
          id='amount-error'
          aria-live='polite'
          className='mt-2 text-sm text-red-500'
        >
          {state.error}
        </div>
      )}
    </form>
  );
};

export default CreateCustomersForm;
