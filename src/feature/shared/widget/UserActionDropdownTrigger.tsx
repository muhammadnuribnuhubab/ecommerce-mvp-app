// src/feature/shared/widget/UserActionDropdownTrigger.tsx

import clsx from 'clsx';
import { PersonIcon, ChevronIcon } from '../ui/Icon';
import { Typography } from '../ui/Typography';

type UserActionDropdownTriggerProps = {
  name: string;
  isOpen?: boolean;
  className?: string;
};

export const UserActionDropdownTrigger = ({
  name,
  isOpen,
  className,
}: UserActionDropdownTriggerProps) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-2 w-full bg-white border border-neutral-300 p-4 rounded-full hover:bg-neutral-300 transition-colors cursor-pointer',
        className
      )}
    >
      <PersonIcon className='text-black' />
      <Typography>{name}</Typography>
      <ChevronIcon
        className={clsx(
          'text-neutral-950 transition-transform duration-200 ml-auto',
          isOpen ? 'rotate-0' : 'rotate-180'
        )}
      />
    </div>
  );
};
