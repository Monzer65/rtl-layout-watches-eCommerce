"use client";

import Link from "next/link";
import { SubmitButton } from "../SubmitButton";
import { useFormState, useFormStatus } from "react-dom";
import { createCustomer } from "@/app/lib/actions";

const CreateCustomersForm = () => {
  const [state, dispatch] = useFormState(createCustomer, undefined);
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor='name'>نام</label>
        <input type='text' name='name' placeholder='نام کاربر' />
      </div>
      <div>
        <label htmlFor='email'>ایمیل</label>
        <input type='text' name='email' placeholder='ایمیل' />
      </div>
      <div>
        <label htmlFor='password'>پسورد</label>
        <input type='text' name='password' placeholder='پسورد' />
      </div>
      <div>
        <label htmlFor='address'>آدرس</label>
        <input type='text' name='address' placeholder='آدرس' />
      </div>
      <div>
        <Link
          href='/admin-area/store/customers'
          className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
        >
          کنسل
        </Link>
        <SubmitButton type='submit'>ارسال</SubmitButton>
      </div>
      {state?.error && (
        <div id='amount-error' aria-live='polite'>
          <p className='mt-2 text-sm text-red-500'>{state.error}</p>
        </div>
      )}
    </form>
  );
};

export default CreateCustomersForm;
