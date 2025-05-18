'use client';

import Image from 'next/image';
import { TrashIcon } from '@/feature/shared/ui/Icon';
import { Typography } from '@/feature/shared/ui/Typography';
import { Checkbox } from '@/feature/shared/ui/Checkbox';
import { QuantityControl } from './QuantityControl';
import { CartItem } from '@/types/cart';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { toTitleCase } from '@/utils/toTitleCase';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';

type OrderItemProps = CartItem & {
  mode: 'cart' | 'checkout';
  onSelect?: (id: number) => void;
  onIncrement?: (id: number) => void;
  onDecrement?: (id: number) => void;
  onRemove?: (id: number) => void;
  onChangeQuantity?: (id: number, quantity: number) => void;
};

export const OrderItem = ({
  id,
  image,
  title,
  category,
  price,
  quantity,
  isSelected = false,
  onSelect,
  onIncrement,
  onDecrement,
  onRemove,
  onChangeQuantity,
  mode,
}: OrderItemProps) => {
  const isCart = mode === 'cart';
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleItemClick = () => {
    if (!isCart) return;
    if (!id || typeof id !== 'number') {
      console.error('Invalid product ID:', id);
      return;
    }
    router.push(`/detail/${id}`);
  };

  return (
    <>
      <div
        className={clsx(
          'w-full flex items-start py-4 flex-col sm:flex-row justify-between',
          isCart && 'gap-4'
        )}
      >
        {isCart && (
          <div
            className='hidden sm:inline-block'
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={isSelected}
              onChange={() => onSelect?.(id)}
              name=''
            />
          </div>
        )}

        <div
          className='flex justify-between w-full gap-2 cursor-pointer'
          onClick={handleItemClick}
        >
          <div className='flex gap-4 w-full'>
            <div className='relative w-full max-w-20 h-20 rounded overflow-hidden bg-white'>
              <Image src={image} alt={title} fill className='object-contain' />
            </div>
            <div className='flex flex-col'>
              <Typography weight='semibold'>
                {isCart ? `${title}` : `${title} (${quantity})`}
              </Typography>
              <Typography color='secondary' size='sm'>
                {toTitleCase(category)}
              </Typography>
              <Typography weight='bold' className='sm:hidden'>
                ${price.toLocaleString()}
              </Typography>
            </div>
          </div>
          {isCart && (
            <div className='sm:hidden ' onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={isSelected}
                onChange={() => onSelect?.(id)}
                name=''
              />
            </div>
          )}
        </div>

        <div className='flex flex-col gap-2 items-end text-end'>
          <Typography weight='bold' className='hidden sm:inline-block'>
            ${price.toLocaleString()}
          </Typography>
          {isCart && (
            <div
              onClick={() => onSelect?.(id)}
              className='flex items-center gap-4 flex-row-reverse sm:flex-row'
            >
              {/* TrashIcon */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setDialogOpen(true);
                }}
                className='cursor-pointer !rounded-xl !p-2.5 sm:!p-2'
              >
                <TrashIcon />
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                <QuantityControl
                  quantity={quantity}
                  onIncrement={() => onIncrement?.(id)}
                  onDecrement={() => onDecrement?.(id)}
                  onChange={(value) => onChangeQuantity?.(id, value)}
                  min={1}
                  max={99}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ConfirmDialog dipindah ke luar struktur text-end */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onCancel={() => setDialogOpen(false)}
        onConfirm={() => {
          onRemove?.(id);
          setDialogOpen(false);
        }}
        title='Remove Item'
        message='Are you sure you want to remove this item from your cart?'
        confirmText='Delete'
        cancelText='Cancel'
      />
    </>
  );
};
