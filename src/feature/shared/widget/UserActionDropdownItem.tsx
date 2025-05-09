// src/feature/shared/ui/UserActionDropdownItem.tsx

import clsx from 'clsx';
import { Typography } from '../ui/Typography';

type UserActionDropdownItemProps = {
  icon: React.ReactNode;
  labelAction: string;
  className?: string;
  onClick?: () => void;
};

export const UserActionDropdownItem = ({
  icon,
  labelAction,
  className,
  onClick,
}: UserActionDropdownItemProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2 bg-white p-4  hover:bg-neutral-300 transition-colors cursor-pointer',
        className
      )}
    >
      <span className='text-neutral-950'>{icon}</span>
      <Typography>{labelAction}</Typography>
    </button>
  );
};
