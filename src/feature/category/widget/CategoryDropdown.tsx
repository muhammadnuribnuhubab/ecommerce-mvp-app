// src/feature/category/widget/CategoryDropdown.tsx

'use client';

import { ChevronIcon } from '@/feature/shared/ui/Icon';
import { useState } from 'react';
import { Checkbox } from '@/feature/shared/ui/Checkbox';
import { useRouter, usePathname } from 'next/navigation';

type CategoryDropdownProps = {
  categories: string[];
  selected: string[];
  onSelect: (category: string) => void;
};

export const CategoryDropdown = ({
  categories,
  selected,
  onSelect,
}: CategoryDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = decodeURIComponent(pathname.split('/').pop() || '');

  const handleCategoryClick = (category: string) => {
    onSelect(category);
    router.push(`/category/${encodeURIComponent(category)}`);
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left w-full'>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='w-full flex items-center justify-between gap-2 px-4 py-2 border rounded-lg font-semibold bg-white hover:bg-neutral-50'
      >
        Category
        <ChevronIcon
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className='absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-md max-h-64 overflow-y-auto'>
          {categories.map((category) => {
            const isActive =
              selected.includes(category) ||
              currentCategory.toLowerCase() === category.toLowerCase();

            return (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className='w-full flex items-center gap-2 px-4 py-2 hover:bg-neutral-100'
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
