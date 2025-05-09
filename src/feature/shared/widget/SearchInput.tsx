// src/feature/shared/widget/SearchInput.tsx

'use client';

import clsx from 'clsx';
import { useState, ChangeEvent } from 'react';
import { RoundedCloseIcon, SearchIcon } from '../ui/Icon';

type SearchInputProps = {
  className?: string;
}

export const SearchInput = ({className}: SearchInputProps) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className={clsx('relative w-full', className)}>
      <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500' />
      <input
        type='search'
        value={query}
        onChange={handleChange}
        placeholder='Search'
        className='w-full pl-11 pr-11 py-3 sm:py-4 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 text-sm sm:text-base text-neutral-950'
      />
      {query && (
        <button
          onClick={handleClear}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 transition cursor-pointer'
          aria-label='Clear search input'
        >
          <RoundedCloseIcon />
        </button>
      )}
    </div>
  );
};
