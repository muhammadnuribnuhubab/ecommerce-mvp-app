'use client';

import { Button } from '@/feature/shared/ui/Button';
import { CloseAction } from '@/feature/shared/widget/CloseAction';
import { useState } from 'react';
import { InputField } from '../ui/InputField';

type AuthModalProps = {
  mode: 'login' | 'register';
  onClose: () => void;
};

export const AuthModal = ({ mode, onClose }: AuthModalProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isRegister = mode === 'register';

  return (
    <div className='fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4'>
      <div className='relative bg-white w-full max-w-lg rounded-xl p-6'>
        <CloseAction
          title={isRegister ? 'Register' : 'Login'}
          onClose={onClose}
        />

        <form className='pt-4 space-y-4'>
          {isRegister && (
            <InputField
              label='Name'
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='Enter your name'
              required
            />
          )}

          <InputField
            label='Email'
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder='Enter your email'
            required
          />

          <InputField
            label='Password'
            type='password'
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder='Enter your password'
            required
          />

          {isRegister && (
            <InputField
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm your password'
              required
            />
          )}

          <Button type='submit' className='w-full mt-8'>
            {isRegister ? 'Register' : 'Login'}
          </Button>

          <div className='text-sm text-center mt-4'>
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  type='button'
                  className='text-blue-600 hover:underline'
                  onClick={() => {
                    // TODO: replace with mode switch logic
                    alert('Switch to login');
                  }}
                >
                  Log in
                </button>
              </span>
            ) : (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type='button'
                  className='text-blue-600 hover:underline'
                  onClick={() => {
                    // TODO: replace with mode switch logic
                    alert('Switch to register');
                  }}
                >
                  Register
                </button>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
