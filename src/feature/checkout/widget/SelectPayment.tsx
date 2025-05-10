// src/feature/checkout/widget/SelectPayment.tsx

'use client';

import { useState } from 'react';
import { Typography } from '@/feature/shared/ui/Typography';
import { Radio } from '@/feature/shared/ui/Radio';
import { Button } from '@/feature/shared/ui/Button';
import Image from 'next/image';
import { CloseAction } from '@/feature/shared/widget/CloseAction';

type Bank = {
  name: string;
  imageUrl: string;
};

type SelectPaymentProps = {
  totalPrice: number;
  banks: Bank[];
  onClose: () => void;
  onPay: () => void;
};

export const SelectPayment = ({
  totalPrice,
  banks,
  onClose,
  onPay,
}: SelectPaymentProps) => {
  const [selectedBankIndex, setSelectedBankIndex] = useState<number | null>(
    null
  );

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-999 bg-opacity-50'>
      <div className='relative bg-white w-full max-w-lg rounded-xl p-6'>
        <div className='flex justify-between items-center'>
          <CloseAction title='Select Payment' onClose={onClose} />
        </div>

        <div className='mt-4'>
          {banks.map((bank, index) => (
            <div key={index} className='flex justify-between items-center mt-4'>
              <div className='flex items-center'>
                <div className='relative size-10 sm:size-15 bg-black rounded-md'>
                  <Image
                    src={bank.imageUrl}
                    alt={bank.name}
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
                <Typography className='ml-2'>{bank.name}</Typography>
              </div>
              <Radio
                name='bank'
                checked={selectedBankIndex === index}
                onChange={() => setSelectedBankIndex(index)}
              />
            </div>
          ))}
        </div>

        <div className='flex justify-between items-center mt-4 pt-4 border-t border-neutral-300'>
          <Typography>Total Shopping</Typography>
          <Typography weight='bold'>${totalPrice.toLocaleString()}</Typography>
        </div>

        <div className='flex justify-end mt-6'>
          <Button variant='primary' onClick={onPay}>
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};
