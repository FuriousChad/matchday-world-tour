import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { City } from '@/types'

type Props = {
  cities: City[]
  featured: City[]
}

export function CityGrid({ cities, featured }: Props) {
  const featuredIds = new Set(featured.map((c) => c.id))

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((city) => (
        <Link
          key={city.id}
          href={`/cities/${city.slug}`}
          className="group relative rounded-xl overflow-hidden border hover:shadow-lg transition-shadow bg-card"
        >
          <div className="relative h-40">
            {city.hero_image_url ? (
              <Image
                src={city.hero_image_url}
                alt={city.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-800 to-green-600" />
            )}
            {featuredIds.has(city.id) && (
              <Badge className="absolute top-2 left-2 bg-green-600 text-white border-0">
                Featured
              </Badge>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-sm">{city.name}</h3>
            <p className="text-xs text-muted-foreground">{city.state}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
