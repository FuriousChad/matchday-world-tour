import type { City } from '@/types'

const CITY_IMAGES: Record<string, string> = {
  'new-york-new-jersey': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Lower_Manhattan_from_Governors_Island_September_2016_panorama_1.jpg/1600px-Lower_Manhattan_from_Governors_Island_September_2016_panorama_1.jpg',
  'los-angeles':         'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Los_Angeles_downtown_sunset_cityscape.jpg/1600px-Los_Angeles_downtown_sunset_cityscape.jpg',
  'kansas-city':         'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Downtown_Kansas_City_from_Liberty_Memorial_Full.jpg/1600px-Downtown_Kansas_City_from_Liberty_Memorial_Full.jpg',
  'miami':               'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Downtown_Miami_Panorama_from_the_Rusty_Pelican_photo_D_Ramey_Logan.jpg/1600px-Downtown_Miami_Panorama_from_the_Rusty_Pelican_photo_D_Ramey_Logan.jpg',
  'dallas':              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Dallas_Skyline_with_Arts_District.jpg/1600px-Dallas_Skyline_with_Arts_District.jpg',
  'atlanta':             'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Midtown_Atlanta_skyline_from_Clara_Meer_in_Piedmont_Park.JPG/1600px-Midtown_Atlanta_skyline_from_Clara_Meer_in_Piedmont_Park.JPG',
  'seattle':             'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/SeattleI5Skyline.jpg/1600px-SeattleI5Skyline.jpg',
  'san-francisco':       'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/San_Francisco_Panorama_from_Twin_Peaks_2013.jpg/1600px-San_Francisco_Panorama_from_Twin_Peaks_2013.jpg',
  'philadelphia':        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Philadelphia_skyline_from_South_Street_Bridge.jpg/1600px-Philadelphia_skyline_from_South_Street_Bridge.jpg',
  'boston':              'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Boston_skyline_from_Longfellow_Bridge_September_2017_panorama_2.jpg/1600px-Boston_skyline_from_Longfellow_Bridge_September_2017_panorama_2.jpg',
  'houston':             'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Houston_Skyline11.jpg/1600px-Houston_Skyline11.jpg',
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
