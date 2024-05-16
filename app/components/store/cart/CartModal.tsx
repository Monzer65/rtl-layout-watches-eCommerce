"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  const MainModalContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClickOutside = useCallback(
    (e: any) => {
      const dashbtn = MainModalContainerRef.current;
      if (dashbtn && !dashbtn.contains(e.target)) {
        router.back();
      }
    },
    [router]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <div className='md:hidden absolute inset-0 bg-black opacity-25 z-40' />
      <div
        ref={MainModalContainerRef}
        className='fixed inset-x-0 md:inset-x-auto md:left-12 bottom-0 md:bottom-auto md:top-[4rem] p-4 md:rounded-lg bg-white shadow-lg border z-50'
      >
        <div className='flex justify-between items-center gap-4 border-b'>
          <h1 className='text-xl font-bold text-center'>سبد خرید</h1>
          <button
            onClick={() => {
              router.back();
            }}
          >
            <XMarkIcon className='w-6' />
          </button>
        </div>
        <div id='cart-modal-children' className='max-h-[250px] overflow-auto'>
          {children}
        </div>
      </div>
    </>
  );
}
