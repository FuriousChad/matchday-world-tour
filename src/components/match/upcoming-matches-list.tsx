'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { formatMatchDate } from '@/lib/utils/date'
import { useMyTeam } from '@/hooks/use-my-team'
import type { Match } from '@/types'

export function UpcomingMatchesList({ matches }: { matches: Match[] }) {
  const myTeam = useMyTeam()

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => {
        const citySlug = match.city?.slug ?? ''
        const isMyTeam =
          myTeam != null &&
          (match.home_team?.id === myTeam.id || match.away_team?.id === myTeam.id)

        return (
          <Link
            key={match.id}
            href={`/cities/${citySlug}`}
            className={[
              'rounded-xl border p-4 transition-all duration-200 space-y-2',
              isMyTeam
                ? 'bg-green-500/5 border-green-500 shadow-[0_0_24px_rgba(34,197,94,0.12)] hover:shadow-[0_0_32px_rgba(34,197,94,0.2)] ring-1 ring-green-500/30'
                : 'bg-card hover:shadow-md',
            ].join(' ')}
          >
            {isMyTeam && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                ⚽ Your Team
              </span>
            )}
            <div className="flex items-center gap-2 text-sm font-medium">
              <TeamFlag name={match.home_team?.name ?? 'TBD'} flagUrl={match.home_team?.flag_url ?? null} highlight={myTeam?.id === match.home_team?.id} />
              <span className="text-muted-foreground">vs</span>
              <TeamFlag name={match.away_team?.name ?? 'TBD'} flagUrl={match.away_team?.flag_url ?? null} highlight={myTeam?.id === match.away_team?.id} />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">
                {formatMatchDate(match.match_date, citySlug, { includeTime: true })}
              </p>
              {match.city && (
                <p className="text-xs font-medium text-green-600">{match.city.name}</p>
              )}
              <Badge variant="secondary" className="text-xs">{match.stage}</Badge>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function TeamFlag({ name, flagUrl, highlight }: { name: string; flagUrl: string | null; highlight?: boolean }) {
  return (
    <span className={['flex items-center gap-1', highlight ? 'font-bold text-green-400' : ''].join(' ')}>
      {flagUrl && (
        <Image src={flagUrl} alt={name} width={18} height={12} className="rounded-sm object-cover" />
      )}
      <span className="truncate max-w-[80px]">{name}</span>
    </span>
  )
}
