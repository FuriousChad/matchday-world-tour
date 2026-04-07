'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getMyTeam } from '@/lib/my-team'
import { isWithin48Hours, formatMatchDate } from '@/lib/utils/date'
import type { Match } from '@/types'

export function MatchBanner() {
  const [upcomingMatch, setUpcomingMatch] = useState<Match | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const team = getMyTeam()
    if (!team) return

    async function fetchNextMatch() {
      const res = await fetch(`/api/teams/${team!.id}/next-match`)
      if (!res.ok) return
      const match: Match = await res.json()
      if (match && isWithin48Hours(match.match_date)) {
        setUpcomingMatch(match)
      }
    }

    fetchNextMatch()
  }, [])

  if (!upcomingMatch || dismissed) return null

  const citySlug = upcomingMatch.city?.slug ?? ''
  const homeTeam = upcomingMatch.home_team?.name ?? 'TBD'
  const awayTeam = upcomingMatch.away_team?.name ?? 'TBD'
  const dateLabel = formatMatchDate(upcomingMatch.match_date, citySlug, { includeTime: true })

  return (
    <div className="bg-green-600 text-white text-sm">
      <div className="container mx-auto flex items-center justify-between gap-2 px-4 py-2">
        <p className="font-medium">
          ⚽ Your team plays soon —{' '}
          <Link href={`/cities/${citySlug}`} className="underline underline-offset-2">
            {homeTeam} vs {awayTeam}
          </Link>
          {' · '}{dateLabel}
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="shrink-0 opacity-80 hover:opacity-100 text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}
