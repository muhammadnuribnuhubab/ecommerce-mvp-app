// src/feature/home/page/HomePage.tsx
import { BannerSection } from '../section/BannerSection';
import { FeaturedProductsSection } from '../section/FeaturedProductsSection';

export const HomePage = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'Product 1',
      imageUrl: '/images/product1.jpg',
      price: 100000,
    },
    {
      id: '2',
      name: 'Product 2',
      imageUrl: '/images/product2.jpg',
      price: 150000,
    },
    {
      id: '3',
      name: 'Product 3',
      imageUrl: '/images/product3.jpg',
      price: 200000,
    },
    {
      id: '4',
      name: 'Product 4',
      imageUrl: '/images/product4.jpg',
      price: 120000,
    },
    {
      id: '5',
      name: 'Product 5',
      imageUrl: '/images/product5.jpg',
      price: 110000,
    },
    {
      id: '6',
      name: 'Product 6',
      imageUrl: '/images/product6.jpg',
      price: 130000,
    },
    {
      id: '7',
      name: 'Product 7',
      imageUrl: '/images/product7.jpg',
      price: 140000,
    },
    {
      id: '8',
      name: 'Product 8',
      imageUrl: '/images/product8.jpg',
      price: 160000,
    },
    {
      id: '9',
      name: 'Product 9',
      imageUrl: '/images/product9.jpg',
      price: 170000,
    },
    {
      id: '10',
      name: 'Product 10',
      imageUrl: '/images/product10.jpg',
      price: 180000,
    },
  ];

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 flex flex-col gap-6 xl:gap-10 min-h-screen'>
      <BannerSection
        images={[
          { imageUrl: '/images/home/banner.svg', altText: 'Promo 1' },
          { imageUrl: '/images/home/banner.svg', altText: 'Promo 2' },
          { imageUrl: '/images/home/banner.svg', altText: 'Promo 3' },
        ]}
      />
      <FeaturedProductsSection products={featuredProducts} />
    </main>
  );
};
