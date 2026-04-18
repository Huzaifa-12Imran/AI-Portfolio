import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Huzaifa Imran — Full-Stack Engineer & AI Builder',
  description: 'Portfolio of Huzaifa Imran — full-stack engineer building AI systems, scalable backends, and beautiful frontends.',
  keywords: ['Huzaifa Imran', 'Full-Stack Engineer', 'AI Builder', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Huzaifa Imran' }],
  robots: { index: true, follow: true },
};

import CustomCursor from '@/components/layout/CustomCursor';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
