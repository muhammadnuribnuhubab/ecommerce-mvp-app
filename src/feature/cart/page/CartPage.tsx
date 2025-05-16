// src/feature/cart/CartPage.tsx
'use client';

import { useAuth } from '@/context/AuthContext'; // Menggunakan AuthContext
import { useCart } from '@/context/CartContex';
import { EmptyPage } from '@/feature/search/page/EmptyPage';
import { CartItemsSection } from '../section/CartItemsSection';
import { TotalShopping } from '@/feature/shared/widget/TotalShopping';

export const CartPage = () => {
  const { session } = useAuth(); // Mengambil sesi dari AuthContext

  const {
    cartItems,
    setCartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    toggleSelect,
    toggleSelectAll,
    removeSelectedFromCart,
  } = useCart();

  if (!session) {
    // Jika belum login, tampilkan halaman kosong
    return (
      <main className="container mx-auto px-4 min-h-screen">
        <EmptyPage type="empty-cart" />
      </main>
    );
  }

  // Pastikan id bertipe number agar sesuai dengan CartItem.id
  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto px-4 min-h-screen">
        <EmptyPage type="empty-cart" />
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
    <main className="container mx-auto pt-22 sm:pt-28 px-4 min-h-screen flex flex-col lg:flex-row lg:justify-between lg:gap-6">
      <CartItemsSection
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

      <TotalShopping
        totalPrice={totalPrice}
        mode="cart"
        items={selectedItems.map((item) => ({
          title: item.title, // gunakan title, bukan name
          quantity: item.quantity,
          price: item.price,
        }))}
        onCheckout={() => alert('Proceed to checkout')}
        className="mt-6 lg:mt-0"
      />
    </main>
  );
};
