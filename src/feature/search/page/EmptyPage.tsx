'use client';

import { useEffect, useState } from 'react';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { Typography } from '@/feature/shared/ui/Typography';
import Image from 'next/image';
import clsx from 'clsx';
import { ProductBase } from '@/types/product';
import { getProducts } from '@/lib/api';

type EmptyPageProps = {
  query?: string;
  type: 'no-query' | 'no-results' | 'empty-cart' | 'not-found';
};

export const EmptyPage = ({ type, query }: EmptyPageProps) => {
  const [recommendations, setRecommendations] = useState<ProductBase[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await getProducts(); // misal return ProductDetail[]
        const mapped: ProductBase[] = res.map((product) => ({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          rating: {
            rate: product.rating?.rate ?? 0,
            count: product.rating?.count ?? 0,
          },
        }));

        setRecommendations(mapped);
      } catch (error) {
        console.error('Failed to fetch recommended products:', error);
      }
    };

    if (type === 'no-query' || type === 'no-results' || type === 'empty-cart') {
      fetchRecommendations();
    }
  }, [type]);

  const renderContent = () => {
    if (type === 'no-query') {
      return (
        <>
          <Typography as='h1' size='xl' color='primary' weight='semibold'>
            No keywords yet
          </Typography>
          <Typography>Type something to explore products</Typography>
        </>
      );
    }

    if (type === 'no-results') {
      return (
        <>
          <Typography as='h1' size='xl' color='primary' weight='semibold'>
            No results found for &quot;{query}&quot;
          </Typography>
          <Typography>Try another keywords or check your spelling</Typography>
        </>
      );
    }

    if (type === 'empty-cart') {
      return (
        <>
          <Typography as='h1' size='xl' color='primary' weight='semibold'>
            Your Cart is Empty
          </Typography>
          <Typography>Browse products and add them to your cart</Typography>
        </>
      );
    }

    return (
      <>
        <Typography as='h1' size='xl' color='primary' weight='semibold'>
          404
        </Typography>
        <Typography>Page not found</Typography>
      </>
    );
  };

  return (
    <>
      <div
        className={clsx(
          'flex flex-col items-center justify-center bg-white px-4',
          type === 'no-query' || type === 'no-results' || type === 'empty-cart'
            ? 'min-h-[75vh]'
            : 'min-h-screen'
        )}
      >
        <Image
          src='/images/search/empty.svg'
          alt='Empty'
          width={130}
          height={130}
          className='mx-auto size-50 md:size-60 object-cover'
        />
        <div className='flex flex-col items-center gap-1 text-center'>
          {renderContent()}
        </div>
      </div>

      {recommendations.length > 0 && (
        <ProductListSection
          title='Recommendation Products'
          products={recommendations}
        />
      )}
    </>
  );
};
