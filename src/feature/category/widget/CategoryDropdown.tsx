'use client';

import { ChevronIcon } from '@/feature/shared/ui/Icon';
import { useState } from 'react';
import { Checkbox } from '@/feature/shared/ui/Checkbox';
import { useRouter, usePathname } from 'next/navigation';
import { categories } from '@/feature/shared/widget/CategoryDropdownHeaderList';

type CategoryDropdownProps = {
  selected: string[];
  onSelect: (category: string) => void;
};

export const CategoryDropdown = ({
  onSelect,
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: string) => {
    onSelect(category);
    router.push(`/category/${encodeURIComponent(category)}`);
    setIsOpen(false);
  };

  const currentCategory = decodeURIComponent(pathname.split('/').pop() || '');

  return (
    <div className='relative inline-block text-left w-full'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='w-full flex items-center justify-between gap-2 px-4 py-2 border border-neutral-300 rounded-lg font-semibold text-sm sm:text-base bg-white hover:bg-neutral-50 focus:outline-none'
      >
        Category
        <ChevronIcon
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className='absolute z-10 mt-2 w-full bg-white border border-neutral-300 rounded-lg shadow-md max-h-64 overflow-y-auto'>
          {categories.map((category) => {
            const isActive =
              currentCategory.toLowerCase() === category.toLowerCase();

            return (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className='w-full flex items-center gap-2 px-4 py-2 text-sm sm:text-base hover:bg-neutral-100'
                >
                  <Checkbox
                    checked={isActive}
                    onChange={() => handleCategoryClick(category)}
                    name={category}
                  />
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
