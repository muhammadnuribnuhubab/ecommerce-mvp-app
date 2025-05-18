// src/app/cart/page.tsx
import { Suspense } from 'react';
import { CartPage } from '@/feature/cart/page/CartPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart | commercéll',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <CartPage />
    </Suspense>
  );
}
