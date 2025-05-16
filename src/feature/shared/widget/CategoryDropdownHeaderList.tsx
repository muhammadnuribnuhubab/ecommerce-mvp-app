'use client';

import { usePathname, useRouter } from 'next/navigation';
import { DropdownWrapper } from './DropdownWrapper';
import { CategoryDropdownHeaderTrigger } from './CategoryDropdownHeaderTrigger';
import { CategoryDropdownHeaderItem } from './CategoryDropdownHeaderItem';
import { Typography } from '../ui/Typography';
import { categories } from '@/types/categories';

export const CategoryDropdownHeaderList = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Ambil segmen terakhir URL, misal "mens-clothing"
  const currentCategory = decodeURIComponent(pathname.split('/').pop() || '');

  const handleClick = (categoryUrlKey: string) => {
    router.push(`/category/${encodeURIComponent(categoryUrlKey)}`);
  };

  return (
    <DropdownWrapper
      trigger={<CategoryDropdownHeaderTrigger />}
      align='left'
      menuClassName='absolute bg-white rounded-lg shadow-lg px-4 pb-2 flex flex-col items-center justify-center text-center'
    >
      <Typography
        className='flex justify-center items-center py-3 pt-4 border-b border-neutral-300'
        weight='semibold'
      >
        Category
      </Typography>
      <div className='flex flex-col items-center justify-center text-center'>
        {categories.map(({ label, urlKey }) => (
          <CategoryDropdownHeaderItem
            key={urlKey}
            label={label}
            onClick={() => handleClick(urlKey)}
            className={
              currentCategory.toLowerCase() === urlKey.toLowerCase()
                ? 'underline font-semibold text-primary-300'
                : ''
            }
          />
        ))}
      </div>
    </DropdownWrapper>
  );
};
