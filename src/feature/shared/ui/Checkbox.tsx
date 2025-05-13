import { ChangeEvent } from 'react';

type CheckboxProps = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  id?: string; // Menambahkan id
};

export const Checkbox = ({
  checked,
  onChange,
  name,
  required = false,
  id,
}: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      id={id} // Menetapkan ID untuk checkbox
      name={name}
      checked={checked}
      onChange={onChange}
      required={required}
      className="size-4 accent-primary-300 cursor-pointer"
    />
  );
};
