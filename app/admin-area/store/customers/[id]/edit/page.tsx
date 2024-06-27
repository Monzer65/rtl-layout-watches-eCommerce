import Breadcrumbs from "@/app/components/admin/BreadCrumbs";
import EditCustomerForm from "@/app/components/admin/customers/EditCustomerForm";
import { fetchCustomerById } from "@/app/lib/data_customers";
import { formatIranianDateTime } from "@/app/lib/helpers/formatDateAndTime";
import { HomeIcon } from "@heroicons/react/24/outline";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  console.log("id:", id);
  const customerData = await fetchCustomerById(id);

  return (
    <div className='max-w-[800px] md:mt-[5rem]'>
      <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
        ویرایش کاربر
      </h1>
      <p>
        تاریخ ایجاد:{" "}
        {customerData?.customer?.createdAt
          ? formatIranianDateTime(customerData.customer.createdAt)
          : "N/A"}
      </p>

      <p className='mb-2'>
        آخرین ویرایش:{" "}
        {customerData?.customer?.updatedAt
          ? formatIranianDateTime(customerData.customer.updatedAt)
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
            label: "مدیریت مشتریان",
            href: `/admin-area/store/customers`,
          },
          {
            label: "ویرایش مشتری",
            href: `/admin-area/store/customers/${id}/edit`,
            active: true,
          },
        ]}
      />

      <EditCustomerForm customer={customerData.customer} />
    </div>
  );
};

export default page;
