// app/feature/detail/section/ProductDetailSection.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Typography } from '../../shared/ui/Typography';
import { Rating } from '../../shared/widget/Rating';
import { Button } from '../../shared/ui/Button';
import { QuantityControl } from '@/feature/shared/widget/QuantityControl';

type ProductDetailSectionProps = {
  imageUrl: string;
  category: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
};

export const ProductDetailSection = ({
  imageUrl,
  category,
  name,
  price,
  rating,
  reviews,
  description,
}: ProductDetailSectionProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='flex flex-col sm:flex-row gap-6'>
      <div className='relative w-full sm:min-w-[300px] sm:max-h-[300px] md:min-w-[400px] md:min-h-[400px] md:max-w-[400px] md:max-h-[400px] aspect-square bg-gray-400'>
        <Image src={imageUrl} alt={name} fill className='object-cover' />
      </div>

      <div className='flex flex-col gap-4 w-full'>
        <div className='flex flex-col gap-1'>
          <Typography color='secondary'>{category}</Typography>
          <Typography as='h1' size='base' weight='semibold' className='block'>
            {name}
          </Typography>
          <Typography as='h2' size='xl' weight='bold'>
            $ {price.toLocaleString()}
          </Typography>
          <Typography className='flex items-center gap-1'>
            <Rating value={rating} /> ({reviews} reviews)
          </Typography>
        </div>

        <div className='flex flex-col gap-1 border-y border-neutral-300 py-4'>
          <Typography weight='semibold'>Description</Typography>
          <Typography>{description}</Typography>
        </div>

        <div className='flex flex-col gap-2'>
          <Typography weight='semibold'>Quantity</Typography>
          <QuantityControl
            quantity={quantity}
            onIncrement={() => setQuantity((q) => q + 1)}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            onChange={(val) => setQuantity(val)}
            min={1}
            max={99}
          />
        </div>

        <div className='flex flex-col sm:flex-row gap-2'>
          <Button variant='secondary' className='sm:w-1/2'>
            Add to Cart
          </Button>
          <Button className='sm:w-1/2'>Buy Now</Button>
        </div>
      </div>
    </div>
  );
};
