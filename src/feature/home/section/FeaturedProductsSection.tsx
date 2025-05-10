'use client';

import { useState } from 'react';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { Button } from '@/feature/shared/ui/Button';

type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
};

type FeaturedProductsSectionProps = {
  products: Product[];
};

export const FeaturedProductsSection = ({
  products,
}: FeaturedProductsSectionProps) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <section className='space-y-6'>
      <ProductListSection
        title='Featured Products'
        products={visibleProducts}
      />

      {hasMore && (
        <div className='flex justify-center'>
          <Button
            onClick={handleLoadMore}
            variant='secondary'
            fullWidth={false}
            className='!px-16'
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};
