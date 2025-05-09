// src/feature/shared/widget/ProductCard.tsx

import Image from 'next/image';
import { Typography } from '../ui/Typography';
import { Rating } from './Rating';

type ProductCardProps = {
  imageUrl: string;
  title: string;
  price: string;
  rating?: number;
};

export const ProductCard = ({
  imageUrl,
  title,
  price,
  rating = 0,
}: ProductCardProps) => {
  return (
    <div className='w-full max-w-[250px] min-w-[200px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'>
      <div className='relative w-full aspect-[173/173] md:aspect-[265/265] overflow-hidden bg-amber-200'>
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={450}
          className='w-full h-auto object-cover'
          sizes='(max-width: 1024px) 100vw, 1024px'
          unoptimized
        />
      </div>
      <div className='p-3 sm:p-4 flex flex-col gap-2'>
        <Typography className='truncate'>{title}</Typography>
        <Typography weight='bold'>{price}</Typography>
        <Rating value={rating} />
      </div>
    </div>
  );
};
