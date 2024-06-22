"use client";

import { useFormStatus } from "react-dom";
import Spinner from "../Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function SubmitButton({ children, className, ...rest }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...rest}
      className={`flex h-10 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 disabled:opacity-70  ${className}`}
      disabled={pending}
    >
      {pending ? <Spinner size={5} /> : children}
    </button>
  );
}
