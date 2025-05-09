'use client';

import { ProductDetail } from '@/feature/detail/ProductDetail';
import { Rating } from '@/feature/shared/widget/Rating';

export default function Home() {
  const handleAddToCart = () => {
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    alert('Proceeding to checkout!');
  };
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-4 bg-[#eaeaea]'>
      <ProductDetail
        imageUrl=''
        category='Elektronik'
        name='Smartphone XYZ'
        price={3499000}
        rating={4.5}
        reviewCount={128}
        description='Smartphone dengan layar AMOLED 6.5 inci, kamera 50MP, dan baterai 5000mAh. Smartphone dengan layar AMOLED 6.5 inci, kamera 50MP, dan baterai 5000mAh. Smartphone dengan layar AMOLED 6.5 inci, kamera 50MP, dan baterai 5000mAh.'
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
}
