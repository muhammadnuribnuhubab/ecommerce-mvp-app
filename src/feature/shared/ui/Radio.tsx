// src/feature/shared/ui/Radio.tsx
'use client';

import { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type RadioProps = ComponentPropsWithoutRef<'input'>;

export const Radio = ({ className, ...props }: RadioProps) => {
  return (
    <input
      type='radio'
      className={clsx(
        'appearance-none w-4 h-4 rounded-full border border-gray-300 cursor-pointer',
        'checked:border-neutral-300 checked:bg-primary-300 relative',
        className
      )}
      style={{
        backgroundImage:
          'radial-gradient(circle, theme(colors.primary.300) 50%, transparent 51%)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
      {...props}
    />
  );
};
