// src/app/page.tsx

import { SearchInput } from '@/feature/shared/widgets/SearchInput';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center text-primary-200 gap-4'>
      <SearchInput />
    </div>
  );
}
