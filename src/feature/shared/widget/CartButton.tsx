'use client';

import clsx from 'clsx';
import { Button } from '../ui/Button';
import { CartIcon } from '../ui/Icon';
import Link from 'next/link';
import { useSession } from '@supabase/auth-helpers-react'; // ✅ Tambahkan ini

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
  const session = useSession(); // ✅ Cek status login

  const showCount = session ? count : 0; // ✅ Jika belum login, count = 0

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
        {showCount > 0 && (
          <span className='absolute top-[-4px] right-[-4px] flex items-center justify-center rounded-full bg-primary-300 text-xs font-bold text-white h-5 min-w-[20px] px-1.5'>
            {showCount}
          </span>
        )}
      </Link>
    </div>
  );
};
