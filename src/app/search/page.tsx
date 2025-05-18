// src/app/search/page.tsx

import { SearchPage as SearchPageComponent } from '@/feature/search/page/SearchPage';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search | commercéll',
};

export default function SearchPageRoute() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageComponent />
    </Suspense>
  );
}
