'use client';

import { Breadcrumb } from '@/feature/shared/widget/BreadCrumb';

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen gap-4 bg-[#eaeaea]'>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings' }, // aktif sekarang
        ]}
      />
    </div>
  );
}
