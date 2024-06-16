import EditCustomerForm from "@/app/components/admin/customers/EditCustomerForm";
import { fetchCustomerById } from "@/app/lib/data";
import { formatIranianDateTime } from "@/app/lib/helpers/formatDateAndTime";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
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

      <p>
        آخرین ویرایش:{" "}
        {customerData?.customer?.updatedAt
          ? formatIranianDateTime(customerData.customer.updatedAt)
          : "N/A"}
      </p>

      <EditCustomerForm customer={customerData.customer} />
    </div>
  );
};

export default page;
