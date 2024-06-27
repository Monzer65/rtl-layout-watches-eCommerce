import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import CreateCustomersForm from "@/app/components/admin/customers/CreateCustomersForm";
import { HomeIcon } from "@heroicons/react/24/outline";

const page = () => {
  return (
    <div className='max-w-[800px] md:mt-[5rem]'>
      <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
        ایجاد مشتری جدید
      </h1>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "داشبورد فروشگاه",
            href: "/admin-area/store",
            icon: <HomeIcon />,
          },
          {
            label: "مدیریت مشتریان",
            href: `/admin-area/store/customers`,
          },
          {
            label: "ایجاد مشتری جدید",
            href: `/admin-area/store/customers/create`,
            active: true,
          },
        ]}
      />
      <CreateCustomersForm />
    </div>
  );
};

export default page;
