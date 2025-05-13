// app/components/cart/widget/TotalShopping.tsx
'use client';

import { Typography } from '@/feature/shared/ui/Typography';
import { Button } from '@/feature/shared/ui/Button';
import clsx from 'clsx';

type Item = {
  name: string;
  quantity: number;
  price: number;
};

type TotalShoppingProps = {
  totalPrice: number;
  mode?: 'cart' | 'checkout';
  onCheckout?: () => void;
  items?: Item[];
  className?: string;
};

export const TotalShopping = ({
  totalPrice,
  onCheckout,
  mode,
  items = [],
  className,
}: TotalShoppingProps) => {
  const isCheckout = mode === 'checkout';

  return (
    <div className={clsx('lg:w-2/5 py-4  border-t flex flex-col gap-4 border-3 rounded-2xl p-4 border-neutral-300 h-fit', className)}>
      <Typography as='h1' size='lg' weight='bold'>
        Total Shopping
      </Typography>

      {items.length > 0 && (
        <div className='flex flex-col gap-2'>
          {items.map((item, index) => (
            <div key={index} className='flex justify-between text-sm'>
              <Typography>
                {item.name} × {item.quantity}
              </Typography>
              <Typography weight='semibold'>
                ${Number(item.price * item.quantity).toLocaleString()}
              </Typography>
            </div>
          ))}
        </div>
      )}

      <div className='flex justify-between items-center pt-2 border-t border-neutral-300'>
        <Typography>Total</Typography>
        <Typography weight='bold'>${totalPrice.toLocaleString()}</Typography>
      </div>

      <Button variant='primary' onClick={onCheckout}>
        {isCheckout ? 'Select Payment Method' : 'Checkout'}
      </Button>
    </div>
  );
};
