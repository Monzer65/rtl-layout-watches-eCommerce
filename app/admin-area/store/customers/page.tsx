import Search from "@/app/components/admin/Search";

const customers = () => {
  return (
    <div>
      <Search placeholder='جستجو...' />
      <h1 className='text-2xl font-bold mt-10'>مشتریان</h1>
    </div>
  );
};

export default customers;
