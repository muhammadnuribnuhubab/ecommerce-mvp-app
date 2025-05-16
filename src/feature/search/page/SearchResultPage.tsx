// src/feature/search/page/SearchResultPage.tsx

import { ProductBase } from '@/types/product';
import { ProductListSection } from '@/feature/shared/section/ProductListSection';

type SearchResultPageProps = {
  results: ProductBase[];
  query: string;
};

export const SearchResultPage = ({ results, query }: SearchResultPageProps) => {
  return (
    <ProductListSection
      title={`Search Results for "${query}"`}
      products={results} // langsung kirim data sesuai ProductBase
    />
  );
};
