'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CategoryNavigationSection } from '../section/CategoryNavigationSection';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { mockData } from '@/constants/mockData';
import { ProductBase } from '@/types/product';

export const CategoryPage = () => {
  const params = useParams();
  const categoryParam = params.category as string;
  const decodedCategory = decodeURIComponent(categoryParam);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductBase[]>([]);

  type CategoryKey =
    | 'mens clothing'
    | 'jewelery'
    | 'electronics'
    | 'womens clothing';

  useEffect(() => {
    setSelectedCategories([decodedCategory]);

    const key = decodedCategory.toLowerCase() as CategoryKey;

    if (mockData[key]) {
      // Pastikan semua item punya properti rating
      const mapped: ProductBase[] = mockData[key].map((product) => ({
        ...product,
        rating: product.rating ?? 0, // default rating jika undefined
      }));
      setProducts(mapped);
    }
  }, [decodedCategory]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 flex flex-col gap-4 xl:gap-6 min-h-screen'>
      <CategoryNavigationSection
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Category', href: '/category' },
          { label: decodedCategory },
        ]}
        categories={[
          'mens clothing',
          'jewelery',
          'electronics',
          'womens clothing',
        ]}
        selected={selectedCategories}
        onSelect={handleCategorySelect}
      />
      <ProductListSection
        title={`${decodedCategory} Products`}
        products={products}
      />
    </main>
  );
};
