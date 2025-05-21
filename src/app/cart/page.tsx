// src/app/cart/page.tsx
import { Suspense } from 'react';
import { CartPage } from '@/feature/cart/page/CartPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart | commercell',
};

export default function Page() {
  return (
    <Suspense>
      <CartPage />
    </Suspense>
  );
}
