// src/app/detail/[id]/page.tsx

import type { Metadata } from 'next';
import { DetailPage as DetailPageComponent } from '@/feature/detail/page/DetailPage';
import { getProductDetail, getProductsByCategory } from '@/lib/api';
import type { ProductDetail } from '@/types/product';

export const metadata: Metadata = {
  title: 'Detail | commercéll',
};

type DetailPageProps = {
  params: { id: string };
};

export default async function DetailPage({ params }: DetailPageProps) {
  const id = Number(params.id);

  let product: ProductDetail | null = null;
  try {
    product = await getProductDetail(id);
  } catch (error) {
    console.error(error);
    return <div className='p-4'>Product not found</div>;
  }

  let relatedProducts: ProductDetail[] = [];
  try {
    const allInCategory = await getProductsByCategory(product.category);
    relatedProducts = allInCategory.filter((p) => p.id !== id);
  } catch (error) {
    console.error(error);
  }

  return (
    <DetailPageComponent product={product} relatedProducts={relatedProducts} />
  );
}
