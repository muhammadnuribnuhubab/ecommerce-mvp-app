'use client';

import { useCart } from '@/context/CartContex';
import { EmptyPage } from '@/feature/search/page/EmptyPage';
import { CartItemsSection } from '../section/CartItemsSection';
import { TotalShopping } from '@/feature/shared/widget/TotalShopping';

export const CartPage = () => {
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

  const handleQuantityChange = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
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

  // ✅ Filter hanya item yang dipilih
  const selectedItems = cartItems.filter((item) => item.isSelected);

  // ✅ Hitung total hanya dari item yang dipilih
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
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        onRemove={removeFromCart}
        onSelect={toggleSelect}
        onChangeQuantity={handleQuantityChange}
      />

      <TotalShopping
        totalPrice={totalPrice}
        mode='cart'
        items={selectedItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }))}
        onCheckout={() => alert('Proceed to checkout')}
        className='mt-6 lg:mt-0'
      />
    </main>
  );
};
