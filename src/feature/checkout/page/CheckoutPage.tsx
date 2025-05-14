'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContex';
import { CheckoutItemsSection } from '../section/CheckoutItemsSection';
import { AddressSection } from '../section/AddressSection';
import { TotalShopping } from '@/feature/shared/widget/TotalShopping';
import { SelectPayment } from '@/feature/checkout/widget/SelectPayment';
import { StatusPayment } from '@/feature/checkout/widget/StatusPayment';

export const CheckoutPage = () => {
  const { cartItems } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showSelectPayment, setShowSelectPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    'success' | 'failed' | null
  >(null);
  const [buyNowItem, setBuyNowItem] = useState<any | null>(null);

  const selectedItems = cartItems.filter((item) => item.isSelected);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Ambil query Buy Now atau redirect jika perlu
  useEffect(() => {
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const category = searchParams.get('category');
    const price = searchParams.get('price');
    const quantity = searchParams.get('quantity');
    const imageUrl = searchParams.get('imageUrl');

    const hasValidQuery =
      id && name && category && price && quantity && imageUrl;

    if (hasValidQuery && !buyNowItem) {
      setBuyNowItem({
        id,
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
        imageUrl,
        isSelected: true,
      });
    } else if (!hasValidQuery && selectedItems.length === 0) {
      router.push('/cart');
    }
  }, [searchParams, buyNowItem, selectedItems, router]);

  // Lock scroll saat modal payment
  useEffect(() => {
    document.body.style.overflow = showSelectPayment ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSelectPayment]);

  // Prioritaskan Buy Now item
  const itemsToShow = buyNowItem ? [buyNowItem] : selectedItems;
  if (itemsToShow.length === 0) return null;

  const totalPrice = itemsToShow.reduce(
    (sum, x) => sum + x.price * x.quantity,
    0
  );

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 min-h-screen flex flex-col lg:flex-row lg:gap-6'>
      <div className='lg:w-3/5'>
        <div className='lg:hidden mb-6'>
          <AddressSection />
        </div>
        <CheckoutItemsSection selectedItems={itemsToShow} />
      </div>

      <div className='lg:w-2/5 flex flex-col gap-6 mt-6 lg:mt-0'>
        <div className='hidden lg:block'>
          <AddressSection />
        </div>
        <TotalShopping
          totalPrice={totalPrice}
          mode='checkout'
          items={itemsToShow.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            price: i.price,
          }))}
          onCheckout={() => setShowSelectPayment(true)}
        />
      </div>

      {showSelectPayment && (
        <SelectPayment
          totalPrice={totalPrice}
          onClose={() => setShowSelectPayment(false)}
          onPay={() => {
            setShowSelectPayment(false);
            setTimeout(() => {
              setPaymentStatus(Math.random() > 0.5 ? 'success' : 'failed');
            }, 2000);
          }}
        />
      )}

      {paymentStatus && (
        <StatusPayment
          status={paymentStatus}
          onClose={() => setPaymentStatus(null)}
          onBackHome={() => router.push('/')}
        />
      )}
    </main>
  );
};
