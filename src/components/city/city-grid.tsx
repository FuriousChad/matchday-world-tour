import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { SaveButton } from '@/components/shared/save-button'
import type { City } from '@/types'

const CITY_IMAGES: Record<string, string> = {
  'new-york-new-jersey': '/images/cities/new-york-new-jersey.jpg',
  'los-angeles':         '/images/cities/los-angeles.jpg',
  'kansas-city':         '/images/cities/kansas-city.jpg',
  'miami':               '/images/cities/miami.jpg',
  'dallas':              '/images/cities/dallas.jpg',
  'atlanta':             '/images/cities/atlanta.jpg',
  'seattle':             '/images/cities/seattle.jpg',
  'san-francisco':       '/images/cities/san-francisco.jpg',
  'philadelphia':        '/images/cities/philadelphia.jpg',
  'boston':              '/images/cities/boston.jpg',
  'houston':             '/images/cities/houston.jpg',
}

type Props = {
  cities: City[]
  featured: City[]
}

export function CityGrid({ cities, featured }: Props) {
  const featuredIds = new Set(featured.map((c) => c.id))

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => {
        const imageUrl = CITY_IMAGES[city.slug]
        return (
        <Link
          key={city.id}
          href={`/cities/${city.slug}`}
          className="group relative rounded-xl overflow-hidden border hover:shadow-lg transition-shadow bg-card"
        >
          <div className="relative h-40 overflow-hidden">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600" />
            )}
            {featuredIds.has(city.id) && (
              <Badge className="absolute top-2 left-2 bg-green-600 text-white border-0">
                Featured
              </Badge>
            )}
            <SaveButton
              type="city"
              id={city.id}
              label={city.name}
              sublabel={city.state}
              image_url={imageUrl ?? null}
              href={`/cities/${city.slug}`}
              className="absolute top-2 right-2 shadow-sm"
            />
          </div>
          <div className="p-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-sm truncate">{city.name}</h3>
              <p className="text-xs text-muted-foreground">{city.state}</p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-950/40 px-2 py-1 rounded-full whitespace-nowrap">
              See Matches →
            </span>
          </div>
        </Link>
        )
      })}
    </div>
  )
}
