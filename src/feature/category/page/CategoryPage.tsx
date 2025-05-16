'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CategoryNavigationSection } from '../section/CategoryNavigationSection';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { ProductBase, ProductDetail } from '@/types/product';
import { getProductsByCategory } from '@/lib/api';
import { toTitleCase } from '@/utils/toTitleCase';
import { SkeletonCard } from '@/feature/shared/widget/SkeletonCard';
import { categories } from '@/types/categories';

// const categories = [
//   { label: 'Mens Clothing', apiKey: "men's clothing" },
//   { label: 'Jewelery', apiKey: 'jewelery' },
//   { label: 'Electronics', apiKey: 'electronics' },
//   { label: 'Womens Clothing', apiKey: "women's clothing" },
// ];

export const CategoryPage = () => {
  const params = useParams();
  const categoryParam = params.category as string;
  const decodedCategory = decodeURIComponent(categoryParam);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductBase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryObj = categories.find(
    (cat) => cat.label.toLowerCase() === decodedCategory.toLowerCase()
  );

  useEffect(() => {
    if (!categoryObj) return;

    setSelectedCategories([categoryObj.label]);

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: ProductDetail[] = await getProductsByCategory(
          categoryObj.apiKey
        );
        const mapped: ProductBase[] = data.map((product) => ({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          rating: {
            rate: product.rating?.rate ?? 0,
            count: product.rating?.count ?? 0,
          },
        }));

        setProducts(mapped);
      } catch (err) {
        setError((err as Error).message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryObj]);

  const handleCategorySelect = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel)
        ? prev.filter((item) => item !== categoryLabel)
        : [...prev, categoryLabel]
    );
  };

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 flex flex-col gap-4 xl:gap-6 min-h-screen'>
      <CategoryNavigationSection
        breadcrumbItems={[
          { label: 'Home', href: '/' },
          { label: 'Category', href: '/category' },
          { label: toTitleCase(decodedCategory) },
        ]}
        categories={categories.map((c) => c.label)}
        selected={selectedCategories}
        onSelect={handleCategorySelect}
      />

      {error && <p className='text-red-600'>Error: {error}</p>}

      {loading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6'>
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <ProductListSection
          title={`${toTitleCase(decodedCategory)} Products`}
          products={products}
        />
      )}
    </main>
  );
};
