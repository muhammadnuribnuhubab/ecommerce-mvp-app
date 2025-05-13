'use client';

import { ChangeEvent } from 'react';
import { MinusIcon, PlusIcon } from '../../shared/ui/Icon';

type QuantityControlProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export const QuantityControl = ({
  quantity,
  onIncrement,
  onDecrement,
  onChange,
  min = 1,
  max = 99,
}: QuantityControlProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      const clamped = Math.max(min, Math.min(max, value));
      onChange(clamped);
    }
  };

  const canDecrement = quantity > min;
  const canIncrement = quantity < max;

  return (
    <div className='flex items-center gap-2 rounded-xl px-3 py-2 bg-white border border-neutral-300 w-fit'>
      <button
        onClick={onDecrement}
        disabled={!canDecrement}
        className='text-neutral-950 cursor-pointer disabled:opacity-30'
      >
        <MinusIcon />
      </button>

      <input
        type='number'
        min={min}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        className='w-[40px] text-center outline-none font-semibold text-sm sm:text-base appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
      />

      <button
        onClick={onIncrement}
        disabled={!canIncrement}
        className='text-neutral-950 cursor-pointer disabled:opacity-30'
      >
        <PlusIcon />
      </button>
    </div>
  );
};
