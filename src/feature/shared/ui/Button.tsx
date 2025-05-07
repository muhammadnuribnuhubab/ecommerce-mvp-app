// src/features/shared/ui/Button.tsx

import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const buttonStyles = cva(
  'flex justify-center items-center gap-1 md:gap-2 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base cursor-pointer transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-300 hover:bg-primary-400 text-white',
        secondary:
          'bg-white hover:bg-neutral-300 border border-neutral-300 text-neutral-950',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      fullWidth: true,
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  variant,
  fullWidth,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(buttonStyles({ variant, fullWidth }), className)}
    >
      {children}
    </button>
  );
};
