import Link from 'next/link'
import { getCities, getFeaturedCities, getUpcomingMatches } from '@/lib/queries'
import { CityGrid } from '@/components/city/city-grid'
import { TeamSelector } from '@/components/team/team-selector'
import { UpcomingMatchesList } from '@/components/match/upcoming-matches-list'

export default async function HomePage() {
  const [cities, featured, upcomingMatches] = await Promise.all([
    getCities(),
    getFeaturedCities(),
    getUpcomingMatches(6),
  ])

  return (
    <div>
      <section className="bg-gradient-to-b from-green-950 to-green-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-green-300" style={{ fontFamily: 'var(--font-outfit, sans-serif)' }}>
            World Cup 2026 Planner
          </p>
          <h1
            className="leading-none text-white"
            style={{
              fontFamily: 'var(--font-bebas, sans-serif)',
              fontSize: 'clamp(3rem, 10vw, 5.5rem)',
              letterSpacing: '0.04em',
            }}
          >
            Follow Your Team From Kickoff to Final Whistle
          </h1>
          <p className="text-lg text-green-100" style={{ fontFamily: 'var(--font-outfit, sans-serif)' }}>
            Pick your nation, discover host cities, and map out every stop in your matchday journey.
          </p>
        </div>
      </section>

      <section className="border-b bg-muted/40 px-4 py-8">
        <div className="container mx-auto max-w-4xl">
          <TeamSelector />
        </div>
      </section>

      {upcomingMatches.length > 0 && (
        <section className="px-4 py-10">
          <div className="container mx-auto max-w-5xl rounded-2xl border bg-card p-5 shadow-sm md:p-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-xl font-semibold">Upcoming Matches</h2>
                <p className="text-sm text-muted-foreground">Your next six fixtures to plan around right now.</p>
              </div>
              <Link href="/team" className="text-sm font-semibold text-green-600 hover:underline">
                Open Team Hub →
              </Link>
            </div>
            <UpcomingMatchesList matches={upcomingMatches} />
          </div>
        </section>
      )}

      <section className="px-4 py-10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-1 text-xl font-semibold">Host Cities</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            11 cities. One tournament. Compare venues, travel tips, and match schedules in one place.
          </p>
          <CityGrid cities={cities} featured={featured} />
        </div>
      </section>
    </div>
  )
}
