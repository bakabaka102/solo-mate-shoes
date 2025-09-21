import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipToContent } from '@/components/accessibility/SkipToContent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SoleMate - Premium Footwear Store',
  description: 'Discover premium footwear with accessibility-first design. Browse our collection of shoes with advanced filtering and seamless checkout.',
  keywords: 'shoes, footwear, sneakers, boots, sandals, accessible shopping',
  authors: [{ name: 'SoleMate Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'SoleMate - Premium Footwear Store',
    description: 'Discover premium footwear with accessibility-first design.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>
        <SkipToContent />
        <Providers>
          <div className="min-h-full flex flex-col">
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
