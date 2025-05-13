// src/feature/detail/component/ProductListSection.tsx (atau sesuai lokasimu)

'use client';

import Link from 'next/link';
import { Typography } from '@/feature/shared/ui/Typography';
import { ProductCard } from '../widget/ProductCard';
import { ProductBase } from '@/types/product';

type ProductListSectionProps = {
  title: string;
  products: ProductBase[];
};

export const ProductListSection = ({
  title,
  products,
}: ProductListSectionProps) => {
  return (
    <section>
      <Typography as='h2' size='xl' weight='bold' className='mb-4'>
        {title}
      </Typography>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
        {products.map((product) => (
          <Link key={product.id} href={`/detail/${product.id}`}>
            <ProductCard
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              rating={4.5}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
