// src/feature/search/page/SearchResultPage.tsx

import { ProductSummary } from './SearchPage';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';

type SearchResultPageProps = {
  results: ProductSummary[];
  query: string;
};

export const SearchResultPage = ({ results, query }: SearchResultPageProps) => {
  const productList = results.map((product) => ({
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
  }));

  return (
    <ProductListSection
      title={`Search Results for "${query}"`}
      products={productList}
    />
  );
};
