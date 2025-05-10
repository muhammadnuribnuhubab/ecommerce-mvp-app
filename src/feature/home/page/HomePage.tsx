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
      imageUrl: '/images/product1.jpg',
      price: 100000,
    },
    {
      id: '4',
      name: 'Product 4',
      imageUrl: '/images/product2.jpg',
      price: 150000,
    },
    {
      id: '5',
      name: 'Product 5',
      imageUrl: '/images/product1.jpg',
      price: 100000,
    },
    // {
    //   id: '6',
    //   name: 'Product 6',
    //   imageUrl: '/images/product2.jpg',
    //   price: 150000,
    // },
  ];

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 sm:px-0'>
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
