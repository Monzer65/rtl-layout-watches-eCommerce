import EditCustomerForm from "@/app/components/admin/customers/EditCustomerForm";
import { fetchCustomerById } from "@/app/lib/data";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const customerData = await fetchCustomerById(id);

  return (
    <div>
      <h1>ویرایش کاربر:</h1>
      <p>
        تاریخ ایجاد:{" "}
        {customerData?.customer?.createdAt
          ? new Date(customerData.customer.createdAt).toLocaleDateString()
          : "N/A"}
      </p>

      <p>
        آخرین ویرایش:{" "}
        {customerData?.customer?.updatedAt
          ? new Date(customerData.customer.updatedAt).toLocaleDateString()
          : "N/A"}
      </p>

      <EditCustomerForm customer={customerData.customer} />
    </div>
  );
};

export default page;
