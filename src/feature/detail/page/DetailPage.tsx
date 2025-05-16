'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ProductDetailSection } from '../section/ProductDetailSection';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { ProductBase, ProductDetail } from '@/types/product';

type DetailPageProps = {
  product: ProductDetail;
  relatedProducts: ProductBase[];
};

export const DetailPage = ({ product, relatedProducts }: DetailPageProps) => {
  const pathname = usePathname();

  // scroll ke atas setiap kali route berubah
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <main className='container mx-auto pt-22 sm:pt-40 px-4 min-h-screen flex flex-col gap-6'>
      <ProductDetailSection
        id={product.id}
        image={product.image}
        category={product.category}
        title={product.title}
        price={product.price}
        rating={product.rating}
        description={product.description}
      />

      <ProductListSection title='Related Products' products={relatedProducts} />
    </main>
  );
};
