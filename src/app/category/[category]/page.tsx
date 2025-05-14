// src/app/category/[category]/page.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Category | commercéll',
};

import { CategoryPage as CategoryPageComponenet } from '@/feature/category/page/CategoryPage';

export default function CategoryPage() {
  return <CategoryPageComponenet />;
}
