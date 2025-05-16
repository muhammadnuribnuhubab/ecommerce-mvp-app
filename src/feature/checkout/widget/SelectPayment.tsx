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
  onClose: () => void;
  onPay: () => void;
};

export const SelectPayment = ({
  totalPrice,
  onClose,
  onPay,
}: SelectPaymentProps) => {
  const [selectedBankIndex, setSelectedBankIndex] = useState<number | null>(
    null
  );

  // Menyertakan daftar bank di dalam komponen
  const banks: Bank[] = [
    { name: 'PayPal', imageUrl: '/images/checkout/payment/paypal.svg' },
    { name: 'Card', imageUrl: '/images/checkout/payment/mastercard.svg' },
    { name: 'Google Pay', imageUrl: '/images/checkout/payment/googlepay.svg' },
    { name: 'Apple Pay', imageUrl: '/images/checkout/payment/applepay.svg' },
  ];

  const handleBankSelect = (index: number) => {
    setSelectedBankIndex(index);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-999 bg-opacity-50 px-4'>
      <div className='relative bg-white w-full max-w-lg rounded-xl p-6'>
        <div className='flex justify-between items-center'>
          <CloseAction title='Select Payment' onClose={onClose} />
        </div>

        <div className='mt-4'>
          {banks.map((bank, index) => (
            <div
              key={index}
              className='flex justify-between items-center mt-4 cursor-pointer'
              onClick={() => handleBankSelect(index)} // Pilih bank saat diklik
            >
              <div className='flex items-center gap-4'>
                <div className='relative size-10 sm:size-15 rounded-md bg-neutral-200 p-2 flex items-center justify-center'>
                  <Image
                    src={bank.imageUrl}
                    alt={bank.name}
                    width={40}
                    height={40}
                    layout='intrinsic'
                    objectFit='contain'
                  />
                </div>

                <Typography>{bank.name}</Typography>
              </div>
              <Radio
                name='bank'
                checked={selectedBankIndex === index}
                onChange={() => setSelectedBankIndex(index)} // Radio button terpilih saat klik
              />
            </div>
          ))}
        </div>

        <div className='flex justify-between items-center mt-6 pt-4 border-t border-neutral-300'>
          <Typography>Total</Typography>
          <Typography weight='bold'>${totalPrice.toLocaleString()}</Typography>
        </div>

        <div className='flex justify-end mt-6'>
          <Button
            variant='primary'
            onClick={onPay}
            disabled={selectedBankIndex === null} // Menonaktifkan tombol Pay jika belum memilih bank
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};
