// src/app/category/page.tsx
import { redirect } from 'next/navigation';

export default function CategoryIndex() {
  redirect('/category/electronics');
  // wajib agar Next.js tidak menunggu JSX
}
