// src/feature/sharaed/widget/CategoryDropdownList.tsx

'use client';

import { DropdownWrapper } from './DropdownWrapper';
import { CategoryDropdownTrigger } from './CategoryDropdownTrigger';
import { CategoryDropdownItem } from './CategoryDropdownItem';
import { Typography } from '../ui/Typography';
import { ChevronIcon } from '../ui/Icon';

const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];

export const CategoryDropdownList = () => {
  return (
    <DropdownWrapper
      trigger={<CategoryDropdownTrigger />}
      align='left'
      menuClassName='absolute bg-white rounded-lg shadow-lg px-4'
    >
      <Typography
        className='flex justify-center items-center py-4'
        weight='semibold'
      >
        Category 
        <ChevronIcon className='rotate-180'/>
      </Typography>
      <div className='flex flex-col'>
        {categories.map((category, index) => (
          <CategoryDropdownItem
            key={index}
            label={category}
            onClick={() => {
              console.log(`Selected: ${category}`);
            }}
          />
        ))}
      </div>
    </DropdownWrapper>
  );
};
