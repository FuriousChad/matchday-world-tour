'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getMyTeam, setMyTeam, clearMyTeam } from '@/lib/my-team'
import { formatMatchDate } from '@/lib/utils/date'
import type { Match, Team } from '@/types'

export function TeamPageClient({ teams }: { teams: Team[] }) {
  const [myTeam, setMyTeamState] = useState<Team | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [loadingMatches, setLoadingMatches] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const saved = getMyTeam()
    if (saved) {
      setMyTeamState(saved)
      fetchMatches(saved.id)
    }
  }, [])

  async function fetchMatches(teamId: string) {
    setLoadingMatches(true)
    const res = await fetch(`/api/teams/${teamId}/matches`)
    if (res.ok) setMatches(await res.json())
    setLoadingMatches(false)
  }

  function selectTeam(team: Team) {
    setMyTeam(team)
    setMyTeamState(team)
    fetchMatches(team.id)
  }

  function removeTeam() {
    clearMyTeam()
    setMyTeamState(null)
    setMatches([])
  }

  const filtered = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 pb-20 md:pb-8">
      {myTeam ? (
        <>
          {/* Active team header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {myTeam.flag_url && (
                <Image src={myTeam.flag_url} alt={myTeam.name} width={48} height={32} className="rounded object-cover" />
              )}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Following</p>
                <h1 className="text-2xl font-bold">{myTeam.name}</h1>
              </div>
            </div>
            <button onClick={removeTeam} className="text-sm text-muted-foreground hover:text-foreground">
              Change team
            </button>
          </div>

          {/* Match schedule */}
          <h2 className="text-lg font-semibold mb-4">Full Schedule</h2>
          {loadingMatches ? (
            <p className="text-muted-foreground text-sm">Loading matches...</p>
          ) : matches.length === 0 ? (
            <p className="text-muted-foreground text-sm">No matches scheduled yet.</p>
          ) : (
            <div className="space-y-3">
              {matches.map((match) => {
                const citySlug = match.city?.slug ?? ''
                const opponent =
                  match.home_team?.id === myTeam.id
                    ? match.away_team
                    : match.home_team
                const isHome = match.home_team?.id === myTeam.id

                return (
                  <Link
                    key={match.id}
                    href={`/cities/${citySlug}`}
                    className="flex items-center justify-between rounded-xl border bg-card p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-0.5">
                      <p className="font-medium text-sm">
                        {isHome ? 'vs' : '@'}{' '}
                        {opponent?.name ?? 'TBD'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatMatchDate(match.match_date, citySlug, { includeTime: true })}
                      </p>
                      <p className="text-xs text-green-600 font-medium">{match.city?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{match.stage}</p>
                      <p className="text-xs text-muted-foreground mt-1">Explore city →</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-1">Pick Your Team</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Follow your team&apos;s full schedule and get city guides for every matchday.
          </p>
          <input
            type="search"
            placeholder="Search teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm mb-6 bg-background"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((team) => (
              <button
                key={team.id}
                onClick={() => selectTeam(team)}
                className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 hover:shadow-md transition-shadow text-left"
              >
                {team.flag_url && (
                  <Image src={team.flag_url} alt={team.name} width={32} height={22} className="rounded object-cover shrink-0" />
                )}
                <span className="text-sm font-medium truncate">{team.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
