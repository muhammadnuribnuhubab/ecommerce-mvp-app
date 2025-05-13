'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types/cart';

type CartContextType = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>; // ✅ Tambahkan setCartItems di sini
  addToCart: (product: Omit<CartItem, 'isSelected'>) => void;
  removeFromCart: (id: string) => void;
  toggleSelect: (id: string) => void;
  toggleSelectAll: () => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeSelectedFromCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cartItems]);

  const addToCart = (product: Omit<CartItem, 'isSelected'>) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        const entry: CartItem = {
          ...product,
          isSelected: false,
        };
        return [...prev, entry];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleSelect = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.isSelected);
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, isSelected: !allSelected }))
    );
  };

  const incrementQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeSelectedFromCart = () => {
    setCartItems((prev) => prev.filter((item) => !item.isSelected));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems, // ✅ Sertakan setCartItems dalam value
        addToCart,
        removeFromCart,
        toggleSelect,
        toggleSelectAll,
        incrementQuantity,
        decrementQuantity,
        removeSelectedFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
