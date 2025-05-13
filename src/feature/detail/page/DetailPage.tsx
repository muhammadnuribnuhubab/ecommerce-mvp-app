// src/feature/detail/page/DetailPage.tsx

'use client';

import { ProductDetailSection } from '../section/ProductDetailSection';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { ProductBase, ProductDetail } from '@/types/product'; // Impor ProductBase

type DetailPageProps = {
  product: ProductDetail;
  relatedProducts: ProductBase[];
};

export const DetailPage = ({ product, relatedProducts }: DetailPageProps) => {
  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4  min-h-screen flex flex-col gap-6 xl:gap-10'>
      <ProductDetailSection
        imageUrl={product.imageUrl}
        category={product.category}
        name={product.name}
        price={product.price}
        rating={product.rating}
        reviews={product.reviews}
        description={product.description}
        onAddToCart={() => console.log('Add to cart', product.id)}
        onBuyNow={() => console.log('Buy now', product.id)}
      />

      <ProductListSection title='Related Product' products={relatedProducts} />
    </main>
  );
};
