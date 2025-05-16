'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SearchResultPage } from '@/feature/search/page/SearchResultPage';
import { ProductBase, ProductDetail } from '@/types/product';
import clsx from 'clsx';
import { EmptyPage } from './EmptyPage';
import { searchProducts } from '@/lib/api';
import { SearchIcon } from '@/feature/shared/ui/Icon';

export const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.trim().toLowerCase() || '';
  const hasQuery = query.length > 0;

  const [results, setResults] = useState<ProductBase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasQuery) return;

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        // Ketahui bahwa searchProducts mengembalikan array ProductDetail
        const data: ProductDetail[] = await searchProducts(query);

        // Sekarang 'item' sudah bertipe ProductDetail
        const mapped: ProductBase[] = data.map((item: ProductDetail) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          rating: {
            rate: item.rating?.rate ?? 0,
            count: item.rating?.count ?? 0,
          },
        }));

        setResults(mapped);
      } catch (err) {
        setError((err as Error).message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [hasQuery, query]);

  const isEmptyPage = !hasQuery || (!loading && results.length === 0);

  const content = error ? (
    <p className='text-red-500'>Error: {error}</p>
  ) : isEmptyPage ? (
    <EmptyPage type={!hasQuery ? 'no-query' : 'no-results'} query={query} />
  ) : (
    <SearchResultPage results={results} query={query} />
  );

  return (
    <main
      className={clsx(
        'container mx-auto px-4 min-h-screen',
        !isEmptyPage && 'pt-22 sm:pt-28'
      )}
    >
      {loading ? (
        <div className='flex flex-col items-center justify-center min-h-[65vh]'>
          <SearchIcon className='!w-30 !h-30 text-gray-500 animate-pulse' />
        </div>
      ) : (
        content
      )}
    </main>
  );
};
