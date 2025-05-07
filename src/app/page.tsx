// src/app/page.tsx

import { Typography } from '@/feature/shared/ui/Typography';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center text-primary-200 gap-4'>
      <Typography color='secondary'>Electronics</Typography>
      <Typography as='h1' size='3xl' weight='bold'>
        SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s
      </Typography>
      <Typography as='h2' size='2xl' weight='bold'>
        Rp100.000
      </Typography>
    </div>
  );
}
