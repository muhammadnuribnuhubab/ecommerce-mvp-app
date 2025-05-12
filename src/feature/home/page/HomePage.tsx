// src/feature/home/page/HomePage.tsx

'use client';

import { useState } from 'react';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { BannerSection } from '../section/BannerSection';
import { mockData } from '@/constants/mockData';
import { Button } from '@/feature/shared/ui/Button';

export const HomePage = () => {
  // Gabungkan semua produk dari semua kategori menjadi satu array
  const featuredProducts = Object.values(mockData).flat();

  // State untuk mengontrol jumlah produk yang ditampilkan
  const [visibleCount, setVisibleCount] = useState(5);

  // Fungsi untuk menambah produk yang ditampilkan
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // Ambil produk yang akan ditampilkan berdasarkan visibleCount
  const visibleProducts = featuredProducts.slice(0, visibleCount);

  // Cek apakah masih ada produk yang bisa ditampilkan
  const hasMore = visibleCount < featuredProducts.length;

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 flex flex-col gap-6 xl:gap-10 min-h-screen'>
      <BannerSection
        images={[
          { imageUrl: '/images/home/banner.svg', altText: 'Promo 1' },
          { imageUrl: '/images/home/banner.svg', altText: 'Promo 2' },
          { imageUrl: '/images/home/banner.svg', altText: 'Promo 3' },
        ]}
      />
      <ProductListSection
        title='Featured Products'
        products={visibleProducts} // Kirim produk yang terlihat
      />

      {hasMore && (
        <div className='flex justify-center'>
          <Button onClick={handleLoadMore} variant='secondary'>Load More</Button>
        </div>
      )}
    </main>
  );
};
