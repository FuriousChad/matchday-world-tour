import { getTeams } from '@/lib/queries'
import { TeamPageClient } from '@/components/team/team-page-client'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Team',
  description: 'Select your World Cup team and follow their full schedule across all host cities.',
}

export default async function TeamPage() {
  const teams = await getTeams()
  return <TeamPageClient teams={teams} />
}
