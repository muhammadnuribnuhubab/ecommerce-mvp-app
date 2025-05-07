'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
import Link from 'next/link';
import { Typography } from './Typography';

type LogoProps = {
  hideText?: boolean;
};

export const Logo: React.FC<LogoProps> = () => {
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
    <div className='flex items-center gap-1 md:gap-2'>
      <Link
        href='/'
        onClick={handleClick}
        className={clsx(
          'flex items-center gap-1 md:gap-2',
          isPulsing && 'animate-pulse'
        )}
        aria-label='Go to Home page'
      >
        <Image
          src='/images/shared/logo.svg'
          alt='Logo'
          className={clsx(
            'transition-all duration-500',
            'w-[29.1847px] h-[32px] sm:w-[38.3049px] sm:h-[42px]',
            isPulsing && 'animate-pulse'
          )}
          width={0}
          height={0}
          priority
        />

        <Typography
          as='span'
          size='base'
          weight='bold'
          className='hidden sm:inline'
        >
          commercéll
        </Typography>
      </Link>
    </div>
  );
};
