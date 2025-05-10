// src/feature/home/section/FeaturedProductsSection.tsx

import { ProductListSection } from '@/feature/shared/section/ProductListSection';

type FeaturedProductsSectionProps = {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
};

export const FeaturedProductsSection = ({ products }: FeaturedProductsSectionProps) => {
  return (
    <section>
      <ProductListSection title="Featured Products" products={products} />
    </section>
  );
};
