// src/app/detail/[id]/page.tsx
import type { Metadata } from 'next';
import { DetailPage } from '@/feature/detail/page/DetailPage';

export const metadata: Metadata = {
  title: 'Detail | commercell',
};

export default async function DetailPageWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // tunggu promise params ter-resolve
  const { id: idStr } = await params;
  const id = Number(idStr);
  return <DetailPage id={id} />;
}
