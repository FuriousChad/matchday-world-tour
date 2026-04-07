import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { MatchBanner } from '@/components/shared/match-banner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Matchday World Tour — Your World Cup Travel Guide',
    template: '%s | Matchday World Tour',
  },
  description:
    'The ultimate travel companion for international football fans at the 2026 FIFA World Cup in the USA. Find your team, explore host cities, discover matchday spots.',
  keywords: ['World Cup 2026', 'FIFA', 'football travel', 'USA 2026', 'matchday guide'],
  openGraph: {
    type: 'website',
    siteName: 'Matchday World Tour',
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
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7050091037541352"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Navbar />
        <MatchBanner />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
