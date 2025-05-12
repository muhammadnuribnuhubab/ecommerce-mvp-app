'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Typography } from './Typography';

export const Logo = () => {
  return (
    <div className='flex items-center gap-1 sm:gap-2'>
      <Link
        href='/'
        aria-label='Go to Home page'
        className='flex items-center gap-1 sm:gap-2'
      >
        <Image
          src='/images/shared/logo.svg'
          alt='Logo'
          className='min-h-[35px] min-w-[35px] sm:size-14 transition-all duration-500'
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
