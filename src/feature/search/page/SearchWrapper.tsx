// src/feature/search/page/SearchWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic-import SearchPage, client-only
const SearchPageClient = dynamic(
  () => import('./SearchPage').then((mod) => mod.SearchPage),
  { ssr: false }
);

export function SearchWrapper() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}
