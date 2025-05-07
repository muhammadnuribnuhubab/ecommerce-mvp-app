// src/app/page.tsx

import { Button } from '@/feature/shared/ui/Button';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center text-primary-200 gap-4'>
      <Button>Default Full Width</Button>
      <Button variant='secondary' fullWidth={false} className='w-50 bg-amber-600'>
        Not Full Width
      </Button>
    </div>
  );
}
