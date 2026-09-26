import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/hooks/use-auth';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Lumière — Undangan Digital Elegan & Layanan Fotografer Profesional',
  description:
    'Lumiere menghadirkan kurasi undangan digital premium untuk wisuda mahasiswa dan pernikahan, serta direktori fotografer terpercaya.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-stone-800 antialiased selection:bg-[#EBDCB8] selection:text-stone-900">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
