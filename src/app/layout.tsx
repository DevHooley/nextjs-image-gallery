import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Container } from '@/components/bootstrap';

import NavBar from './NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Image Gallery',
  description: 'Image gallery with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main>
          <Container className="py-4">{children}</Container>
        </main>
      </body>
    </html>
  );
}
