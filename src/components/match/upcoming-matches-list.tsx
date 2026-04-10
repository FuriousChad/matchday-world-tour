'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatMatchDate } from '@/lib/utils/date'
import { useMyTeam } from '@/hooks/use-my-team'
import type { Match } from '@/types'

export function UpcomingMatchesList({ matches }: { matches: Match[] }) {
  const myTeam = useMyTeam()

  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => {
        const citySlug = match.city?.slug ?? ''
        const isMyTeam =
          myTeam != null &&
          (match.home_team?.id === myTeam.id || match.away_team?.id === myTeam.id)

        return (
          <Link
            key={match.id}
            href={`/cities/${citySlug}`}
            className="group block rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.01] hover:shadow-lg"
            style={{
              background: isMyTeam ? 'rgba(34,197,94,0.06)' : 'var(--color-card)',
              border: isMyTeam
                ? '1px solid rgba(34,197,94,0.35)'
                : '1px solid var(--color-border)',
              fontFamily: 'var(--font-outfit, sans-serif)',
            }}
          >
            {/* My team accent bar */}
            {isMyTeam && (
              <div className="h-[2px] w-full bg-green-500 opacity-70" />
            )}

            <div className="p-4">
              {/* Your team chip */}
              {isMyTeam && (
                <div className="flex items-center gap-1.5 mb-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-green-500">
                    Your Team
                  </span>
                </div>
              )}

              {/* Teams */}
              <div className="grid items-center gap-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
                <MatchTeam
                  name={match.home_team?.name ?? 'TBD'}
                  flagUrl={match.home_team?.flag_url ?? null}
                  align="right"
                  highlight={myTeam?.id === match.home_team?.id}
                />
                <span
                  className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/50 text-center"
                >
                  vs
                </span>
                <MatchTeam
                  name={match.away_team?.name ?? 'TBD'}
                  flagUrl={match.away_team?.flag_url ?? null}
                  align="left"
                  highlight={myTeam?.id === match.away_team?.id}
                />
              </div>

              {/* Footer */}
              <div
                className="mt-3 pt-3 flex items-center justify-between gap-2"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <div className="min-w-0">
                  <p className="text-[11px] text-muted-foreground truncate">
                    {formatMatchDate(match.match_date, citySlug, { includeTime: false })}
                  </p>
                  {match.city && (
                    <p className="text-[11px] font-semibold truncate" style={{ color: '#d4a843' }}>
                      {match.city.name}
                    </p>
                  )}
                </div>
                <span
                  className="text-[9px] font-bold tracking-[0.15em] uppercase shrink-0 px-2 py-1 rounded-full"
                  style={{
                    color: 'var(--color-muted-foreground)',
                    background: 'var(--color-muted)',
                  }}
                >
                  {match.stage === 'Group Stage' ? 'Group' : match.stage}
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function MatchTeam({
  name,
  flagUrl,
  align,
  highlight,
}: {
  name: string
  flagUrl: string | null
  align: 'left' | 'right'
  highlight?: boolean
}) {
  return (
    <div className={['flex items-center gap-1.5 min-w-0', align === 'right' ? 'flex-row-reverse' : ''].join(' ')}>
      {flagUrl ? (
        <Image
          src={flagUrl}
          alt={name}
          width={22}
          height={15}
          className="rounded-[2px] object-cover shrink-0 shadow-sm"
        />
      ) : (
        <div className="w-[22px] h-[15px] rounded bg-muted shrink-0" />
      )}
      <span
        className={[
          'text-xs leading-tight truncate',
          align === 'right' ? 'text-right' : '',
          highlight ? 'font-bold' : 'font-medium',
        ].join(' ')}
        style={highlight ? { color: '#22c55e' } : undefined}
      >
        {name}
      </span>
    </div>
  )
}
