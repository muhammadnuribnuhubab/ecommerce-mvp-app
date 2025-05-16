'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/feature/shared/ui/Button';
import { Typography } from '@/feature/shared/ui/Typography';

export default function VerifyPage() {
  const params = useSearchParams();

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    const errorCode = params.get('error_code');
    const errorDescription = params.get('error_description');

    if (errorCode === 'otp_expired') {
      setMessage('Verification link has expired. Please register again.');
      setStatus('error');
      return;
    }

    if (errorCode) {
      setMessage(errorDescription || 'Invalid verification link.');
      setStatus('error');
      return;
    }

    // Jika tidak ada error dari URL, anggap sukses
    setMessage('Verification successful. Welcome to commercéll!');
    setStatus('success');
  }, [params]);

  return (
    <div className='flex flex-col items-center justify-center h-screen px-4'>
      {status === 'loading' && (
        <Typography>Verifying your account, please wait…</Typography>
      )}

      {status === 'success' && (
        <div className='text-center space-y-4 flex flex-col'>
          <Typography size='2xl' weight='bold'>
            Success
          </Typography>
          <Typography>{message}</Typography>
          <Button onClick={() => (window.location.href = '/')} className='mt-2'>
            Home
          </Button>
        </div>
      )}

      {status === 'error' && (
        <div className='text-center space-y-4 flex flex-col'>
          <Typography size='2xl' weight='bold'>
            Failed
          </Typography>
          <Typography>{message}</Typography>
          <Button onClick={() => (window.location.href = '/')} className='mt-2'>
            Home
          </Button>
        </div>
      )}
    </div>
  );
}
