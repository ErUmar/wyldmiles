import type { Metadata } from 'next';
import './globals.css';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'WYYLD MILES | Kashmir & Himalayan Travel, Stays & Adventure Rentals',
  description:
    'WANDER. YEARN. LIVE. DISCOVER. Handcrafted Kashmir circuits, boutique Dal Lake cedar houseboats, high-altitude motorcycle expeditions, and 4x4 mountain road trips across Kashmir, Ladakh, Himachal & Uttarakhand.',
  keywords: [
    'Kashmir tour packages',
    'Kashmir bike rental',
    'Royal Enfield Himalayan 450 Kashmir',
    'Dal Lake houseboats Srinagar',
    'Gulmarg ski packages',
    'Gurez valley road trip',
    'Thar 4x4 rental Srinagar',
    'WYYLD MILES',
  ],
  authors: [{ name: 'WYYLD MILES Himalayan Expeditions (Kashmir)' }],
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'WYYLD MILES – Wander. Yearn. Live. Discover.',
    description:
      'The premier travel & adventure vehicle rental company rooted in Kashmir. Handcrafted tours, boutique alpine stays, and Himalayan motorcycle & 4x4 rentals.',
    url: 'https://wyldmiles.com',
    siteName: 'WYYLD MILES',
    images: [
      {
        url: '/logo.jpg',
        width: 1024,
        height: 1024,
        alt: 'WYYLD MILES Himalayan Travel & Rentals',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased selection:bg-amber-500 selection:text-white">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}
