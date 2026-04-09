import { getTeams } from '@/lib/queries'
import { TeamPageClient } from '@/components/team/team-page-client'
import type { Metadata } from 'next'
import { buildTwitterMetadata } from '@/lib/seo'

const title = 'Follow Your Team — 2026 World Cup Schedule Planner'
const description =
  'Pick your national team, see every fixture, and jump straight to host-city travel guides for each 2026 FIFA World Cup matchday.'
const imagePath = '/team/opengraph-image'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'World Cup team schedule',
    '2026 FIFA World Cup fixtures',
    'follow my team World Cup',
    'World Cup travel planner',
  ],
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    type: 'website',
    title,
    description,
    url: '/team',
    images: [
      {
        url: imagePath,
        width: 1200,
        height: 630,
        alt: 'Follow your team and plan every 2026 World Cup matchday',
      },
    ],
  },
  twitter: buildTwitterMetadata(
    title,
    description,
    imagePath,
    'Follow your team and plan every 2026 World Cup matchday'
  ),
}

export default async function TeamPage() {
  const teams = await getTeams()
  return <TeamPageClient teams={teams} />
}
