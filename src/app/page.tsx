// src/app/page.tsx

import { Logo } from '@/feature/shared/ui/Logo';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center text-primary-200 gap-4'>
      <Logo />
    </div>
  );
}
