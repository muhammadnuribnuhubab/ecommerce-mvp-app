// src/app/verify/page.tsx (SERVER COMPONENT)
import VerifyClient from '@/feature/verify/page/VerifyClient';
import { Suspense } from 'react';

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading verification page...</div>}>
      <VerifyClient />
    </Suspense>
  );
}
