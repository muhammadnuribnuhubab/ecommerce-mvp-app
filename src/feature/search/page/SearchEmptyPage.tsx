import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { Typography } from '@/feature/shared/ui/Typography';
import Image from 'next/image';
import clsx from 'clsx';
import { mockData } from '@/constants/mockData';

type SearchEmptyPageProps = {
  query?: string;
  type: 'no-query' | 'no-results' | 'not-found';
};

export const SearchEmptyPage = ({ type, query }: SearchEmptyPageProps) => {
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
          type === 'no-query' || type === 'no-results'
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

      {(type === 'no-query' || type === 'no-results') && (
        <div className='pt-4 border-t border-neutral-300'>
          <ProductListSection
            title='Recommendation Products'
            products={allProducts}
          />
        </div>
      )}
    </>
  );
};
