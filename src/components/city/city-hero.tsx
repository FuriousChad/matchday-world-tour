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

export function CityHero({ city }: { city: City }) {
  const imageUrl = CITY_IMAGES[city.slug] ?? city.hero_image_url

  return (
    <div className="relative h-56 md:h-72 w-full overflow-hidden">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-green-900 to-green-700" />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <p className="text-sm text-green-300 uppercase tracking-widest mb-1">{city.state} · USA</p>
        <h1 className="text-3xl md:text-4xl font-bold">{city.name}</h1>
        {city.description && (
          <p className="mt-2 text-sm text-white/80 max-w-xl line-clamp-2">{city.description}</p>
        )}
      </div>
    </div>
  )
}
