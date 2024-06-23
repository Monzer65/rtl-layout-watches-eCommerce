import EditProductForm from "@/app/components/admin/products/EditProductForm";
import { getProductById } from "@/app/lib/data";
import { formatIranianDateTime } from "@/app/lib/helpers/formatDateAndTime";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const productData = await getProductById(id);

  return (
    <div className='max-w-[800px] md:mt-[5rem]'>
      <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
        ویرایش محصول
      </h1>
      <p>
        تاریخ ایجاد:{" "}
        {productData?.product?.createdAt
          ? formatIranianDateTime(productData.product.createdAt)
          : "N/A"}
      </p>

      <p>
        آخرین ویرایش:{" "}
        {productData?.product?.updatedAt
          ? formatIranianDateTime(productData.product.updatedAt)
          : "N/A"}
      </p>

      <EditProductForm product={productData.product} />
    </div>
  );
};

export default page;
