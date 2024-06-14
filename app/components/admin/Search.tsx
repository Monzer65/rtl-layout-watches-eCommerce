"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [query, setQuery] = useState(
    searchParams.get("query")?.toString() || ""
  );

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  const handleClear = () => {
    setQuery("");
    handleSearch("");
  };

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  return (
    <div className='relative flex flex-1 flex-shrink-0'>
      <label htmlFor='search' className='sr-only'>
        جستجو
      </label>
      <input
        className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 pr-10 text-sm outline-2 placeholder:text-gray-500'
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {query && (
        <button
          onClick={handleClear}
          className='absolute left-0 px-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900 '
        >
          <XMarkIcon className='w-8' />
        </button>
      )}
      <MagnifyingGlassIcon className='absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  );
}
