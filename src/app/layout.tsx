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
                fallback={<div className='p-4'>Loading navigation…</div>}
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
