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

  const nonFeaturedCities = cities.filter((city) => !featured.some((featuredCity) => featuredCity.id === city.id))

  return (
    <div className="pb-20 md:pb-0">
      <section className="bg-gradient-to-b from-green-950 to-green-900 px-4 py-16 text-white">
        <div className="container mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-green-200">World Cup 2026 Planner</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Follow your team from kickoff to final whistle
          </h1>
          <p className="text-lg text-green-100">
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

      {featured.length > 0 && (
        <section id="featured-cities" className="px-4 py-10">
          <div className="container mx-auto max-w-5xl">
            <h2 className="mb-1 text-xl font-semibold">Featured Cities</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Start with the highest-demand destinations and lock in your plans early.
            </p>
            <CityGrid cities={featured} featured={featured} />
          </div>
        </section>
      )}

      <section className="px-4 py-10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="mb-1 text-xl font-semibold">All Host Cities</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            11 cities. One tournament. Compare venues, travel tips, and match schedules.
          </p>
          <CityGrid cities={nonFeaturedCities} featured={featured} />
        </div>
      </section>
    </div>
  )
}
