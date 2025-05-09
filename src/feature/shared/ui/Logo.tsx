// src/feature/shared/ui/Logo.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Typography } from './Typography';

export const Logo = () => {
  const router = useRouter();
  const [isPulsing, setIsPulsing] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsPulsing(true);
    sessionStorage.setItem('fromInternalNavigation', 'true');

    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <div className='flex items-center gap-1 sm:gap-2'>
      <Link
        href='/'
        onClick={handleClick}
        className={clsx(
          'flex items-center gap-1 sm:gap-2',
          isPulsing && 'animate-pulse'
        )}
        aria-label='Go to Home page'
      >
        <Image
          src='/images/shared/logo.svg'
          alt='Logo'
          className={clsx(
            'min-h-[35px] min-w-[35px] sm:size-14 transition-all duration-500',
            isPulsing && 'animate-pulse'
          )}
          width={0}
          height={0}
          priority
        />

        <Typography
          as='span'
          size='2xl'
          weight='bold'
          className='hidden xl:inline'
        >
          commercéll
        </Typography>
      </Link>
    </div>
  );
};
