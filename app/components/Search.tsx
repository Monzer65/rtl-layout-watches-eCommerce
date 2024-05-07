"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
      params.delete("page");
    }
    if (pathname.endsWith("/products")) {
      replace(`${pathname}?${params.toString()}`);
    } else if (
      !pathname.endsWith("/products") &&
      pathname.includes("/products")
    ) {
      replace(`/store/products?${params.toString()}`);
    } else {
      replace(`${pathname}/products?${params.toString()}`);
    }
  }, 0);

  return (
    <form
      className='relative flex flex-1 flex-shrink-0 text-sm md:text-base'
      id='searchbox'
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchQuery);
      }}
    >
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <input
        className='peer block w-full rounded-md border border-gray-200 py-2 pr-8 md:pr-10 outline-2 placeholder:text-gray-600 bg-gray-50'
        placeholder={placeholder}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <button
        type='submit'
        className='absolute right-3 top-[50%] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900'
      >
        <MagnifyingGlassIcon className='h-4 w-4 md:h-6 md:w-6' />
      </button>
    </form>
  );
}
