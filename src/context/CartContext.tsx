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
import { CartItem, CartItemUpsert } from '@/types/cart';
import type { Database } from '@/types/supabase';

// 1. Tambahkan di tipe:
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItemUpsert) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  incrementQuantity: (productId: number) => Promise<void>;
  decrementQuantity: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>; // ← baru
  toggleSelect: (productId: number) => void;
  toggleSelectAll: () => void;
  removeSelectedFromCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const supabase = useSupabaseClient<Database, 'public'>();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // helper: fetch & map
  const fetchCart = async () => {
    if (!user?.id) return;
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id);
    if (error) {
      console.error('Failed to fetch cart:', error.message);
    } else {
      setCartItems(
        data.map((row) => ({
          id: row.product_id,
          title: row.title,
          category: row.category,
          price: row.price,
          image: row.image,
          quantity: row.quantity,
          isSelected: false,
          cartItemUuid: row.id,
        }))
      );
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    // Pindahkan definisi fetchCart ke sini
    const fetchCart = async () => {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);
      if (error) console.error('Failed to fetch cart:', error.message);
      else {
        setCartItems(
          data.map((row) => ({
            id: row.product_id,
            title: row.title,
            category: row.category,
            price: row.price,
            image: row.image,
            quantity: row.quantity,
            isSelected: false,
            cartItemUuid: row.id,
          }))
        );
      }
    };

    fetchCart();
  }, [supabase, user?.id]);

  const addToCart = async (product: CartItemUpsert) => {
    if (!user?.id) {
      console.error('User not logged in');
      return;
    }

    // cek existing
    const { data: existing, error: fetchErr } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_id', product.id)
      .limit(1);
    if (fetchErr) {
      console.error(fetchErr.message);
      return;
    }

    if (existing && existing.length > 0) {
      // update qty
      await supabase
        .from('cart_items')
        .update({ quantity: existing[0].quantity + product.quantity })
        .eq('id', existing[0].id);
    } else {
      // insert
      await supabase.from('cart_items').insert([
        {
          user_id: user.id,
          product_id: product.id,
          title: product.title,
          category: product.category,
          price: product.price,
          image: product.image,
          quantity: product.quantity,
          is_selected: false,
        },
      ]);
    }

    await fetchCart();
  };

  const removeFromCart = async (productId: number) => {
    if (!user?.id) return;
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;
    await supabase.from('cart_items').delete().eq('id', item.cartItemUuid);
    await fetchCart();
  };

  const incrementQuantity = async (productId: number) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;
    await supabase
      .from('cart_items')
      .update({ quantity: item.quantity + 1 })
      .eq('id', item.cartItemUuid);
    await fetchCart();
  };

  const decrementQuantity = async (productId: number) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item || item.quantity <= 1) return;
    await supabase
      .from('cart_items')
      .update({ quantity: item.quantity - 1 })
      .eq('id', item.cartItemUuid);
    await fetchCart();
  };

  const toggleSelect = (productId: number) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === productId ? { ...i, isSelected: !i.isSelected } : i
      )
    );
  };

  const toggleSelectAll = () => {
    const all = cartItems.every((i) => i.isSelected);
    setCartItems((prev) => prev.map((i) => ({ ...i, isSelected: !all })));
  };

  const removeSelectedFromCart = async () => {
    const toRemove = cartItems
      .filter((i) => i.isSelected)
      .map((i) => i.cartItemUuid);
    if (!toRemove.length) return;
    await supabase.from('cart_items').delete().in('id', toRemove);
    await fetchCart();
  };

  const updateQuantity = async (productId: number, newQty: number) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;
    await supabase
      .from('cart_items')
      .update({ quantity: newQty })
      .eq('id', item.cartItemUuid);
    await fetchCart(); // atau syncCart()
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        updateQuantity,
        toggleSelect,
        toggleSelectAll,
        removeSelectedFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
