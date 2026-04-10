import Link from 'next/link'
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

export function CityGrid({ cities }: { cities: City[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => {
        const imageUrl = CITY_IMAGES[city.slug]
        return (
          <Link
            key={city.id}
            href={`/cities/${city.slug}`}
            className="group relative rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
            style={{
              border: '1px solid var(--color-border)',
              fontFamily: 'var(--font-outfit, sans-serif)',
            }}
          >
            {/* Photo */}
            <div className="relative h-40 overflow-hidden bg-muted">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-700" />
              )}
              {/* Dark gradient over bottom of photo */}
              <div
                className="absolute inset-x-0 bottom-0 h-16"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}
              />
              {/* Save button */}
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

            {/* Card footer */}
            <div
              className="px-3.5 py-3 flex items-center justify-between gap-2"
              style={{ background: 'var(--color-card)' }}
            >
              <div className="min-w-0">
                <h3
                  className="leading-none truncate text-foreground"
                  style={{
                    fontFamily: 'var(--font-bebas, sans-serif)',
                    fontSize: '1.15rem',
                    letterSpacing: '0.05em',
                  }}
                >
                  {city.name}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">{city.state}</p>
              </div>
              <span
                className="shrink-0 text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1.5 rounded-full transition-colors group-hover:opacity-80"
                style={{ color: '#d4a843', background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)' }}
              >
                Explore →
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
