// src/feature/search/page/SearchPage.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { SearchEmptyPage } from '@/feature/search/page/SearchEmptyPage';
import { SearchResultPage } from '@/feature/search/page/SearchResultPage';
import clsx from 'clsx';

export type ProductSummary = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
};

export const mockProducts: ProductSummary[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    imageUrl: '/images/headphones.jpg',
    description:
      'Noise-cancelling over-ear wireless headphones with a long battery life.',
    price: 199.99,
  },
  {
    id: '2',
    name: 'Smartphone',
    imageUrl: '/images/smartphone.jpg',
    description: 'Latest smartphone with an OLED display and fast processor.',
    price: 899.0,
  },
  {
    id: '3',
    name: 'Laptop',
    imageUrl: '/images/laptop.jpg',
    description: 'High-performance laptop for gaming and productivity.',
    price: 1499.0,
  },
  {
    id: '4',
    name: 'Smartwatch',
    imageUrl: '/images/smartwatch.jpg',
    description:
      'Stylish smartwatch with fitness tracking and heart-rate monitoring.',
    price: 249.5,
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    imageUrl: '/images/speaker.jpg',
    description: 'Portable Bluetooth speaker with waterproof design.',
    price: 79.99,
  },
];

export const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim().toLowerCase() || '';
  const hasQuery = query.length > 0;

  const filteredResults = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );

  const isEmptyPage = !hasQuery || (hasQuery && filteredResults.length === 0);

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
