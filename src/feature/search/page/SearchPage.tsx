// src/feature/search/page/SearchPage.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { SearchEmptyPage } from '@/feature/search/page/SearchEmptyPage';
import { SearchResultPage } from '@/feature/search/page/SearchResultPage';
import { mockData } from '@/constants/mockData';
import clsx from 'clsx';

export type ProductSummary = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
};

const allProducts: ProductSummary[] = Object.entries(mockData).flatMap(
  ([category, products]) =>
    products.map((product) => ({
      ...product,
      description: `This is a great ${product.name.toLowerCase()} from ${category}.`,
    }))
);

export const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim().toLowerCase() || '';
  const hasQuery = query.length > 0;

  const filteredResults = allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );

  const isEmptyPage = !hasQuery || filteredResults.length === 0;

  const content = isEmptyPage ? (
    <SearchEmptyPage
      type={!hasQuery ? 'no-query' : 'no-results'}
      query={query}
    />
  ) : (
    <SearchResultPage results={filteredResults} query={query} />
  );

  return (
    <main
      className={clsx(
        'container mx-auto px-4 sm:px-0 min-h-screen',
        !isEmptyPage && 'pt-22 sm:pt-28'
      )}
    >
      {content}
    </main>
  );
};
