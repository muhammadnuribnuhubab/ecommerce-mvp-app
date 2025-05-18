// src/feature/checkout/page/CheckoutPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CheckoutItemsSection } from '../section/CheckoutItemsSection';
import { ShippingAddressSection } from '../section/ShippingAddressSection';
import { TotalShopping } from '@/feature/shared/widget/TotalShopping';
import { SelectPayment } from '@/feature/checkout/widget/SelectPayment';
import { StatusPayment } from '@/feature/checkout/widget/StatusPayment';
import { CartItem } from '@/types/cart';
import { ProductDetail } from '@/types/product';

// CheckoutPage: Mengatur proses checkout dan validasi alamat
export const CheckoutPage = () => {
  const { cartItems } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showSelectPayment, setShowSelectPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | null>(null);
  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(null);
  // State untuk validasi alamat dari child component
  const [isShippingAddressComplete, setIsShippingAddressComplete] = useState(false);

  const selectedItems = cartItems.filter((item) => item.isSelected);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle Buy Now query params
  useEffect(() => {
    const timeout = setTimeout(() => {
      const id = searchParams.get('id');
      const title = searchParams.get('title');
      const rawCategory = searchParams.get('category');
      const category = rawCategory ? decodeURIComponent(rawCategory) : null;
      const price = searchParams.get('price');
      const quantity = searchParams.get('quantity');
      const image = searchParams.get('image');

      const hasValidQuery = id && title && category && price && quantity && image;
      const validCategories: ProductDetail['category'][] = [
        "men's clothing",
        "women's clothing",
        'jewelery',
        'electronics',
      ];

      if (
        hasValidQuery &&
        !buyNowItem &&
        validCategories.includes(category as ProductDetail['category'])
      ) {
        setBuyNowItem({
          id: Number(id),
          title,
          category: category as ProductDetail['category'],
          price: Number(price),
          quantity: Number(quantity),
          image,
          isSelected: true,
          cartItemUuid: crypto.randomUUID(),
        });
      } else if (!hasValidQuery && selectedItems.length === 0) {
        router.push('/cart');
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [searchParams, buyNowItem, selectedItems, router]);

  // Lock scroll when payment modal is open
  useEffect(() => {
    document.body.style.overflow = showSelectPayment ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSelectPayment]);

  const itemsToShow = buyNowItem ? [buyNowItem] : selectedItems;
  if (itemsToShow.length === 0) return null;

  const totalPrice = itemsToShow.reduce((sum, x) => sum + x.price * x.quantity, 0);

  return (
    <main className="container mx-auto pt-22 sm:pt-28 px-4 min-h-screen flex flex-col lg:flex-row lg:gap-6">
      <div className="lg:w-3/5">
        <div className="lg:hidden mb-6">
          {/* Pass callback untuk validasi alamat */}
          <ShippingAddressSection onValidationChange={setIsShippingAddressComplete} />
        </div>
        <CheckoutItemsSection selectedItems={itemsToShow} />
      </div>

      <div className="lg:w-2/5 flex flex-col gap-6 mt-6 lg:mt-0">
        <div className="hidden lg:block">
          <ShippingAddressSection onValidationChange={setIsShippingAddressComplete} />
        </div>
        <TotalShopping
          totalPrice={totalPrice}
          mode="checkout"
          items={itemsToShow.map((i) => ({ title: i.title, quantity: i.quantity, price: i.price }))}
          onCheckout={() => setShowSelectPayment(true)}
          disabled={!isShippingAddressComplete}
        />
      </div>

      {showSelectPayment && (
        <SelectPayment
          totalPrice={totalPrice}
          onClose={() => setShowSelectPayment(false)}
          onPay={() => {
            setShowSelectPayment(false);
            setTimeout(() => setPaymentStatus(Math.random() > 0.5 ? 'success' : 'failed'), 2000);
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
