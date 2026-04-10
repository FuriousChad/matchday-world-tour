import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { MatchBanner } from '@/components/shared/match-banner'
import { FavoritesProvider } from '@/components/shared/favorites-provider'
import { getMetadataBase } from '@/lib/seo'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'Matchday World Tour — Your World Cup Travel Guide',
    template: '%s | Matchday World Tour',
  },
  description:
    'The ultimate travel companion for international football fans at the 2026 FIFA World Cup in the USA. Find your team, explore host cities, discover matchday spots.',
  keywords: ['World Cup 2026', 'FIFA', 'football travel', 'USA 2026', 'matchday guide'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Matchday World Tour',
    title: 'Matchday World Tour — Your World Cup Travel Guide',
    description:
      'The ultimate travel companion for international football fans at the 2026 FIFA World Cup in the USA. Find your team, explore host cities, discover matchday spots.',
    url: '/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Matchday World Tour — 2026 World Cup travel guides and matchday planning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matchday World Tour — Your World Cup Travel Guide',
    description:
      'The ultimate travel companion for international football fans at the 2026 FIFA World Cup in the USA. Find your team, explore host cities, discover matchday spots.',
    images: [
      {
        url: '/opengraph-image',
        alt: 'Matchday World Tour — 2026 World Cup travel guides and matchday planning',
      },
    ],
  },
  other: {
    'google-adsense-account': 'ca-pub-7050091037541352',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7050091037541352"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <FavoritesProvider>
          <div className="md:flex">
            <Navbar />
            <div className="min-w-0 flex-1 pt-14">
              <MatchBanner />
              <main className="flex-1">{children}</main>
            </div>
          </div>
        </FavoritesProvider>
      </body>
    </html>
  )
}
