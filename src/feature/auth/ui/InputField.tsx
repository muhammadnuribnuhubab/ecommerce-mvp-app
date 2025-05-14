import { EyeOffIcon, EyeIcon } from '@/feature/shared/ui/Icon';
import { useState } from 'react';

type InputFieldProps = {
  label?: string;
  type?: 'text' | 'email' | 'password';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean; // Properti baru untuk mencegah perubahan
};

export const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  readOnly = false, // Ambil nilai dari props readOnly
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const inputId = `input-${name}`; // ID unik, misal: input-name, input-address, dll

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={inputId}
          className='block mb-1 font-semibold text-sm sm:text-base text-neutral-950 cursor-pointer'
        >
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className='w-full px-4 py-2 pr-10 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 text-sm sm:text-base text-neutral-950'
          readOnly={readOnly} // Gunakan readOnly untuk menonaktifkan perubahan
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800'
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  );
};
