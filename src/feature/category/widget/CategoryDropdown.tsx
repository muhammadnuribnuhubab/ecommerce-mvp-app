'use client';

import { ChevronIcon } from '@/feature/shared/ui/Icon';
import { useState } from 'react';
import { Checkbox } from '@/feature/shared/ui/Checkbox';
import { useRouter, usePathname } from 'next/navigation';
import { categories } from '@/types/categories';

export const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Ambil segmen terakhir URL, misal "mens clothing" atau "electronics"
  const currentCategory = decodeURIComponent(pathname.split('/').pop() || '');

  const handleCategoryClick = (apiKey: string) => {
    // Push dengan encodeURIComponent => spasi jadi %20
    router.push(`/category/${encodeURIComponent(apiKey)}`);
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
          {categories.map(({ label, apiKey }) => {
            const isActive =
              currentCategory.toLowerCase() === apiKey.toLowerCase();

            return (
              <li key={apiKey}>
                <button
                  onClick={() => handleCategoryClick(apiKey)}
                  className='w-full flex items-center gap-2 px-4 py-2 hover:bg-neutral-100'
                >
                  <Checkbox
                    checked={isActive}
                    onChange={() => handleCategoryClick(apiKey)}
                    name={apiKey}
                  />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
