// src/feature/checkout/widget/StatusPayment.tsx

'use client';

import { CloseAction } from '@/feature/shared/widget/CloseAction';
import { Typography } from '@/feature/shared/ui/Typography';
import { Button } from '@/feature/shared/ui/Button';
import Image from 'next/image';

type Status = 'success' | 'failed';

type StatusPaymentProps = {
  status: Status;
  onClose: () => void;
  onBackHome: () => void;
};

export const StatusPayment = ({
  status,
  onClose,
  onBackHome,
}: StatusPaymentProps) => {
  const isSuccess = status === 'success';

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-999'>
      <div className='bg-white w-[400px] p-6 rounded-xl text-center'>
        <div className='flex justify-between items-center'>
          <CloseAction title='Payment Status' onClose={onClose} />
        </div>

        <div className='flex justify-center mt-4'>
          <div className='relative size-24'>
            <Image
              src={
                isSuccess
                  ? '/images/checkout/success.svg'
                  : '/images/checkout/failed.svg'
              }
              alt={isSuccess ? 'Success' : 'Failed'}
              fill
              className='object-contain'
            />
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <Typography size='lg' weight='bold' className='mt-4'>
            {isSuccess ? 'Payment Successful' : 'Payment Failed'}
          </Typography>

          <Typography>
            {isSuccess
              ? 'Thank you for shopping at our store'
              : 'There was an issue with your payment. Please try again'}
          </Typography>
        </div>

        <div className='mt-6'>
          <Button variant='primary' onClick={onBackHome}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
