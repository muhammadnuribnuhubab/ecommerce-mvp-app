// src/constants/categories.ts
export type CategoryType = {
  label: string;
  apiKey: string;
};

export const categories: CategoryType[] = [
  { label: 'Electronics', apiKey: 'electronics' },
  { label: 'Jewelery', apiKey: 'jewelery' },
  { label: "Men's Clothing", apiKey: "men's clothing" },
  { label: "Women's Clothing", apiKey: "women's clothing" },
];
