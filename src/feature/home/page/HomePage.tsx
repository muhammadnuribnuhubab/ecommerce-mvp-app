// src/feature/home/page/HomePage.tsx

'use client';

import { useState, useEffect } from 'react';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { BannerSection } from '../section/BannerSection';
import { Button } from '@/feature/shared/ui/Button';
import { getProducts } from '@/lib/api';
import { ProductDetail } from '@/types/product';
import { SkeletonCard } from '@/feature/shared/widget/SkeletonCard';

const VISIBLE_COUNT_KEY = 'visibleProductCount';

export const HomePage = () => {
  const [allProducts, setAllProducts] = useState<ProductDetail[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedCount = localStorage.getItem(VISIBLE_COUNT_KEY);
    if (savedCount) {
      setVisibleCount(Number(savedCount));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(VISIBLE_COUNT_KEY, String(visibleCount));
  }, [visibleCount]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const products = await getProducts();
        setAllProducts(products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const visibleProducts = allProducts.slice(0, visibleCount);
  const hasMore = visibleCount < allProducts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 flex flex-col gap-6 xl:gap-10 min-h-screen'>
      <BannerSection
        images={[
          { imageUrl: '/images/home/banner.svg', altText: 'Promo 1' },
          { imageUrl: '/images/home/banner.svg', altText: 'Promo 2' },
          { imageUrl: '/images/home/banner.svg', altText: 'Promo 3' },
        ]}
        isLoading={loading}
      />

      {error && <p className='text-center text-red-500'>{error}</p>}

      {loading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
          {Array.from({ length: visibleCount }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <ProductListSection
            title='Featured Products'
            products={visibleProducts}
          />

          {hasMore && (
            <div className='flex justify-center'>
              <Button onClick={handleLoadMore} variant='secondary'>
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
};
