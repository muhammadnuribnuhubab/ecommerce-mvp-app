// src/app/page.tsx

import { Footer } from '@/feature/shared/layout/Footer';
import { Header } from '@/feature/shared/layout/Header';
import { ProductCard } from '@/feature/shared/widget/ProductCart';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen  text-primary-200 gap-4 bg-[#eaeaea]'>
      <Header />

      <ProductCard
        imageUrl={''}
        title={'Product Name'}
        price={'Rp100.000'}
        rating={4.6}
      />
      <ProductCard
        imageUrl={''}
        title={'Product Name'}
        price={'Rp100.000'}
        rating={4.6}
      />
      <ProductCard
        imageUrl={''}
        title={'Product Name'}
        price={'Rp100.000'}
        rating={4.6}
      />
      <Footer />
    </div>
  );
}
