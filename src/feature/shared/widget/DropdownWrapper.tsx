// src/feature/shared/widget/DropdownWrapper.tsx

'use client';

import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

type DropdownWrapperProps = {
  trigger: React.ReactNode | ((props: { isOpen: boolean }) => React.ReactNode);
  align?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  menuClassName?: string;
};

export const DropdownWrapper = ({
  trigger,
  align = 'left',
  children,
  className,
  menuClassName,
}: DropdownWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={clsx('relative', className)} ref={menuRef}>
      <div onClick={toggleMenu} className='cursor-pointer'>
        {typeof trigger === 'function' ? trigger({ isOpen }) : trigger}
      </div>
      {isOpen && (
        <div
          className={clsx(
            'absolute z-50',
            align === 'right' ? 'right-0' : 'left-0',
            menuClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
