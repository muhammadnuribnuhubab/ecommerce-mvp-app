'use client';

import { Typography } from '@/feature/shared/ui/Typography';
import { Button } from '@/feature/shared/ui/Button';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

type Item = {
  title: string;
  quantity: number;
  price: number;
};

type TotalShoppingProps = {
  totalPrice: number;
  mode?: 'cart' | 'checkout';
  onCheckout?: () => void;
  items?: Item[];
  className?: string;
  disabled?: boolean;
};

export const TotalShopping = ({
  totalPrice,
  onCheckout,
  mode,
  items = [],
  className,
  disabled = false,
}: TotalShoppingProps) => {
  const isCheckout = mode === 'checkout';
  const router = useRouter();

  const handleClick = () => {
    if (isCheckout) {
      onCheckout?.(); // bisa lanjut ke pembayaran
    } else {
      router.push('/checkout'); // ⬅️ arahkan ke halaman checkout
    }
  };

  return (
    <div
      className={clsx(
        'py-4 flex flex-col gap-4 border-3 rounded-2xl p-4 border-neutral-300 h-fit',
        mode === 'cart' && 'lg:w-2/5',
        className
      )}
    >
      <Typography as='h1' size='xl' weight='bold'>
        Total Shopping
      </Typography>

      {items.length > 0 && (
        <div className='flex flex-col gap-2'>
          {items.map((item, index) => (
            <div key={index} className='flex justify-between gap-6 text-sm'>
              <Typography>
                {item.title} (${item.price} × {item.quantity})
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

      <Button
        variant='primary'
        onClick={handleClick}
        disabled={items.length === 0 || disabled}
        className='mt-4'
      >
        {isCheckout ? 'Select Payment Method' : 'Checkout'}
      </Button>
    </div>
  );
};
