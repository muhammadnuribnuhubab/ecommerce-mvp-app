import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | commercéll',
};

import { CheckoutPage as CheckoutPageComponent } from '@/feature/checkout/page/CheckoutPage';

export default function CheckoutPage() {
  return <CheckoutPageComponent />;
}
