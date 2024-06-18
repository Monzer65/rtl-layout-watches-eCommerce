import CreateProductForm from "@/app/components/admin/products/CreateProductForm";

const createProductpage = () => {
  return (
    <div className='max-w-[800px] md:mt-[5rem]'>
      <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
        ایجاد محصول جدید
      </h1>
      <CreateProductForm />
    </div>
  );
};

export default createProductpage;
