// src/app/page.tsx

import { Footer } from '@/feature/shared/layout/Footer';
import { Header } from '@/feature/shared/layout/Header';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen  text-primary-200 gap-4 bg-[#eaeaea]'>
      <Header />
      <Footer />
    </div>
  );
}
