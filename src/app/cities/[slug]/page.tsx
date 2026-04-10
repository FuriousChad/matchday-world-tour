import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getCityBySlug,
  getStadiumByCity,
  getMatchesByCity,
  getPlacesByCity,
} from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { CityHero } from '@/components/city/city-hero'
import { StadiumCard } from '@/components/city/stadium-card'
import { CityFixtures } from '@/components/match/city-fixtures'
import { PlaceGrid } from '@/components/city/place-grid'
import { ItinerarySection } from '@/components/city/itinerary-section'
import { TravelTips } from '@/components/city/travel-tips'
import { buildTwitterMetadata, toAbsoluteUrl, trimDescription } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const city = await getCityBySlug(slug)
  if (!city) return {}

  const description = trimDescription(city.description)
  const pageTitle = `${city.name}, ${city.state} — 2026 World Cup City Guide`
  const pagePath = `/cities/${slug}`
  const imagePath = `${pagePath}/opengraph-image`

  return {
    title: pageTitle,
    description,
    keywords: [
      `${city.name} World Cup travel guide`,
      `${city.name} 2026 FIFA World Cup`,
      `${city.name} matchday itinerary`,
      `${city.name} stadium guide`,
    ],
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      type: 'article',
      title: pageTitle,
      description,
      url: pagePath,
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 630,
          alt: `${city.name} 2026 World Cup city guide`,
        },
      ],
    },
    twitter: buildTwitterMetadata(
      pageTitle,
      description,
      imagePath,
      `${city.name} 2026 World Cup city guide`
    ),
    other: {
      'og:image:secure_url': toAbsoluteUrl(imagePath),
    },
  }
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params
  const city = await getCityBySlug(slug)
  if (!city) notFound()

  const supabase = await createClient()
  const [stadium, matches, places, itineraryResult] = await Promise.all([
    getStadiumByCity(city.id),
    getMatchesByCity(city.id),
    getPlacesByCity(city.id),
    supabase.from('itineraries').select('*').eq('city_id', city.id).order('duration'),
  ])

  const itineraries = itineraryResult.data ?? []
  const bars        = places.filter((p) => p.type === 'bar')
  const restaurants = places.filter((p) => p.type === 'restaurant')
  const attractions = places.filter((p) => p.type === 'attraction')

  return (
    <div className="pb-20 md:pb-0">
      <CityHero city={city} />

      <div className="container mx-auto max-w-4xl px-4 py-8 space-y-12">

        {stadium && (
          <section id="stadium">
            <h2 className="text-xl font-semibold mb-4">Stadium</h2>
            <StadiumCard stadium={stadium} />
          </section>
        )}

        {matches.length > 0 && (
          <section id="matches">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-xl font-semibold">Matches</h2>
              <span className="text-sm text-muted-foreground">{matches.length} fixture{matches.length !== 1 ? 's' : ''}</span>
            </div>
            <CityFixtures matches={matches} citySlug={slug} />
          </section>
        )}

        {bars.length > 0 && (
          <section id="spots">
            <h2 className="text-xl font-semibold mb-4">Matchday Spots</h2>
            <PlaceGrid places={bars} citySlug={slug} />
          </section>
        )}

        {restaurants.length > 0 && (
          <section id="food">
            <h2 className="text-xl font-semibold mb-4">Food & Drink</h2>
            <PlaceGrid places={restaurants} citySlug={slug} />
          </section>
        )}

        {attractions.length > 0 && (
          <section id="attractions">
            <h2 className="text-xl font-semibold mb-4">Attractions</h2>
            <PlaceGrid places={attractions} citySlug={slug} />
          </section>
        )}

        {city.travel_tips && (
          <section id="tips">
            <h2 className="text-xl font-semibold mb-4">Travel Tips</h2>
            <TravelTips content={city.travel_tips} />
          </section>
        )}

        {itineraries.length > 0 && (
          <section id="itinerary">
            <h2 className="text-xl font-semibold mb-4">Matchday Itinerary</h2>
            <ItinerarySection itineraries={itineraries} />
          </section>
        )}

      </div>
    </div>
  )
}
