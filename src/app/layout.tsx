import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { Toaster } from 'sonner'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import KeyboardShortcuts from '@/components/ui/KeyboardShortcuts'
import LoadingScreen from '@/components/ui/LoadingScreen'

export const metadata: Metadata = {
  title: { default: 'SuDhama: The Good Home', template: '%s | SuDhama' },
  description:
    'SuDhama is a sanctuary in the heart of Udupi — organic produce, heritage cows, and the slow life, rooted in tradition and affection for the land.',
  keywords: ['organic farm', 'Udupi', 'sustainable agriculture', 'family farm', 'Karnataka', 'SuDhama'],
  authors: [{ name: 'Sudha & Girish' }],
  metadataBase: new URL('https://sudhamafarms.com'),
  icons: { icon: '/images/Favicon.png' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SuDhama',
    title: 'SuDhama: The Good Home',
    description: 'A 3-acre organic farm sanctuary in Udupi, Karnataka. Sustainable agriculture, heritage cows, and the slow life.',
    url: 'https://sudhamafarms.com',
    images: [{ url: '/images/Farmhouse.jpg', width: 1200, height: 630, alt: 'SuDhama Farmhouse' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SuDhama: The Good Home',
    description: 'A 3-acre organic farm in Udupi, Karnataka.',
    images: ['/images/Farmhouse.jpg'],
  },
  alternates: { canonical: 'https://sudhamafarms.com' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Farm',
            name: 'SuDhama',
            description: 'A 3-acre organic farm sanctuary in Udupi, Karnataka.',
            url: 'https://sudhamafarms.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '8-118(1), Kanyana Village, Near Peradi',
              addressLocality: 'Hebri',
              addressRegion: 'Udupi',
              postalCode: '576112',
              addressCountry: 'IN',
            },
            geo: { '@type': 'GeoCoordinates', latitude: 13.4247, longitude: 74.9705 },
            image: 'https://sudhamafarms.com/images/Farmhouse.jpg',
            email: 'contact@sudhamafarms.com',
            areaServed: 'Udupi, Karnataka, India',
          }) }}
        />
        <QueryProvider>
          <LoadingScreen />
          <div id="read-progress" style={{ width: '0%' }} aria-hidden="true" />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 top-4 left-4 bg-white text-black p-4 rounded-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <KeyboardShortcuts />
          <Toaster position="bottom-right" richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  )
}
