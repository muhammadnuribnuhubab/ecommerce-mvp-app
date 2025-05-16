'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { CartItem } from '@/types/cart';

type CartContextType = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: Omit<CartItem, 'isSelected'>) => void;
  removeFromCart: (id: number) => void;
  toggleSelect: (id: number) => void;
  toggleSelectAll: () => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeSelectedFromCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (cartItems.length) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'isSelected'>) => {
    setCartItems((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, isSelected: false }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleSelect = (id: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isSelected: !i.isSelected } : i))
    );
  };

  const toggleSelectAll = () => {
    const all = cartItems.every((i) => i.isSelected);
    setCartItems((prev) => prev.map((i) => ({ ...i, isSelected: !all })));
  };

  const incrementQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decrementQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  };

  const removeSelectedFromCart = () => {
    setCartItems((prev) => prev.filter((i) => !i.isSelected));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
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
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
