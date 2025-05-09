// src/feature/shared/ui/CategoryDropdownItem.tsx

import clsx from 'clsx';
import { Typography } from '../ui/Typography';

type CategoryDropdownItemProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export const CategoryDropdownItem = ({
  label,
  onClick,
  className,
}: CategoryDropdownItemProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 w-full p-4 bg-white rounded-lg transition-colors hover:bg-neutral-300 cursor-pointer',
        className
      )}
    >
      <Typography>{label}</Typography>
    </button>
  );
};
