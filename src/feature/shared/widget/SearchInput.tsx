'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, ChangeEvent, useEffect, useRef, RefObject } from 'react';
import clsx from 'clsx';
import { RoundedCloseIcon, SearchIcon } from '../ui/Icon';

type SearchInputProps = {
  className?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
};

export const SearchInput = ({ className, inputRef }: SearchInputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      const trimmed = query.trim();

      // Abaikan render pertama (prevent automatic redirect on mount)
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      // Jika user sudah mengetik atau clear, baru push URL
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }, 500);

    return () => clearTimeout(delay);
  }, [query, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    router.push('/search?q=');
  };

  return (
    <div className={clsx('relative w-full', className)}>
      <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500' />
      <input
        type='search'
        value={query}
        ref={inputRef}
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
