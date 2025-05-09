// src/feature/shared/ui/CategoryDropdownHeaderItem.tsx

import clsx from 'clsx';
import { Typography } from '../ui/Typography';

type CategoryDropdownHeaderItemProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

export const CategoryDropdownHeaderItem = ({
  label,
  onClick,
  className,
}: CategoryDropdownHeaderItemProps) => {
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
