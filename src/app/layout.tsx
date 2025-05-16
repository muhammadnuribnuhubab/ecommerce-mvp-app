'use client';

import '../style/globals.css';
import { Header } from '@/feature/shared/layout/Header';
import { Footer } from '@/feature/shared/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <html lang='en'>
      <body>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <AuthProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </AuthProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
