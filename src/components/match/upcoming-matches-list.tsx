import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { formatMatchDate } from '@/lib/utils/date'
import type { Match } from '@/types'

export function UpcomingMatchesList({ matches }: { matches: Match[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => {
        const citySlug = match.city?.slug ?? ''
        return (
          <Link
            key={match.id}
            href={`/cities/${citySlug}`}
            className="rounded-xl border bg-card p-4 hover:shadow-md transition-shadow space-y-2"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <TeamFlag name={match.home_team?.name ?? 'TBD'} flagUrl={match.home_team?.flag_url ?? null} />
              <span className="text-muted-foreground">vs</span>
              <TeamFlag name={match.away_team?.name ?? 'TBD'} flagUrl={match.away_team?.flag_url ?? null} />
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

function TeamFlag({ name, flagUrl }: { name: string; flagUrl: string | null }) {
  return (
    <span className="flex items-center gap-1">
      {flagUrl && (
        <Image src={flagUrl} alt={name} width={18} height={12} className="rounded-sm object-cover" />
      )}
      <span className="truncate max-w-[80px]">{name}</span>
    </span>
  )
}
