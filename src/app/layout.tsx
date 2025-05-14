// src/app/layout.tsx
import '../style/globals.css';
import { Header } from '@/feature/shared/layout/Header';
import { Footer } from '@/feature/shared/layout/Footer';
import { CartProvider } from '@/context/CartContex';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
