"use client";

import { useState } from "react";
import { DeleteButton, ModalButton } from "./Buttons";
import { deleteCustomer } from "@/app/lib/actions";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function DeleteCustomer({ id }: { id: string }) {
  const [showModal, setShowModal] = useState(false);

  const deleteCustomerWithId = deleteCustomer.bind(null, id);

  return (
    <form action={deleteCustomerWithId}>
      <ModalButton setShowModal={setShowModal} />
      {showModal && (
        <>
          <div
            onClick={() => setShowModal(false)}
            className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'
          ></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg z-20'>
            <h2 className='text-lg font-semibold mb-4'>
              آیا از حذف این کاربر مطمئن هستید؟
            </h2>
            <div className='flex gap-2 justify-end'>
              <button
                type='button'
                onClick={() => setShowModal(false)}
                className='flex items-center gap-1 px-4 py-2 mr-2 bg-gray-300 rounded'
              >
                <XMarkIcon className='w-4' />
                انصراف
              </button>
              <DeleteButton />
            </div>
          </div>
        </>
      )}
    </form>
  );
}
