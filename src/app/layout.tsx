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
  metadataBase: new URL('https://sudhamafarms.com'),
  icons: { icon: '/images/Favicon.png' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SuDhama',
    images: [{ url: '/images/Farmhouse.jpg', width: 1200, height: 630, alt: 'SuDhama Farmhouse' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
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
