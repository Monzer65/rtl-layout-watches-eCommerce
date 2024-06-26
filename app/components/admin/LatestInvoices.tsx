import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { fetchLatestInvoices } from "@/app/lib/data_invoices";
import { Invoice } from "@/app/lib/definitions";

export default async function LatestInvoices() {
  const latestInvoicesData = await fetchLatestInvoices();
  const latestInvoices = latestInvoicesData as Invoice[];
  return (
    <div className='flex w-full flex-col'>
      <h2 className='text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong mb-2'>
        آخرین فاکتورها
      </h2>
      <div className='flex grow flex-col justify-between rounded-xl bg-gray-50 p-4'>
        <div className='bg-white px-6 overflow-auto'>
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice._id}
                className={`
                  flex flex-row items-center justify-between gap-4 py-4
                  ${i !== 0 && "border-t"}`}
              >
                <div className='flex items-center'>
                  {/* <Image
                    src={invoice.customer?.img_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  /> */}
                  <div className='min-w-0'>
                    <p
                      className=' text-sm font-semibold md:text-base'
                      title={invoice.customer.name}
                    >
                      {invoice.customer.name.substring(0, 10)}
                      {invoice.customer.name.length > 10 && "..."}
                    </p>
                    <p className='hidden text-sm text-gray-500 sm:block'>
                      {invoice.customer.email}
                    </p>
                  </div>
                </div>
                <p className={` text-sm font-medium md:text-base`}>
                  {invoice.total}
                </p>
              </div>
            );
          })}
        </div>
        <div className='flex items-center pb-2 pt-6'>
          <ArrowPathIcon className='h-5 w-5 text-gray-500' />
          <h3 className='mr-2 text-sm text-gray-500 '>به روز</h3>
        </div>
      </div>
    </div>
  );
}
