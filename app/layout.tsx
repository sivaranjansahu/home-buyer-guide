import SupabaseProvider from './supabase-provider';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { Toaster } from '@/components/ui/toast/toaster';
import { PropsWithChildren } from 'react';
import 'styles/main.css';
//export const revalidate = 0;
const meta = {
  title: 'STARInterview',
  description: 'AI powered STAR answers generator for behavioral interviews',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.png',
  url: 'https://starinterview.ai',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  cardImage: meta.cardImage,
  robots: meta.robots,
  favicon: meta.favicon,
  url: meta.url,
  type: meta.type,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage,
    type: meta.type,
    site_name: meta.title
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vercel',
    title: meta.title,
    description: meta.description,
    cardImage: meta.cardImage
  }
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="bg-gray-50 loading text-gray-900">
        <SupabaseProvider>
          <Navbar />
          <main
            id="skip"
            className="min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)]"
          >
            {children}
            <Toaster />
          </main>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
