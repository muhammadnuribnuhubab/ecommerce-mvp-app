// src/app/cart/page.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart | commercéll',
};

import { CartPage as CartPageComponent } from '@/feature/cart/page/CartPage';

export default function CartPage() {
  return <CartPageComponent />;
}
