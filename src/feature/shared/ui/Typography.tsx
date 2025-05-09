// src/feature/shared/ui/Typography.tsx

import { cva } from 'class-variance-authority';
import { JSX } from 'react';
import clsx from 'clsx';

const typographyStyles = cva('tracking-normal', {
  variants: {
    size: {
      sm: 'text-sm sm:text-base',
      base: 'text-base sm:text-lg',
      lg: 'text-lg sm:text-xl',
      xl: 'text-xl sm:text-2xl',
      '2xl': 'text-2xl sm:text-3xl',
      '3xl': 'text-3xl sm:text-4xl',
    },
    weight: {
      normal: 'font-normal',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      primary: 'text-neutral-950',
      secondary: 'text-neutral-500',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
  },
});

type TypographyProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary';
};

export const Typography = ({
  as = 'span',
  className = '',
  children,
  size = 'base',
  weight = 'normal',
  color = 'primary',
}: TypographyProps) => {
  const classNames = clsx(typographyStyles({ size, weight, color }), className);

  const Component = as;

  return <Component className={classNames}>{children}</Component>;
};
