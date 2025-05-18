'use client';

import React from 'react';
import { Typography } from '../ui/Typography';
import { Button } from '../ui/Button';

type ConfirmDialogProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog = ({
  isOpen,
  title = 'Konfirmasi',
  message = 'Apakah kamu yakin?',
  confirmText = 'Ya',
  cancelText = 'Batal',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-999 bg-black/50 flex items-center justify-center px-4'>
      <div className='relative bg-white w-full max-w-md rounded-xl p-6 flex flex-col gap-6'>
        <Typography size='xl' weight='bold'>
          {title}
        </Typography>
        <Typography>{message}</Typography>
        <div className='flex gap-6'>
          <Button onClick={onCancel} variant='secondary'>
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
};
