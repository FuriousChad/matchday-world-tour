'use client'

import Image from 'next/image'
import { formatMatchDate } from '@/lib/utils/date'
import { useMyTeam } from '@/hooks/use-my-team'
import type { Match } from '@/types'

type Props = {
  matches: Match[]
  citySlug: string
}

// Stage display order
const STAGE_ORDER = [
  'Group Stage',
  'Round of 32',
  'Round of 16',
  'Quarter-Final',
  'Semi-Final',
  'Third Place Play-off',
  'Final',
]

function groupByStage(matches: Match[]): [string, Match[]][] {
  const map = new Map<string, Match[]>()
  for (const m of matches) {
    const stage = m.stage ?? 'Other'
    if (!map.has(stage)) map.set(stage, [])
    map.get(stage)!.push(m)
  }
  const entries = Array.from(map.entries())
  entries.sort(([a], [b]) => {
    const ia = STAGE_ORDER.indexOf(a)
    const ib = STAGE_ORDER.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
  return entries
}

function isFinished(status: string) {
  return status === 'FINISHED'
}

function isLive(status: string) {
  return status === 'IN_PLAY' || status === 'PAUSED'
}

function isPostponed(status: string) {
  return status === 'POSTPONED' || status === 'SUSPENDED' || status === 'CANCELLED'
}

export function CityFixtures({ matches, citySlug }: Props) {
  const myTeam = useMyTeam()
  const stages = groupByStage(matches)

  return (
    <div className="space-y-10">
      {stages.map(([stage, stageMatches]) => (
        <div key={stage}>
          {/* Stage header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-muted-foreground px-1 shrink-0">
              {stage}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-2">
            {stageMatches.map((match) => {
              const isMyMatch =
                myTeam != null &&
                (match.home_team?.id === myTeam.id || match.away_team?.id === myTeam.id)
              const finished = isFinished(match.status)
              const live = isLive(match.status)
              const postponed = isPostponed(match.status)

              return (
                <FixtureCard
                  key={match.id}
                  match={match}
                  citySlug={citySlug}
                  isMyMatch={isMyMatch}
                  myTeamId={myTeam?.id ?? null}
                  finished={finished}
                  live={live}
                  postponed={postponed}
                />
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

type CardProps = {
  match: Match
  citySlug: string
  isMyMatch: boolean
  myTeamId: string | null
  finished: boolean
  live: boolean
  postponed: boolean
}

function FixtureCard({ match, citySlug, isMyMatch, myTeamId, finished, live, postponed }: CardProps) {
  const homeWon = finished && match.home_score != null && match.away_score != null && match.home_score > match.away_score
  const awayWon = finished && match.home_score != null && match.away_score != null && match.away_score > match.home_score

  return (
    <div
      className={[
        'group relative rounded-xl border overflow-hidden transition-all duration-200',
        isMyMatch
          ? 'border-green-500/60 bg-green-500/[0.03] shadow-[0_0_20px_rgba(34,197,94,0.08)]'
          : 'border-border bg-card hover:border-border/80 hover:shadow-sm',
      ].join(' ')}
    >
      {/* My team accent bar */}
      {isMyMatch && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-green-500 rounded-l-xl" />
      )}

      <div className="px-4 py-3 pl-5">
        {/* My team label */}
        {isMyMatch && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-green-500">
              Your Team
            </span>
          </div>
        )}

        {/* Main row: Home | Score/VS | Away */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          {/* Home team */}
          <TeamSide
            name={match.home_team?.name ?? 'TBD'}
            flagUrl={match.home_team?.flag_url ?? null}
            align="right"
            highlight={myTeamId === match.home_team?.id}
            dimmed={finished && awayWon}
          />

          {/* Center: score or date */}
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            {finished ? (
              <ScoreDisplay
                home={match.home_score}
                away={match.away_score}
              />
            ) : live ? (
              <LiveDisplay />
            ) : postponed ? (
              <PostponedDisplay />
            ) : (
              <UpcomingDisplay match={match} citySlug={citySlug} />
            )}
          </div>

          {/* Away team */}
          <TeamSide
            name={match.away_team?.name ?? 'TBD'}
            flagUrl={match.away_team?.flag_url ?? null}
            align="left"
            highlight={myTeamId === match.away_team?.id}
            dimmed={finished && homeWon}
          />
        </div>

        {/* Footer: stadium + date */}
        <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <span className="truncate">
            {match.stadium?.name ?? ''}
          </span>
          {finished && (
            <span className="shrink-0 text-[10px] font-medium text-muted-foreground/70">
              {formatMatchDate(match.match_date, citySlug, { includeTime: false })}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function TeamSide({
  name,
  flagUrl,
  align,
  highlight,
  dimmed,
}: {
  name: string
  flagUrl: string | null
  align: 'left' | 'right'
  highlight?: boolean
  dimmed?: boolean
}) {
  return (
    <div
      className={[
        'flex items-center gap-2 min-w-0',
        align === 'right' ? 'flex-row-reverse' : 'flex-row',
        dimmed ? 'opacity-45' : '',
      ].join(' ')}
    >
      {flagUrl ? (
        <Image
          src={flagUrl}
          alt={name}
          width={28}
          height={20}
          className="rounded object-cover shrink-0 shadow-sm"
        />
      ) : (
        <div className="w-7 h-5 rounded bg-muted shrink-0" />
      )}
      <span
        className={[
          'text-sm leading-tight truncate',
          highlight ? 'font-bold text-green-500 dark:text-green-400' : 'font-semibold',
          align === 'right' ? 'text-right' : 'text-left',
        ].join(' ')}
      >
        {name}
      </span>
    </div>
  )
}

function ScoreDisplay({ home, away }: { home: number | null; away: number | null }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tabular-nums leading-none font-mono">
          {home ?? '–'}
        </span>
        <span className="text-base text-muted-foreground/40 font-light leading-none">–</span>
        <span className="text-2xl font-bold tabular-nums leading-none font-mono">
          {away ?? '–'}
        </span>
      </div>
      <span className="text-[9px] tracking-[0.15em] uppercase font-bold text-muted-foreground/60 mt-0.5">
        Full Time
      </span>
    </div>
  )
}

function LiveDisplay() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5 bg-red-500/10 rounded-full px-2.5 py-1">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-bold tracking-widest uppercase text-red-500">
          Live
        </span>
      </div>
    </div>
  )
}

function PostponedDisplay() {
  return (
    <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 bg-muted rounded-full px-2.5 py-1">
      TBD
    </span>
  )
}

function UpcomingDisplay({ match, citySlug }: { match: Match; citySlug: string }) {
  const date = new Date(match.match_date)
  const isValidDate = !isNaN(date.getTime())

  if (!isValidDate) {
    return (
      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
        TBD
      </span>
    )
  }

  // City timezone map (mirrors date utils)
  const CITY_TZ: Record<string, string> = {
    'new-york-new-jersey': 'America/New_York',
    'boston':              'America/New_York',
    'philadelphia':        'America/New_York',
    'miami':               'America/New_York',
    'atlanta':             'America/New_York',
    'kansas-city':         'America/Chicago',
    'dallas':              'America/Chicago',
    'houston':             'America/Chicago',
    'los-angeles':         'America/Los_Angeles',
    'san-francisco':       'America/Los_Angeles',
    'seattle':             'America/Los_Angeles',
  }
  const tz = CITY_TZ[citySlug] ?? 'America/New_York'

  const dayStr = date.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short' })
  const monthDay = date.toLocaleDateString('en-US', { timeZone: tz, month: 'short', day: 'numeric' })
  const timeStr = date.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' })
  const tzAbbr = date.toLocaleTimeString('en-US', { timeZone: tz, timeZoneName: 'short' }).split(' ').pop() ?? ''

  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
        {dayStr} · {monthDay}
      </span>
      <span className="text-sm font-bold tabular-nums text-foreground">
        {timeStr}
      </span>
      <span className="text-[9px] tracking-wider uppercase text-muted-foreground/60">
        {tzAbbr}
      </span>
    </div>
  )
}
