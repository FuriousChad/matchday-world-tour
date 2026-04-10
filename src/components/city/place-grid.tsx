import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { SaveButton } from '@/components/shared/save-button'
import type { Place } from '@/types'

export function PlaceGrid({ places, citySlug }: { places: Place[]; citySlug: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {places.map((place) => (
        <div key={place.id} className="rounded-xl border bg-card overflow-hidden">
          {place.image_url ? (
            <div className="relative h-36">
              <Image src={place.image_url} alt={place.name} fill className="object-cover" />
            </div>
          ) : null}
          <div className="p-4 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-sm">{place.name}</h3>
              <SaveButton
                type="place"
                id={place.id}
                label={place.name}
                image_url={place.image_url}
                href={`/cities/${citySlug}`}
                className="shrink-0 -mt-0.5"
              />
            </div>
            {place.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{place.description}</p>
            )}
            {place.tags && place.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {place.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex gap-3 pt-1">
              {place.maps_url && (
                <a
                  href={place.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-600 font-medium hover:underline"
                >
                  Get Directions →
                </a>
              )}
              {place.affiliate_url && (
                <a
                  href={place.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  Book Now →
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
