import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { Typography } from '@/feature/shared/ui/Typography';
import Image from 'next/image';
import clsx from 'clsx';
import { mockData } from '@/constants/mockData';

type EmptyPageProps = {
  query?: string;
  type: 'no-query' | 'no-results' | 'empty-cart' | 'not-found';
};

export const EmptyPage = ({ type, query }: EmptyPageProps) => {
  const allProducts = Object.values(mockData).flat();

  const renderContent = () => {
    if (type === 'no-query') {
      return (
        <div className='flex flex-col items-center gap-1 text-center'>
          <Typography as='h1' size='xl' color='primary' weight='semibold'>
            No keywords yet
          </Typography>
          <Typography>Type something to explore products</Typography>
        </div>
      );
    }

    if (type === 'no-results') {
      return (
        <div className='flex flex-col items-center gap-1 text-center'>
          <Typography as='h1' size='xl' color='primary' weight='semibold'>
            No results found for &quot;{query}&quot;
          </Typography>
          <Typography>Try another keywords or check your spelling</Typography>
        </div>
      );
    }

    if (type === 'empty-cart') {
      return (
        <div className='flex flex-col items-center gap-1 text-center'>
          <Typography as='h1' size='xl' color='primary' weight='semibold'>
            Your Cart is Empty
          </Typography>
          <Typography>Browse products and add them to your cart</Typography>
        </div>
      );
    }

    return (
      <div className='flex flex-col items-center gap-1 text-center'>
        <Typography as='h1' size='xl' color='primary' weight='semibold'>
          404
        </Typography>
        <Typography>Page not found</Typography>
      </div>
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
        <div className='flex flex-col items-center gap-1'>
          {renderContent()}
        </div>
      </div>

      {(type === 'no-query' || type === 'no-results' || type === 'empty-cart') && (
          <ProductListSection
            title='Recommendation Products'
            products={allProducts}
          />
      )}
    </>
  );
};
