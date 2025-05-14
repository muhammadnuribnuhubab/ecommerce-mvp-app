'use client';

import { useEffect, useState } from 'react';
import { InputField } from '@/feature/auth/ui/InputField';
import { Button } from '@/feature/shared/ui/Button';
import { Typography } from '@/feature/shared/ui/Typography';

const STORAGE_KEY = 'shippingAddress';

export const AddressSection = () => {
  const initialFormState = {
    name: '',
    address: '',
    city: '',
    zip: '',
  };

  const [form, setForm] = useState(initialFormState);
  const [savedForm, setSavedForm] = useState(initialFormState);
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // 1. Pada mount, baca dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      setForm(data);
      setSavedForm(data);
      setIsSaved(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 2. Simpan ke localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSavedForm(form);
    setIsSaved(true);
    setIsEditing(false);
    console.log('Saved to localStorage:', form);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsSaved(false);
  };

  const handleCancel = () => {
    setForm(savedForm);
    setIsEditing(false);
    setIsSaved(true);
  };

  return (
    <div className='flex flex-col border-3 rounded-2xl p-4 border-neutral-300 h-fit'>
      <Typography as='h1' size='xl' weight='bold' className='mb-4'>
        Shipping Address
      </Typography>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {(['name', 'address', 'city', 'zip'] as const).map((field) => (
          <InputField
            key={field}
            label={
              field === 'name'
                ? 'Full Name'
                : field === 'zip'
                ? 'ZIP Code'
                : field.charAt(0).toUpperCase() + field.slice(1)
            }
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={`Enter your ${field}`}
            required
            readOnly={isSaved}
          />
        ))}

        <div className='flex justify-between gap-4 mt-4'>
          <Button
            type='button'
            variant='secondary'
            onClick={isEditing ? handleCancel : handleEdit}
            disabled={!isSaved && !isEditing}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          <Button type='submit' disabled={isSaved && !isEditing}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
