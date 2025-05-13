// src/app/detail/[id]/page.tsx

import { DetailPage as DetailPageComponent } from '@/feature/detail/page/DetailPage';
import { mockData } from '@/constants/mockData';
import { ProductDetail, Category } from '@/types/product';

type DetailPageProps = {
  params: { id: string };
};

const getProductDetail = (id: string): ProductDetail | null => {
  const categories = Object.keys(mockData) as Category[];

  for (const category of categories) {
    const products = mockData[category];
    const found = products.find((p) => p.id === id);
    if (found) {
      return {
        ...found,
        category,
      };
    }
  }

  return null;
};

const getRelatedProducts = (
  category: Category,
  excludeId: string
): ProductDetail[] => {
  return mockData[category]
    .map((product) => ({
      ...product,
      category,
    }))
    .filter((product) => product.id !== excludeId);
};

export default function DetailPage({ params }: DetailPageProps) {
  const product = getProductDetail(params.id);

  if (!product) {
    return <div className='p-4'>Product not found</div>;
  }

  const relatedProducts = getRelatedProducts(product.category, product.id);

  return <DetailPageComponent product={product} relatedProducts={relatedProducts} />;
}
