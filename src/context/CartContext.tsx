'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useAuth } from '@/context/AuthContext';
import { CartItem } from '@/types/cart';
import type { Database } from '@/types/supabase';

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

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const supabase = useSupabaseClient<Database>();
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch cart from Supabase when user logged in
  useEffect(() => {
    if (!user?.id) return;

    const fetchCart = async () => {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Failed to fetch cart:', error.message);
      } else {
        setCartItems(data.map((item) => ({ ...item, isSelected: false })));
      }
    };

    fetchCart();
  }, [supabase, user?.id]);

  const syncCart = async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id);
    if (!error && data) {
      setCartItems(data.map((item) => ({ ...item, isSelected: false })));
    }
  };

  const addToCart = async (product: Omit<CartItem, 'isSelected'>) => {
    if (!user) {
      console.error('User not logged in');
      return;
    }

    // Validasi lengkap
    const requiredFields = ['id', 'title', 'category', 'price', 'image'];
    for (const field of requiredFields) {
      if (
        !(field in product) ||
        product[field] === undefined ||
        product[field] === null
      ) {
        console.error(`Missing required product field: ${field}`, product);
        return;
      }
    }

    const payload = {
      user_id: user.id,
      product_id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      image: product.image,
      quantity: 1,
      is_selected: false,
    };

    // Debug log payload yang akan dikirim
    console.log('Payload to insert:', payload);

    const { data, error } = await supabase.from('cart_items').insert([payload]);

    if (error) {
      console.error('Insert error:', error.message);
    } else {
      console.log('Insert success:', data);
      syncCart(); // Refresh cart after insert
    }
  };

  const removeFromCart = async (id: number) => {
    if (!user?.id) return;

    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('id', id);

    syncCart();
  };

  const toggleSelect = (id: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isSelected: !i.isSelected } : i))
    );
  };

  const toggleSelectAll = () => {
    const allSelected = cartItems.every((i) => i.isSelected);
    setCartItems((prev) =>
      prev.map((i) => ({ ...i, isSelected: !allSelected }))
    );
  };

  const incrementQuantity = async (id: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item || !user?.id) return;

    await supabase
      .from('cart_items')
      .update({ quantity: item.quantity + 1 })
      .eq('user_id', user.id)
      .eq('id', id);

    syncCart();
  };

  const decrementQuantity = async (id: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item || item.quantity <= 1 || !user?.id) return;

    await supabase
      .from('cart_items')
      .update({ quantity: item.quantity - 1 })
      .eq('user_id', user.id)
      .eq('id', id);

    syncCart();
  };

  const removeSelectedFromCart = async () => {
    const selectedIds = cartItems.filter((i) => i.isSelected).map((i) => i.id);

    if (!user?.id || selectedIds.length === 0) return;

    await supabase
      .from('cart_items')
      .delete()
      .in('id', selectedIds)
      .eq('user_id', user.id);

    syncCart();
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
