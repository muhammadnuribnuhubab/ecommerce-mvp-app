// src/constants/categories.ts
export type CategoryType = {
  label: string;
  urlKey: string;
};

export const categories: CategoryType[] = [
  { label: "Men's Clothing", urlKey: 'mens clothing' },
  { label: 'Jewelry', urlKey: 'jewelery' },
  { label: 'Electronics', urlKey: 'electronics' },
  { label: "Women's Clothing", urlKey: 'womens clothing' },
];
