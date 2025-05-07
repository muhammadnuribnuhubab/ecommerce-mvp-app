// src/app/page.tsx

import { Category } from '@/feature/shared/widgets/Category';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center text-primary-200 gap-4'>
      <Category />
    </div>
  );
}
