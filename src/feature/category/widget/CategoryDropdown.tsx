// src/feature/category/widget/CategoryDropdown.tsx

'use client';

import { ChevronIcon } from '@/feature/shared/ui/Icon';
import { useState } from 'react';
import { Checkbox } from '@/feature/shared/ui/Checkbox';

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

  const handleCheckboxChange = (category: string) => {
    if (selected.includes(category)) {
      onSelect(category);
    } else {
      onSelect(category); 
    }
  };

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
        <ul className='absolute z-10 mt-2 w-full bg-white border border-neutral-300 rounded-lg shadow-md'>
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCheckboxChange(category)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm sm:text-base hover:bg-neutral-100`}
              >
                <Checkbox
                  checked={selected.includes(category)} // Checkbox is checked if category is selected
                  onChange={() => handleCheckboxChange(category)} // Handle checkbox change
                  name={category}
                />
                {category}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
