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
        'flex gap-2 w-full py-2 pb-2 bg-white rounded-lg transition-colors hover:underline cursor-pointer',
        className
      )}
    >
      <Typography>{label}</Typography>
    </button>
  );
};
