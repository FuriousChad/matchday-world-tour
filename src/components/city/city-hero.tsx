import Image from 'next/image'
import type { City } from '@/types'

export function CityHero({ city }: { city: City }) {
  return (
    <div className="relative h-56 md:h-72 w-full">
      {city.hero_image_url ? (
        <Image
          src={city.hero_image_url}
          alt={city.name}
          fill
          priority
          className="object-cover"
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
