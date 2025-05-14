'use client';

import { OrderItem } from '@/feature/shared/widget/OrderItem';
import { Typography } from '@/feature/shared/ui/Typography';
import { CartItem } from '@/types/cart';
import { Button } from '@/feature/shared/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';

type CheckoutItemsSectionProps = {
  selectedItems: CartItem[];
};

export const CheckoutItemsSection = ({
  selectedItems,
}: CheckoutItemsSectionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    // ambil id dari query, null jika bukan Buy Now
    const buyNowId = searchParams.get('id');

    if (buyNowId) {
      // Buy Now → langsung ke detail/:id
      router.push(`/detail/${buyNowId}`);
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      // kasus biasa, navigasi history
      router.back();
    } else {
      // fallback
      router.push('/cart');
    }
  };

  return (
    <div className='flex flex-col border-3 rounded-2xl p-4 border-neutral-300 h-fit'>
      <Typography as='h1' size='xl' weight='bold' className='mb-4'>
        Checkout Summary
      </Typography>

      {selectedItems.map((item) => (
        <OrderItem key={item.id} {...item} mode='checkout' />
      ))}

      <Button onClick={handleBack} className='mt-4'>
        Back
      </Button>
    </div>
  );
};
