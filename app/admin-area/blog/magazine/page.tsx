import Search from "@/app/components/admin/Search";
import React from "react";

const page = () => {
  return (
    <div>
      <Search placeholder='جستجو...' />
      <h1 className='text-2xl font-bold mt-10'>مجله</h1>
    </div>
  );
};

export default page;
