'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { formatMatchDate } from '@/lib/utils/date'
import { useMyTeam } from '@/hooks/use-my-team'
import type { Match } from '@/types'

type Props = {
  matches: Match[]
  citySlug: string
}

export function MatchList({ matches, citySlug }: Props) {
  const myTeam = useMyTeam()

  return (
    <div className="space-y-3">
      {matches.map((match) => {
        const isMyTeam =
          myTeam != null &&
          (match.home_team?.id === myTeam.id || match.away_team?.id === myTeam.id)

        return (
          <div
            key={match.id}
            className={[
              'rounded-xl border p-4 transition-all duration-200',
              isMyTeam
                ? 'bg-green-500/5 border-green-500 shadow-[0_0_24px_rgba(34,197,94,0.12)] ring-1 ring-green-500/30'
                : 'bg-card',
            ].join(' ')}
          >
            {isMyTeam && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full mb-2">
                ⚽ Your Team
              </span>
            )}
            <div className="flex items-center justify-between gap-4">
              {/* Teams */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <TeamDisplay
                  name={match.home_team?.name ?? 'TBD'}
                  flagUrl={match.home_team?.flag_url ?? null}
                  highlight={myTeam?.id === match.home_team?.id}
                />
                <span className="text-muted-foreground font-semibold text-sm shrink-0">vs</span>
                <TeamDisplay
                  name={match.away_team?.name ?? 'TBD'}
                  flagUrl={match.away_team?.flag_url ?? null}
                  highlight={myTeam?.id === match.away_team?.id}
                />
              </div>
              {/* Meta */}
              <div className="text-right shrink-0">
                <Badge variant="secondary" className="text-xs mb-1">{match.stage}</Badge>
                <p className="text-xs text-muted-foreground">
                  {formatMatchDate(match.match_date, citySlug, { includeTime: true })}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function TeamDisplay({ name, flagUrl, highlight }: { name: string; flagUrl: string | null; highlight?: boolean }) {
  return (
    <div className={['flex items-center gap-2 min-w-0', highlight ? 'font-bold text-green-400' : ''].join(' ')}>
      {flagUrl ? (
        <Image src={flagUrl} alt={name} width={24} height={16} className="rounded-sm object-cover shrink-0" />
      ) : (
        <div className="w-6 h-4 bg-muted rounded-sm shrink-0" />
      )}
      <span className={['text-sm truncate', highlight ? 'font-bold' : 'font-medium'].join(' ')}>{name}</span>
    </div>
  )
}
