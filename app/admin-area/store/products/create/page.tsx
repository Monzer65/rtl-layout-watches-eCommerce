import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import CreateProductForm from "@/app/components/admin/products/CreateProductForm";
import { HomeIcon } from "@heroicons/react/24/outline";

const createProductpage = () => {
  return (
    <div className='max-w-[800px] md:mt-[5rem]'>
      <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
        ایجاد محصول جدید
      </h1>
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
            label: "ایجاد محصول",
            href: `/admin-area/store/products/create`,
            active: true,
          },
        ]}
      />
      <CreateProductForm />
    </div>
  );
};

export default createProductpage;
