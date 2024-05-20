import Search from "@/app/components/admin/Search";

const page = () => {
  return (
    <div>
      <Search placeholder='جستجو...' />
      <h1 className='text-2xl font-bold mt-10'>محصولات</h1>
    </div>
  );
};

export default page;
