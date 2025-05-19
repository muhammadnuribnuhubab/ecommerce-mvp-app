'use client';

import '../style/globals.css';
import { Header } from '@/feature/shared/layout/Header';
import { Footer } from '@/feature/shared/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

import { Suspense, useState } from 'react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <html lang='en'>
      <body>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <AuthProvider>
            <CartProvider>
              <Suspense
                fallback={
                  <div className='flex min-h-screen items-center justify-center bg-white'>
                    <div className='flex flex-col items-center gap-4 text-neutral-600 animate-pulse'>
                      <div className='w-10 h-10 border-4 border-t-transparent border-gray-400 rounded-full animate-spin' />
                    </div>
                  </div>
                }
              >
                <Header />
              </Suspense>
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
