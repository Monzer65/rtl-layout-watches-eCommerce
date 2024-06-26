import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import EditProductForm from "@/app/components/admin/products/EditProductForm";
import { getProductById } from "@/app/lib/data_products";
import { formatIranianDateTime } from "@/app/lib/helpers/formatDateAndTime";
import { HomeIcon } from "@heroicons/react/24/outline";

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

      <p className='mb-2'>
        آخرین ویرایش:{" "}
        {productData?.product?.updatedAt
          ? formatIranianDateTime(productData.product.updatedAt)
          : "N/A"}
      </p>

      <Breadcrumbs
        breadcrumbs={[
          {
            label: "داشبورد فروشگاه",
            href: "/admin-area/store",
            icon: <HomeIcon />,
          },
          {
            label: "مدیریت محصولات",
            href: `/admin-area/store/products`,
          },
          {
            label: "ویرایش محصول",
            href: `/admin-area/store/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditProductForm product={productData.product} />
    </div>
  );
};

export default page;
