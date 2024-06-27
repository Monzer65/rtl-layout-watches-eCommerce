import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label='Breadcrumb' className='mb-6 mt-4 block'>
      <ol className='flex text-xs md:text-sm'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={`${
              breadcrumb.active ? "text-gray-900" : "text-gray-500"
            } flex items-center`}
          >
            {index === breadcrumbs.length - 1 ? (
              <div className='flex items-center cursor-default'>
                {breadcrumb.icon && (
                  <span className='ml-1 w-3 md:w-4'>{breadcrumb.icon}</span>
                )}
                <span> {breadcrumb.label}</span>
              </div>
            ) : (
              <Link
                href={breadcrumb.href}
                className='flex items-center hover:underline'
              >
                {breadcrumb.icon && (
                  <span className='ml-1 w-3 md:w-4'>{breadcrumb.icon}</span>
                )}
                <span> {breadcrumb.label}</span>
              </Link>
            )}
            {index < breadcrumbs.length - 1 ? (
              <span className='mx-3 inline-block'>
                <ChevronLeftIcon className='w-3' />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
