// src/feature/shared/widget/CloseAction.tsx

import clsx from 'clsx';
import { Typography } from '../ui/Typography';
import { CloseIcon } from '../ui/Icon';

type CloseActionProps = {
  title: string;
  onClose: () => void;
  className?: string;
};

export const CloseAction = ({
  title,
  onClose,
  className = '',
}: CloseActionProps) => {
  return (
    <div className='flex items-center justify-between w-full'>
      <Typography size='xl' weight='bold'>
        {title}
      </Typography>
      <button onClick={onClose} aria-label='Close' className='cursor-pointer'>
        <CloseIcon className={clsx('text-neutral-950', className)} />
      </button>
    </div>
  );
};
