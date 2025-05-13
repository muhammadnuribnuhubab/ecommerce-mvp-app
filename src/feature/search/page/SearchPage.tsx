// src/feature/search/page/SearchPage.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { SearchResultPage } from '@/feature/search/page/SearchResultPage';
import { mockData } from '@/constants/mockData';
import { ProductBase } from '@/types/product'; // import ProductBase
import clsx from 'clsx';
import { EmptyPage } from './EmptyPage';

const allProducts: ProductBase[] = Object.entries(mockData).flatMap(
  ([, products]) =>
    products.map((product) => ({
      ...product,
    }))
);

export const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim().toLowerCase() || '';
  const hasQuery = query.length > 0;

  const filteredResults = allProducts.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  const isEmptyPage = !hasQuery || filteredResults.length === 0;

  const content = isEmptyPage ? (
    <EmptyPage type={!hasQuery ? 'no-query' : 'no-results'} query={query} />
  ) : (
    <SearchResultPage results={filteredResults} query={query} />
  );

  return (
    <main
      className={clsx(
        'container mx-auto px-4 min-h-screen',
        !isEmptyPage && 'pt-22 sm:pt-28'
      )}
    >
      {content}
    </main>
  );
};
