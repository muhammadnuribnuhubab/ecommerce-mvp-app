'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { EmptyPage } from '@/feature/search/page/EmptyPage';
import { CartItemsSection } from '../section/CartItemsSection';
import { TotalShopping } from '@/feature/shared/widget/TotalShopping';

export const CartPage = () => {
  const { session } = useAuth();
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    toggleSelect,
    toggleSelectAll,
    removeSelectedFromCart,
    updateQuantity,
  } = useCart();

  const [isLoading, setIsLoading] = useState(true);

  // Simulasi loading awal selama 1 detik, setelah itu scroll ke atas
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'auto' }); // Pindah scrollTo ke sini
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Fungsi perubahan jumlah item secara langsung
  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    updateQuantity(id, newQty);
  };

  // Jika belum login, tampilkan halaman kosong
  if (!session) {
    return (
      <main className='container mx-auto px-4 min-h-screen'>
        <EmptyPage type='empty-cart' />
      </main>
    );
  }

  // Jika selesai loading dan cart kosong, tampilkan halaman kosong
  if (!isLoading && cartItems.length === 0) {
    return (
      <main className='container mx-auto px-4 min-h-screen'>
        <EmptyPage type='empty-cart' />
      </main>
    );
  }

  // Hitung status pemilihan dan total harga
  const isAllSelected = cartItems.every((item) => item.isSelected);
  const isAnySelected = cartItems.some((item) => item.isSelected);
  const selectedItems = cartItems.filter((item) => item.isSelected);
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 min-h-screen flex flex-col lg:flex-row lg:justify-between lg:gap-6'>
      {/* Daftar item keranjang */}
      <CartItemsSection
        isLoading={isLoading}
        isAllSelected={isAllSelected}
        isAnySelected={isAnySelected}
        toggleSelectAll={toggleSelectAll}
        removeSelectedFromCart={removeSelectedFromCart}
        cartItems={cartItems}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        onRemove={removeFromCart}
        onSelect={toggleSelect}
        onChangeQuantity={handleQuantityChange}
      />

      {/* Total belanja */}
      {isLoading ? (
        <div className='py-4 flex flex-col gap-4 border-3 rounded-2xl p-4 border-neutral-300 h-fit lg:w-2/5 animate-pulse'>
          <div className='h-6 bg-neutral-300 rounded w-1/3' />
          <div className='space-y-2'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='flex justify-between'>
                <div className='w-1/2 h-3 bg-neutral-200 rounded' />
                <div className='w-10 h-3 bg-neutral-300 rounded' />
              </div>
            ))}
          </div>
          <div className='h-4 bg-neutral-200 rounded w-2/3 mt-4' />
          <div className='h-10 bg-neutral-300 rounded mt-4' />
        </div>
      ) : (
        <TotalShopping
          totalPrice={totalPrice}
          mode='cart'
          items={selectedItems.map((item) => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
          }))}
          onCheckout={() => alert('Proceed to checkout')}
          className='mt-6 lg:mt-0'
        />
      )}
    </main>
  );
};
