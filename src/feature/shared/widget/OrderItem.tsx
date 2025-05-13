'use client';

import Image from 'next/image';
import { TrashIcon } from '@/feature/shared/ui/Icon';
import { Typography } from '@/feature/shared/ui/Typography';
import { Checkbox } from '@/feature/shared/ui/Checkbox';
import { QuantityControl } from './QuantityControl';
import { CartItem } from '@/types/cart';
import { useRouter } from 'next/navigation';

type OrderItemProps = CartItem & {
  mode: 'cart' | 'checkout';
  onSelect: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void; // ✅ Tambahan
};

export const OrderItem = ({
  id,
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
  onChangeQuantity, // ✅ Tambahan
  mode,
}: OrderItemProps) => {
  const isCart = mode === 'cart';
  const router = useRouter();

  const handleItemClick = () => {
    if (!isCart) return;
    router.push(`/detail/${id}`);
  };

  return (
    <div className='w-full flex items-start gap-4 py-4 flex-col sm:flex-row justify-between'>
      {isCart && (
        <div
          className='hidden sm:inline-block'
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Checkbox
            checked={isSelected}
            onChange={() => {
              onSelect(id);
            }}
            name=''
          />
        </div>
      )}

      <div
        className='flex justify-between w-full gap-2 cursor-pointer'
        onClick={handleItemClick}
      >
        <div className='flex gap-4'>
          <div className='relative w-20 h-20 bg-gray-900 rounded overflow-hidden'>
            <Image src={imageUrl} alt={name} fill className='object-cover' />
          </div>
          <div className='flex flex-col'>
            <Typography weight='semibold'>{name}</Typography>
            <Typography color='secondary' size='sm'>
              {category}
            </Typography>
            <Typography weight='bold' className='sm:hidden'>
              {isCart
                ? `$${price.toLocaleString()}`
                : `$${price.toLocaleString()} x${quantity}`}
            </Typography>
          </div>
        </div>
        {isCart && (
          <div
            className='sm:hidden'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Checkbox
              checked={isSelected}
              onChange={() => {
                onSelect(id);
              }}
              name=''
            />
          </div>
        )}
      </div>

      <div className='flex flex-col gap-2 items-end'>
        <Typography weight='bold' className='hidden sm:inline-block'>
          {isCart
            ? `$${price.toLocaleString()}`
            : `$${price.toLocaleString()} x${quantity}`}
        </Typography>
        {isCart && (
          <div
            onClick={() => onSelect(id)}
            className='flex items-center gap-4 flex-row-reverse sm:flex-row'
          >
            <div
              onClick={() => onRemove(id)}
              className='cursor-pointer !rounded-xl !p-2.5 sm:!p-2'
            >
              <TrashIcon />
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <QuantityControl
                quantity={quantity}
                onIncrement={() => onIncrement(id)}
                onDecrement={() => onDecrement(id)}
                onChange={(value) => onChangeQuantity(id, value)} // ✅ Perbaikan utama
                min={1}
                max={99}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
