'use client';

import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/feature/shared/ui/Logo';
import { CloseIcon, MenuIcon, SearchIcon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { SearchInput } from '../widget/SearchInput';
import { CloseAction } from '../widget/CloseAction';
import { AuthButton } from '../widget/AuthButton';
import { CartButton } from '../widget/CartButton';
import { UserActionDropdownList } from '../widget/UserActionDropdownList';
import { CategoryDropdownHeaderList } from '../widget/CategoryDropdownHeaderList';
import { useCart } from '@/context/CartContext';
import { AuthModal } from '@/feature/auth/widget/AuthModal';
import { useAuth } from '@/context/AuthContext'; // ✅ gunakan context

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { session } = useAuth(); // ✅ akses session dari context
  const isLoggedIn = !!session;

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    // Menambahkan style overflow hidden pada body ketika modal atau menu dibuka
    if (isMenuOpen || authModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, authModal]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <header className='fixed z-500 w-full px-4 py-3 bg-white shadow-[0px_0px_20px_0px_#CBCACA40]'>
      <div className='flex items-center justify-between gap-4 container mx-auto'>
        <Logo />
        <div className='flex items-center gap-3'>
          <CategoryDropdownHeaderList />
          <Button
            variant='secondary'
            className='sm:hidden'
            onClick={handleSearchClick}
          >
            <SearchIcon />
          </Button>
          <SearchInput className='hidden sm:inline-flex' />
          <CartButton count={cartCount} />
        </div>

        <div className='flex items-center gap-4'>
          <button
            aria-label='Menu'
            className='lg:hidden cursor-pointer'
            onClick={handleMenuClick}
          >
            <MenuIcon className='!size-10 text-neutral-700 hover:text-black' />
          </button>

          <div className='hidden lg:flex items-center gap-3'>
            {isLoggedIn ? (
              <UserActionDropdownList />
            ) : (
              <AuthButton
                onLoginClick={() => setAuthModal('login')}
                onRegisterClick={() => setAuthModal('register')}
              />
            )}
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className='absolute inset-0 z-50 flex items-center px-4 py-4 sm:hidden bg-white'>
          <div className='flex items-center gap-2 w-full'>
            <SearchInput inputRef={inputRef} />
            <button
              className='text-neutral-950 cursor-pointer'
              onClick={handleCloseSearch}
            >
              <CloseIcon className='!size-10' />
            </button>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className='absolute inset-0 z-50 p-4 sm:py-5.5 lg:hidden bg-white min-h-screen'>
          <div className='container mx-auto'>
            <CloseAction
              title='Menu'
              onClose={handleCloseMenu}
              className='!size-10'
            />
            <div className='flex gap-3 pt-6 sm:pt-10'>
              {isLoggedIn ? (
                <UserActionDropdownList />
              ) : (
                <AuthButton
                  onLoginClick={() => setAuthModal('login')}
                  onRegisterClick={() => setAuthModal('register')}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitchMode={(mode) => setAuthModal(mode)}
        />
      )}
    </header>
  );
};
