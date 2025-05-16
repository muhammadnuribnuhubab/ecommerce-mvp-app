// src/lib/api.ts

import { ProductDetail } from '@/types/product';

export async function getProducts(): Promise<ProductDetail[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductsByCategory(
  category: string
): Promise<ProductDetail[]> {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
  );
  if (!res.ok) throw new Error('Failed to fetch products by category');
  return res.json();
}

export const searchProducts = async (query: string) => {
  const res = await fetch(`https://fakestoreapi.com/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  const products = await res.json();

  return products.filter((product: any) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
};

export async function getProductDetail(id: number): Promise<ProductDetail> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product detail');
  return res.json();
}
