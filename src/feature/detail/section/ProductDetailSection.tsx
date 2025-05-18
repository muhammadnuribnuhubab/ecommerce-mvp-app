'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Typography } from '@/feature/shared/ui/Typography';
import { Rating } from '@/feature/shared/widget/Rating';
import { Button } from '@/feature/shared/ui/Button';
import { QuantityControl } from '@/feature/shared/widget/QuantityControl';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/feature/auth/widget/AuthModal';
import { toast } from 'react-toastify';
import type { ProductDetail } from '@/types/product';
import { toTitleCase } from '@/utils/toTitleCase';
import { useEffect } from 'react'; // pastikan sudah di-import

type ProductDetailSectionProps = Pick<
  ProductDetail,
  'id' | 'image' | 'category' | 'title' | 'price' | 'rating' | 'description'
>;

export const ProductDetailSection = ({
  id,
  image,
  category,
  title,
  price,
  rating,
  description,
}: ProductDetailSectionProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const { session } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAddToCart = () => {
    if (!session) {
      toast.error('Kamu harus login dulu!');
      setShowAuthModal(true);
      return;
    }
    addToCart({
      id,
      image,
      title,
      category,
      price,
      quantity,
    });
  };

  const handleBuyNow = () => {
    if (!session) {
      toast.error('Kamu harus login dulu!');
      setShowAuthModal(true);
      return;
    }

    // Bangun query string dengan URLSearchParams
    const params = new URLSearchParams({
      id: id.toString(),
      image: image,
      title,
      category,
      price: price.toString(),
      quantity: quantity.toString(),
    });

    router.push(`/checkout?${params.toString()}`);
  };

  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup saat komponen di-unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAuthModal]);

  return (
    <>
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}

      <div className='flex flex-col lg:flex-row gap-10'>
        <div className='relative w-full lg:w-2/5 bg-white flex items-center justify-center'>
          <Image
            src={image}
            alt={title}
            width={600}
            height={600}
            className='w-full h-auto object-contain'
            unoptimized
          />
        </div>

        <div className='flex flex-col gap-4 w-full'>
          {/* Info Produk */}
          <div className='flex flex-col gap-1'>
            <Typography color='secondary'>{toTitleCase(category)}</Typography>
            <Typography as='h1' size='lg' weight='semibold'>
              {title}
            </Typography>
            <Typography as='h2' size='xl' weight='bold'>
              $ {price.toLocaleString()}
            </Typography>
            <div className='flex items-center gap-2'>
              <Rating value={rating.rate} />
              <Typography size='sm'>({rating.count} reviews)</Typography>
            </div>
          </div>

          {/* Deskripsi */}
          <div className='flex flex-col gap-1 border-y border-neutral-300 py-4'>
            <Typography weight='semibold'>Description</Typography>
            <Typography>{description}</Typography>
          </div>

          {/* Quantity */}
          <div className='flex flex-col gap-2'>
            <Typography weight='semibold'>Quantity</Typography>
            <QuantityControl
              quantity={quantity}
              onIncrement={() => setQuantity((q) => q + 1)}
              onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
              onChange={(val) => setQuantity(val)}
              min={1}
              max={99}
            />
          </div>

          {/* Tombol Aksi */}
          <div className='flex flex-col sm:flex-row gap-2'>
            <Button
              variant='secondary'
              className='sm:w-1/2'
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button className='sm:w-1/2' onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
