import CustomBarChart from "@/app/components/admin/CustomBarChart";
import { fetchMonthlyRevenues } from "@/app/lib/data_revenues";
import { RevenueData } from "@/app/lib/definitions";
import { Suspense } from "react";
import CardWrapper from "@/app/components/admin/Cards";
import LatestInvoices from "@/app/components/admin/LatestInvoices";

const AdminStorePage = async () => {
  const revenueData = await fetchMonthlyRevenues();
  const revenues = revenueData as RevenueData[];

  return (
    <div>
      <div className='flex gap-4 items-center mt-10 mb-4'>
        <h1 className='text-base sm:text-lg md:text-2xl font-bold'>
          مدیریت فروشگاه
        </h1>
      </div>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-5'>
        <Suspense fallback={<p>در حال بارگزاری...</p>}>
          <CardWrapper />
        </Suspense>
      </div>

      <div className='mt-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
        <Suspense fallback={<p>در حال بارگزاری...</p>}>
          <CustomBarChart data={revenues} />
        </Suspense>
        <Suspense fallback={<p>در حال بارگزاری...</p>}>
          <LatestInvoices />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminStorePage;
