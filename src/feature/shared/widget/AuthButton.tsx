// src/feature/shared/widget/AuthButton.tsx

'use client';

import { Button } from '../ui/Button';

type AuthButtonProps = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

export const AuthButton = ({
  onLoginClick,
  onRegisterClick,
}: AuthButtonProps) => {
  return (
    <>
      <Button className='lg:hidden' variant='secondary' onClick={onLoginClick}>
        Login
      </Button>
      <Button className='lg:hidden' onClick={onRegisterClick}>
        Register
      </Button>

      <Button
        className='hidden lg:inline-flex !w-[144px]'
        variant='secondary'
        onClick={onLoginClick}
      >
        Login
      </Button>
      <Button
        className='hidden lg:inline-flex !w-[144px]'
        onClick={onRegisterClick}
      >
        Register
      </Button>
    </>
  );
};
