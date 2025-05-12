// src/app/detail/[id]/page.tsx

import { DetailPage } from '@/feature/detail/page/DetailPage';
import { mockData } from '@/constants/mockData';

type Category = keyof typeof mockData;

type Product = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  category: Category;
};

type PageProps = {
  params: { id: string };
};

const getProductDetail = (id: string): Product | null => {
  for (const [category, products] of Object.entries(mockData) as [
    Category,
    {
      id: string;
      name: string;
      imageUrl: string;
      price: number;
      rating: number;
      reviews: number;
      description: string;
    }[]
  ][]) {
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
): Product[] => {
  return mockData[category]
    .map((product) => ({
      ...product,
      category,
    }))
    .filter((product) => product.id !== excludeId);
};

export default function DetailPageRoute({ params }: PageProps) {
  const product = getProductDetail(params.id);

  if (!product) {
    return <div className='p-4'>Product not found</div>;
  }

  const relatedProducts = getRelatedProducts(product.category, product.id);

  return <DetailPage product={product} relatedProducts={relatedProducts} />;
}
