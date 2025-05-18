// src/feature/detail/page/DetailPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ProductDetailSection } from '../section/ProductDetailSection';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';
import { ProductBase, ProductDetail } from '@/types/product';
import { getProductDetail, getProductsByCategory } from '@/lib/api';
import { ProductDetailSkeletonSection } from '../section/ProductDetailSkeletonSection';

type DetailPageProps = {
  id: number;
};

export const DetailPage = ({ id }: DetailPageProps) => {
  const pathname = usePathname();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductBase[]>([]);
  const [loading, setLoading] = useState(true);

  // scroll to top setiap kali route berubah
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // fetch data client‑side
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prod = await getProductDetail(id);
        setProduct(prod);

        const inCat = await getProductsByCategory(prod.category);
        setRelatedProducts(inCat.filter((p) => p.id !== id));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // tampilkan skeleton kalau masih loading atau product belum ada
  if (loading || !product) {
    return (
      <main className='container mx-auto pt-22 sm:pt-28 px-4 min-h-screen'>
        <ProductDetailSkeletonSection />
      </main>
    );
  }

  return (
    <main className='container mx-auto pt-22 sm:pt-28 px-4 min-h-screen flex flex-col gap-6'>
      <ProductDetailSection
        id={product.id}
        image={product.image}
        category={product.category}
        title={product.title}
        price={product.price}
        rating={product.rating}
        description={product.description}
      />
      <ProductListSection title='Related Products' products={relatedProducts} />
    </main>
  );
};
