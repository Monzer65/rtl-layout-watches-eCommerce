import CreateCustomersForm from "@/app/components/admin/customers/CreateCustomersForm";

const page = () => {
  return (
    <div className='max-w-[800px] md:mt-[5rem]'>
      <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
        ایجاد مشتری جدید
      </h1>
      <CreateCustomersForm />
    </div>
  );
};

export default page;
