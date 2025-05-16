'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Typography } from '../ui/Typography';
import { Rating } from './Rating';

type ProductCardProps = {
  image: string;
  title: string;
  price: number;
  rating: number;
};

export const ProductCard = ({
  image,
  title,
  price,
  rating = 0,
}: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-2xl  transition-shadow duration-300">
      {/* FIXED HEIGHT wrapper */}
      <div className="relative w-full h-64 bg-white">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
        )}
        <Image
          src={image}
          alt={title}
          fill
          className={`
            object-contain transition-opacity duration-500
            ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={() => setIsImageLoaded(true)}
          unoptimized
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-2">
        <Typography className="truncate">{title}</Typography>
        <Typography weight="bold">${price}</Typography>
        <Rating value={rating} />
      </div>
    </div>
  );
};
