'use client';

import React, { useState } from 'react';
import { Button } from '@/feature/shared/ui/Button';
import { Checkbox } from '@/feature/shared/ui/Checkbox';
import { TrashIcon } from '@/feature/shared/ui/Icon';
import { Typography } from '@/feature/shared/ui/Typography';
import { OrderItem } from '@/feature/shared/widget/OrderItem';
import { CartItem } from '@/types/cart';
import { ConfirmDialog } from '@/feature/shared/widget/ConfirmDialog';

type CartItemsSectionProps = {
  isLoading?: boolean;
  isAllSelected: boolean;
  isAnySelected: boolean;
  toggleSelectAll: () => void;
  removeSelectedFromCart: () => void;
  cartItems: CartItem[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
  onSelect: (id: number) => void;
  onChangeQuantity: (id: number, quantity: number) => void;
};

export const CartItemsSection = ({
  isLoading = false,
  isAllSelected,
  isAnySelected,
  toggleSelectAll,
  removeSelectedFromCart,
  cartItems,
  onIncrement,
  onDecrement,
  onRemove,
  onSelect,
  onChangeQuantity,
}: CartItemsSectionProps) => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDelete = () => {
    removeSelectedFromCart();
    setConfirmOpen(false);
  };

  return (
    <div className='flex flex-col lg:w-3/5 border-3 rounded-2xl p-4 border-neutral-300 h-fit'>
      <div className='flex items-center justify-between mb-4'>
        {isLoading ? (
          <div className='h-6 w-32 bg-neutral-300 rounded animate-pulse' />
        ) : (
          <Typography as='h1' size='xl' weight='bold'>
            Shopping Cart
          </Typography>
        )}

        <div className='flex items-center gap-2'>
          <Button
            variant='secondary'
            fullWidth={false}
            onClick={() => setConfirmOpen(true)}
            disabled={!isAnySelected || isLoading}
            className='!p-2.5 sm:!p-2'
          >
            <TrashIcon className='text-black' />
          </Button>
          <Button
            variant='secondary'
            fullWidth={false}
            onClick={toggleSelectAll}
            disabled={isLoading}
            className='sm:!min-h-[42px] sm:!min-w-[42px] !p-2.5 sm:!p-2'
          >
            <Checkbox checked={isAllSelected} onChange={toggleSelectAll} />
          </Button>
        </div>
      </div>

      {isLoading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className='flex gap-4 py-4 animate-pulse border-b border-neutral-200 last:border-b-0'
            >
              <div className='w-20 h-20 bg-neutral-300 rounded-md' />
              <div className='flex-1 space-y-2'>
                <div className='h-4 bg-neutral-300 rounded w-3/4' />
                <div className='h-3 bg-neutral-200 rounded w-1/2' />
                <div className='h-4 bg-neutral-300 rounded w-1/3 sm:hidden' />
              </div>
            </div>
          ))
        : cartItems.map((item) => (
            <OrderItem
              key={item.cartItemUuid}
              {...item}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
              onSelect={onSelect}
              onChangeQuantity={onChangeQuantity}
              mode='cart'
            />
          ))}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title='Remove All Item'
        message='Are you sure you want to remove all item from your cart?'
        confirmText='Delete'
        cancelText='Cancel'
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};
