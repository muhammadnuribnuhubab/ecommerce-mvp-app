// src/feature/shared/widget/CartButton.tsx

'use client';

import clsx from 'clsx';
import { Button } from '../ui/Button';
import { CartIcon } from '../ui/Icon';
import Link from 'next/link';

type CartButtonProps = {
  count?: number;
  onClick?: () => void;
  className?: string;
};

export const CartButton = ({
  count = 0,
  onClick,
  className,
}: CartButtonProps) => {
  return (
    <div className={clsx('relative', className)}>
      <Link href='/cart'>
        <Button
          variant='secondary'
          fullWidth={false}
          aria-label='Cart'
          onClick={onClick}
        >
          <CartIcon />
        </Button>
        {count > 0 && (
          <span className='absolute top-[-4px] right-[-4px] flex items-center justify-center rounded-full bg-primary-300 text-xs font-bold text-white h-5 min-w-[20px] px-1.5'>
            {count}
          </span>
        )}
      </Link>
    </div>
  );
};
