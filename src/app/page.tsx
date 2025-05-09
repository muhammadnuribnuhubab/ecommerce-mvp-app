'use client';

import { SelectPayment } from '@/feature/checkout/widget/SelectPayment';
import { StatusPayment } from '@/feature/checkout/widget/StatusPayment';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [status, setStatus] = useState<'success' | 'failed'>('failed');

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleBackHome = () => {
    // Misalnya redirect ke homepage
    window.location.href = '/';
  };
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-4 bg-[#eaeaea]'>
      {isOpen && (
        <StatusPayment
          status={status}
          onClose={handleClose}
          onBackHome={handleBackHome}
        />
      )}
    </div>
  );
}
