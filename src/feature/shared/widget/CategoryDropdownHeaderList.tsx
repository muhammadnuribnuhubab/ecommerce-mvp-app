'use client';

import { usePathname, useRouter } from 'next/navigation';
import { DropdownWrapper } from './DropdownWrapper';
import { CategoryDropdownHeaderTrigger } from './CategoryDropdownHeaderTrigger';
import { CategoryDropdownHeaderItem } from './CategoryDropdownHeaderItem';
import { Typography } from '../ui/Typography';

export const categories = [
  'mens clothing',
  'jewelery',
  'electronics',
  'womens clothing',
];

export const CategoryDropdownHeaderList = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentCategory = decodeURIComponent(pathname.split('/').pop() || '');

  const handleClick = (category: string) => {
    router.push(`/category/${encodeURIComponent(category)}`);
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
        {categories.map((category, index) => (
          <CategoryDropdownHeaderItem
            key={index}
            label={category}
            onClick={() => handleClick(category)}
            className={
              currentCategory.toLowerCase() === category.toLowerCase()
                ? 'underline font-semibold text-blue-600'
                : ''
            }
          />
        ))}
      </div>
    </DropdownWrapper>
  );
};
