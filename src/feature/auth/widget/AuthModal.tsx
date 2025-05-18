'use client';

import { Button } from '@/feature/shared/ui/Button';
import { CloseAction } from '@/feature/shared/widget/CloseAction';
import { useState } from 'react';
import { InputField } from '../ui/InputField';
import { useAuthService } from '@/hooks/useAuthSevice';
import { Typography } from '@/feature/shared/ui/Typography';

// props untuk AuthModal
type AuthModalProps = {
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
};

export const AuthModal = ({ mode, onClose, onSwitchMode }: AuthModalProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'checkEmail'>('form');

  const isRegister = mode === 'register';
  const { register, login } = useAuthService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        // Hanya ambil error, user diabaikan karena tidak digunakan
        const { error } = await register(form.name, form.email, form.password);

        if (error) {
          if (
            error.message.includes(
              'duplicate key value violates unique constraint'
            ) &&
            error.message.includes('users_email_key')
          ) {
            setError(
              'Email is already registered. Please log in or use a different email.'
            );
            return;
          }
          setError(error.message);
          return;
        }

        setStep('checkEmail');
      } else {
        await login(form.email, form.password);
        onClose();
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Step 2: Tampilkan pesan cek email
  if (step === 'checkEmail') {
    if (error) {
      return null;
    }

    const isGmail = form.email.toLowerCase().endsWith('@gmail.com');

    return (
      <div className='fixed inset-0 z-999 bg-black/50 flex items-center justify-center px-4'>
        <div className='relative bg-white w-full max-w-md rounded-xl p-6 space-y-4'>
          <CloseAction title='Registration Success' onClose={onClose} />

          <Typography className='mt-4 text-left'>
            Thank you for signing up! Please <strong>check your email</strong> (
            <em>{form.email}</em>) to verify your account.
          </Typography>

          <div className='mt-6 space-y-3'>
            {isGmail ? (
              <a
                href='https://mail.google.com'
                target='_blank'
                rel='noopener noreferrer'
                className='flex justify-center items-center gap-1 sm:gap-2 py-3 sm:py-4 px-3 sm:px-4 rounded-full font-semibold text-sm sm:text-base cursor-pointer transition-colors bg-white hover:bg-neutral-300 border border-neutral-300 text-neutral-950'
              >
                Buka Gmail
              </a>
            ) : (
              <a
                href={`mailto:${form.email}`}
                className='flex justify-center items-center gap-1 sm:gap-2 py-3 sm:py-4 px-3 sm:px-4 rounded-full font-semibold text-sm sm:text-base cursor-pointer transition-colors bg-white hover:bg-neutral-300 border border-neutral-300 text-neutral-950'
              >
                Buka Email
              </a>
            )}

            <Button className='w-full' onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Form login/register
  return (
    <div className='fixed inset-0 z-999 bg-black/50 flex items-center justify-center px-4'>
      <div className='relative bg-white w-full max-w-lg rounded-xl p-6'>
        <CloseAction
          title={isRegister ? 'Register' : 'Login'}
          onClose={onClose}
        />

        <form className='pt-4 space-y-4' onSubmit={handleSubmit}>
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

          {error && <div className='text-red-600 text-sm'>{error}</div>}

          <Button type='submit' className='w-full mt-8'>
            {isRegister ? 'Register' : 'Login'}
          </Button>

          <div className='text-sm text-center mt-4'>
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  type='button'
                  className='text-blue-600 hover:underline cursor-pointer'
                  onClick={() => onSwitchMode('login')}
                >
                  Log in
                </button>
              </span>
            ) : (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type='button'
                  className='text-blue-600 hover:underline cursor-pointer'
                  onClick={() => onSwitchMode('register')}
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
