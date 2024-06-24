"use client";

import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import Spinner from "../../Spinner";

export function CreateInvoiceButton() {
  return (
    <Link
      href='/admin-area/store/invoices/create'
      className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
    >
      <PlusIcon className='h-5 md:ml-4' />{" "}
      <span className=''>ایجاد فاکتور جدید</span>
    </Link>
  );
}

export function UpdateInvoiceButton({ id }: { id: string }) {
  return (
    <Link
      href={`/admin-area/store/invoices/${id}/edit`}
      className='flex flex-col items-center justify-center text-blue-500'
    >
      <PencilIcon className='w-4' />
      <span>ویرایش</span>
    </Link>
  );
}

export function DeleteInvoiceButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className='flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded'
      disabled={pending}
    >
      {pending ? (
        <>
          <Spinner size={5} />
          {/* <span>درحال پردازش ...</span> */}
        </>
      ) : (
        <>
          <CheckIcon className='w-4' />
          <span>تایید</span>
        </>
      )}
    </button>
  );
}

export function ModalButton({
  setShowModal,
}: {
  setShowModal: (show: boolean) => void;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type='button'
      onClick={() => setShowModal(true)}
      className='flex flex-col items-center justify-center text-red-500'
      disabled={pending}
    >
      {pending ? (
        <>
          <Spinner size={4} />
        </>
      ) : (
        <>
          <TrashIcon className='w-4' />
          <span>حذف</span>
        </>
      )}
    </button>
  );
}