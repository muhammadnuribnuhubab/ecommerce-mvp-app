// sec/feature/shared/widget/BreadCrumb.tsx

import Link from 'next/link';
import { ChevronIcon } from '../ui/Icon';

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: Crumb[];
};

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className='text-sm'>
      <ol className='flex items-center space-x-1'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className='flex items-center'>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className='hover:underline hover:text-neutral-900'
                >
                  {item.label}
                </Link>
              ) : (
                <span className='text-primary-300 font-medium'>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronIcon className='mx-1 text-neutral-950 rotate-90' />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
