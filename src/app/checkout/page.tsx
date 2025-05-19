import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | commercéll',
};

import { CheckoutPage as CheckoutPageComponent } from '@/feature/checkout/page/CheckoutPage';
import { Suspense } from 'react';

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutPageComponent />
    </Suspense>
  );
}
