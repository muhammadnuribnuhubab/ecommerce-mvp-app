'use client';

import { Breadcrumb } from '@/feature/shared/widget/BreadCrumb';
import { CategoryDropdown } from '../widget/CategoryDropdown';

type CategoryNavigationSectionProps = {
  breadcrumbItems: { label: string; href?: string }[];
  categories: string[];
  selected: string[];
  onSelect: (category: string) => void;
};

export const CategoryNavigationSection = ({
  breadcrumbItems,
  categories,
  selected,
  onSelect,
}: CategoryNavigationSectionProps) => {
  return (
    <section className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between '>
      <Breadcrumb items={breadcrumbItems} />
      <div className='w-full sm:w-60'>
        <CategoryDropdown
          categories={categories}
          selected={selected}
          onSelect={onSelect}
        />
      </div>
    </section>
  );
};
