import { fetchCardData } from "@/app/lib/data_revenues";
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  products: ArchiveBoxIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    numberOfProducts,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title='مجموع درآمد' value={totalPaidInvoices} type='collected' />
      {/* <Card
        title='در انتظار پرداخت'
        value={totalPendingInvoices}
        type='pending'
      /> */}
      <Card title='تعداد فاکتورها' value={numberOfInvoices} type='invoices' />
      <Card title='تعداد مشتریها' value={numberOfCustomers} type='customers' />
      <Card title='تعداد محصولات' value={numberOfProducts} type='products' />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "products" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className='rounded-xl bg-gray-50 p-2 shadow-sm'>
      <div className='flex p-4'>
        {Icon ? <Icon className='h-5 w-5 text-gray-700' /> : null}
        <h3 className='mr-2 text-sm font-medium'>{title}</h3>
      </div>
      <p
        dir='ltr'
        className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        title={value.toString()}
      >
        {value}
      </p>
    </div>
  );
}
