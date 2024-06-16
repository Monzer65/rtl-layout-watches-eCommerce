"use client";
import { Customer } from "@/app/lib/definitions";
import { useState } from "react";
import { UpdateCustomer } from "./Buttons";
import { DeleteCustomer } from "./DeleteCustomerForm";

export default function CustomersTable({
  customers,
}: {
  customers: Customer[];
}) {
  const mapRoleCodeToLabel = (roleCode: string): string => {
    switch (roleCode) {
      case "admin":
        return "ادمین";
      case "user":
        return "کاربر";
      default:
        return "نامشخص"; // Fallback label
    }
  };

  const [copied, setCopied] = useState("");

  return (
    <table className='border-collapse w-full text-xs sm:text-sm md:text-base'>
      <thead>
        <tr className=''>
          <th className='border p-2'>نام کاربری</th>
          <th className='border p-2'>ایمیل</th>
          <th className='border p-2'>نقش</th>
          <th className='border p-2'>تاریخ ایجاد</th>
          <th className='border p-2'>عملیات</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {customers.map((customer) => (
          <tr key={customer._id}>
            <td className='border p-2 relative' dir='ltr'>
              <span
                title={customer.username}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(customer.username);
                  setCopied(customer._id);
                  setTimeout(() => setCopied(""), 2000);
                }}
              >
                {customer.username && customer.username.substring(0, 15)}
                {customer.username && customer.username.length > 15 && "..."}
              </span>
              {copied === customer._id && (
                <span className='absolute right-0 -top-4 px-3 py-1 rounded-md bg-gray-700 text-white'>
                  کپی شد
                </span>
              )}
            </td>
            <td className='border p-2'>{customer.email}</td>
            <td className='border p-2'>
              {customer.roles &&
                customer.roles.map(mapRoleCodeToLabel).join("، ")}
            </td>
            <td className='border p-2'>
              {customer.createdAt.toLocaleDateString("fa-IR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </td>{" "}
            <td className='flex gap-2 justify-between border p-2'>
              <UpdateCustomer id={customer._id} />
              <DeleteCustomer id={customer._id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
