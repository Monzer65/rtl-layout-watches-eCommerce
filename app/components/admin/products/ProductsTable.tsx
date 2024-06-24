"use client";

import { Product } from "@/app/lib/definitions";
import Image from "next/image";
import { useState } from "react";
import { UpdateProductButton } from "./Buttons";
import { DeleteProduct } from "./DeleteProductForm";

export default function ProductsTable({ products }: { products: Product[] }) {
  const [copied, setCopied] = useState("");

  return (
    <table className='border-collapse w-full text-xs sm:text-sm md:text-base'>
      <thead>
        <tr className=''>
          <th className='border p-2'>تصویر محصول</th>
          <th className='border p-2'>نام محصول</th>
          <th className='border p-2'>تولید کننده</th>
          <th className='border p-2'>برند</th>
          <th className='border p-2'>مدل</th>
          <th className='border p-2'>جنسیت</th>
          <th className='border p-2'>قیمت</th>
          <th className='border p-2'>قیمت فروش</th>
          <th className='border p-2'>موجودی</th>
          <th className='border p-2'>در دسترس</th>
          <th className='border p-2'>تاریخ ایجاد</th>
          <th className='border p-2'>عملیات</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {products.map((product) => (
          <tr key={product._id}>
            <td className='border'>
              <Image
                src={product.images[0]}
                alt={product.name}
                width={40}
                height={40}
                className='m-auto h-auto'
              />
            </td>
            <td className='border p-2 relative' dir='ltr'>
              <span
                title={product.name}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(product.name);
                  setCopied(product._id);
                  setTimeout(() => setCopied(""), 2000);
                }}
              >
                {product.name && product.name.substring(0, 15)}
                {product.name && product.name.length > 15 && "..."}
              </span>
              {copied === product._id && (
                <span className='absolute right-0 -top-4 px-3 py-1 rounded-md bg-gray-700 text-white'>
                  کپی شد
                </span>
              )}
            </td>
            <td className='border p-2'>{product.manufacturer}</td>
            <td className='border p-2'>{product.brand}</td>
            <td className='border p-2'>{product.model}</td>
            <td className='border p-2'>{product.gender}</td>
            <td className='border p-2'>{product.price}</td>
            <td className='border p-2'>{product.sale_price}</td>
            <td className='border p-2'>{product.stock}</td>
            <td className='border p-2'>
              {product.availability === true ? "بله" : "نه"}
            </td>
            <td className='border p-2'>
              {product.createdAt.toLocaleDateString("fa-IR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </td>{" "}
            <td className='border p-2'>
              <div className='flex gap-2 justify-between'>
                <UpdateProductButton id={product._id} />
                <DeleteProduct id={product._id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
