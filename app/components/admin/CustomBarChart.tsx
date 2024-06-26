"use client";
import { RevenueData } from "@/app/lib/definitions";
import { BarChart } from "@tremor/react";

const CustomBarChart = ({ data }: { data: RevenueData[] }) => {
  type CustomTooltipTypeBar = {
    payload: any;
    active: boolean | undefined;
    label: any;
  };

  const customTooltip = (props: CustomTooltipTypeBar) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className='w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown'>
        {payload.map((category: any, idx: number) => (
          <div key={idx} className='flex flex-1 space-x-2.5'>
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className='space-y-1'>
              <p className='text-tremor-content'>مجموع فاکتورهای این ماه</p>
              <p className='font-medium text-tremor-content-emphasis'>
                {category.value} تومان
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='flex w-full flex-col'>
      <h2 className='text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong mb-2'>
        جمع کل فاکتورها بصورت ماهیانه در سال جاری
      </h2>
      <div className='flex grow flex-col justify-between rounded-xl bg-gray-50 p-4'>
        <div className='bg-white px-6'>
          <BarChart
            data={data}
            index='month'
            categories={["totalRevenue"]}
            showLegend={false}
            colors={["blue"]}
            yAxisWidth={48}
            xAxisLabel='ماه (میلادی)'
            yAxisLabel='جمع فاکتورها (تومان)'
            customTooltip={customTooltip}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomBarChart;
