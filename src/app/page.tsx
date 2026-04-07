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
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-950 to-green-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Your World Cup<br />Travel Guide
          </h1>
          <p className="text-green-200 text-lg">
            Follow your team. Explore the cities. Make every matchday unforgettable.
          </p>
        </div>
      </section>

      {/* My Team */}
      <section className="border-b bg-muted/40 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <TeamSelector />
        </div>
      </section>

      {/* Upcoming Matches */}
      {upcomingMatches.length > 0 && (
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
            <UpcomingMatchesList matches={upcomingMatches} />
          </div>
        </section>
      )}

      {/* Host Cities */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold mb-1">Host Cities</h2>
          <p className="text-muted-foreground text-sm mb-6">
            11 cities. One tournament. Find everything you need for your trip.
          </p>
          <CityGrid cities={cities} featured={featured} />
        </div>
      </section>
    </div>
  )
}
