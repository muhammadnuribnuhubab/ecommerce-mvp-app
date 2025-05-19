// src/app/not-found.tsx (SERVER COMPONENT)
import NotFoundClient from '@/feature/not-found/page/NotFoundClient';
import { Suspense } from 'react';

export default function NotFound() {
  return (
    <Suspense>
      <NotFoundClient />
    </Suspense>
  );
}
