// src/feature/shared/widget/AuthButton.tsx

'use client';

import { Button } from '../ui/Button';

export const AuthButton = () => {
  return (
    <>
      <Button className='lg:hidden' variant='secondary'>
        Login
      </Button>
      <Button className='lg:hidden'>Register</Button>

      <Button className='hidden lg:inline-flex !w-[144px]' variant='secondary'>
        Login
      </Button>
      <Button className='hidden lg:inline-flex !w-[144px]'>Register</Button>
    </>
  );
};
