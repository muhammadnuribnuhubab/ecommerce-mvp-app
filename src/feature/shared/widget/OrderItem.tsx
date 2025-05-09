// app/components/cart/widget/OrderItem.tsx
'use client';

import Image from 'next/image';
import { TrashIcon } from '@/feature/shared/ui/Icon';
import { Typography } from '@/feature/shared/ui/Typography';
import { Checkbox } from '@/feature/shared/ui/Checkbox';
import { QuantityControl } from './QuantityControl';

type OrderItemProps = {
  imageUrl: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  isSelected?: boolean;
  onSelect?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
  mode: 'cart' | 'checkout';
};

export const OrderItem = ({
  imageUrl,
  name,
  category,
  price,
  quantity,
  isSelected = false,
  onSelect,
  onIncrement,
  onDecrement,
  onRemove,
  mode,
}: OrderItemProps) => {
  const isCart = mode === 'cart';

  return (
    <div
      className={`w-full flex items-start gap-4 border-b border-neutral-300 py-4 ${
        isCart ? 'cursor-pointer' : ''
      }`}
      onClick={isCart && onSelect ? onSelect : undefined}
    >
      {isCart && onSelect && (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={isSelected} onChange={onSelect} name='' />
        </div>
      )}

      <div className='flex flex-col w-full gap-2'>
        <div className='flex gap-4'>
          {/* Gambar */}
          <div className='relative w-20 h-20 bg-gray-900 rounded overflow-hidden'>
            <Image src={imageUrl} alt={name} fill className='object-cover' />
          </div>

          {/* Info */}
          <div className='flex flex-col'>
            <Typography weight='semibold'>{name}</Typography>
            <Typography color='secondary' size='sm'>
              {category}
            </Typography>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-end'>
        <Typography weight='bold'>
          {isCart
            ? `$${price.toLocaleString()}`
            : `$${price.toLocaleString()}X${quantity}`}
        </Typography>
        {isCart && (
          <div
            className='flex items-center gap-4'
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onRemove}>
              <TrashIcon />
            </button>

            <QuantityControl
              quantity={quantity}
              onIncrement={onIncrement!}
              onDecrement={onDecrement!}
              onChange={() => {}}
              min={1}
              max={99}
            />
          </div>
        )}
      </div>
    </div>
  );
};
