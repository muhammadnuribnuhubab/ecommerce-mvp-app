// src/app/search/page.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | commercéll',
};

import { SearchPage as SearchPageComponent } from '@/feature/search/page/SearchPage';

export default function SearchPage() {
  return <SearchPageComponent />;
}
