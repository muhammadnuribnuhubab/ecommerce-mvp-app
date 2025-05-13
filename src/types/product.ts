// src/types/product.ts

import { mockData } from '@/constants/mockData';

export type Category = keyof typeof mockData;

export type ProductBase = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
};

export type ProductDetail = ProductBase & {
  reviews: number;
  description: string;
  category: Category;
};
