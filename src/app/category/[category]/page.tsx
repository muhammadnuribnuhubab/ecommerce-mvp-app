// src/app/category/[category]/page.tsx

import type { Metadata } from 'next';
import { CategoryPage as CategoryPageComponenet } from '@/feature/category/page/CategoryPage';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Category | commercell',
};

export default function CategoryPage() {
  return (
    <Suspense>
      <CategoryPageComponenet />
    </Suspense>
  );
}
