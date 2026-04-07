import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { formatMatchDate } from '@/lib/utils/date'
import type { Match } from '@/types'

type Props = {
  matches: Match[]
  citySlug: string
}

export function MatchList({ matches, citySlug }: Props) {
  return (
    <div className="space-y-3">
      {matches.map((match) => (
        <div key={match.id} className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Teams */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <TeamDisplay
                name={match.home_team?.name ?? 'TBD'}
                flagUrl={match.home_team?.flag_url ?? null}
              />
              <span className="text-muted-foreground font-semibold text-sm shrink-0">vs</span>
              <TeamDisplay
                name={match.away_team?.name ?? 'TBD'}
                flagUrl={match.away_team?.flag_url ?? null}
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
      ))}
    </div>
  )
}

function TeamDisplay({ name, flagUrl }: { name: string; flagUrl: string | null }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      {flagUrl ? (
        <Image src={flagUrl} alt={name} width={24} height={16} className="rounded-sm object-cover shrink-0" />
      ) : (
        <div className="w-6 h-4 bg-muted rounded-sm shrink-0" />
      )}
      <span className="text-sm font-medium truncate">{name}</span>
    </div>
  )
}
