// src/app/page.tsx

export const metadata: Metadata = {
  title: 'commercéll',
};

import { HomePage as HomePageComponent } from '@/feature/home/page/HomePage';
import { Metadata } from 'next';

export default function Home() {
  return <HomePageComponent />;
}
