// src/feature/cart/page/CartPage.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { EmptyPage } from '@/feature/search/page/EmptyPage';
import { CartItemsSection } from '../section/CartItemsSection';
import { TotalShopping } from '@/feature/shared/widget/TotalShopping';

export const CartPage = () => {
  const { session } = useAuth();

  // Ambil hanya fungsi yang ada di CartContextType
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    toggleSelect,
    toggleSelectAll,
    removeSelectedFromCart,
    // kita perlu fungsi updateQuantity agar bisa langsung set qty custom
    updateQuantity,
  } = useCart();

  if (!session) {
    return (
      <main className='container mx-auto px-4 min-h-screen'>
        <EmptyPage type='empty-cart' />
      </main>
    );
  }

  // Gunakan updateQuantity dari context
  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    updateQuantity(id, newQty);
  };

  if (cartItems.length === 0) {
    return (
      <main className='container mx-auto px-4 min-h-screen'>
        <EmptyPage type='empty-cart' />
      </main>
    );
  }

  const isAllSelected = cartItems.every((item) => item.isSelected);
  const isAnySelected = cartItems.some((item) => item.isSelected);
  const selectedItems = cartItems.filter((item) => item.isSelected);
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 min-h-screen flex flex-col lg:flex-row lg:justify-between lg:gap-6'>
      <CartItemsSection
        isAllSelected={isAllSelected}
        isAnySelected={isAnySelected}
        toggleSelectAll={toggleSelectAll}
        removeSelectedFromCart={removeSelectedFromCart}
        cartItems={cartItems}
        onIncrement={(id: number) => incrementQuantity(id)}
        onDecrement={(id: number) => decrementQuantity(id)}
        onRemove={(id: number) => removeFromCart(id)}
        onSelect={(id: number) => toggleSelect(id)}
        onChangeQuantity={(id: number, qty: number) =>
          handleQuantityChange(id, qty)
        }
      />

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
    </main>
  );
};
