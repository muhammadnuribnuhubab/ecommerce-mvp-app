// src/feature/shared/ui/Typography.tsx

import clsx from 'clsx';
import { cva } from 'class-variance-authority';
import { JSX } from 'react';

const typographyStyles = cva('tracking-normal', {
  variants: {
    size: {
      sm: 'text-sm md:text-base',
      base: 'text-base md:text-lg',
      lg: 'text-lg md:text-xl',
      xl: 'text-xl md:text-2xl',
      '2xl': 'text-2xl md:text-3xl',
      '3xl': 'text-3xl md:text-4xl',
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

export const Typography: React.FC<TypographyProps> = ({
  as = 'span',
  className,
  children,
  size = 'base',
  weight = 'normal',
  color = 'primary',
}) => {
  const classNames = clsx(typographyStyles({ size, weight, color }), className);

  const Component = as;

  return <Component className={classNames}>{children}</Component>;
};
