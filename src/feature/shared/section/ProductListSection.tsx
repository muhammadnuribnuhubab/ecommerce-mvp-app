'use client';

import Link from 'next/link';
import { Typography } from '@/feature/shared/ui/Typography';
import { ProductCard } from '../widget/ProductCard';
import { ProductBase } from '@/types/product';
import { motion } from 'framer-motion';

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

      <motion.div
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {products.map((product) => (
          <Link key={product.id} href={`/detail/${product.id}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <ProductCard
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating.rate}
              />
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
};
