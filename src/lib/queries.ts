import { createClient } from '@/lib/supabase/server'
import type { City, Match, Place, Post, Stadium, Team, SavedItem } from '@/types'

// ─── Cities ──────────────────────────────────────────────────────────────────

export async function getCities(): Promise<City[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('name')
  if (error) throw error
  return data ?? []
}

export async function getFeaturedCities(): Promise<City[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('featured', true)
    .order('name')
  if (error) throw error
  return data ?? []
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

// ─── Stadiums ─────────────────────────────────────────────────────────────────

export async function getStadiumByCity(cityId: string): Promise<Stadium | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('stadiums')
    .select('*')
    .eq('city_id', cityId)
    .single()
  if (error) return null
  return data
}

// ─── Matches ──────────────────────────────────────────────────────────────────

export async function getMatchesByCity(cityId: string): Promise<Match[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      city:cities(*),
      stadium:stadiums(*),
      home_team:teams!matches_home_team_id_fkey(*),
      away_team:teams!matches_away_team_id_fkey(*)
    `)
    .eq('city_id', cityId)
    .order('match_date')
  if (error) throw error
  return data ?? []
}

export async function getMatchesByTeam(teamId: string): Promise<Match[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      city:cities(*),
      stadium:stadiums(*),
      home_team:teams!matches_home_team_id_fkey(*),
      away_team:teams!matches_away_team_id_fkey(*)
    `)
    .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`)
    .order('match_date')
  if (error) throw error
  return data ?? []
}

export async function getMatchById(id: string): Promise<Match | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      city:cities(*),
      stadium:stadiums(*),
      home_team:teams!matches_home_team_id_fkey(*),
      away_team:teams!matches_away_team_id_fkey(*)
    `)
    .eq('id', id)
    .single()
  if (error) return null
  return data
}

export async function getUpcomingMatches(limit = 6): Promise<Match[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      city:cities(*),
      stadium:stadiums(*),
      home_team:teams!matches_home_team_id_fkey(*),
      away_team:teams!matches_away_team_id_fkey(*)
    `)
    .gte('match_date', new Date().toISOString())
    .order('match_date')
    .limit(limit)
  if (error) throw error
  return data ?? []
}

// ─── Places ───────────────────────────────────────────────────────────────────

export async function getPlacesByCity(cityId: string): Promise<Place[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('city_id', cityId)
    .order('name')
  if (error) throw error
  return data ?? []
}

// ─── Teams ────────────────────────────────────────────────────────────────────

export async function getTeams(): Promise<Team[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('name')
  if (error) throw error
  return data ?? []
}

export async function getTeamBySlug(slug: string): Promise<Team | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data
}

// ─── Saved Items (auth users) ─────────────────────────────────────────────────

const CITY_IMAGE_MAP: Record<string, string> = {
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

export async function getSavedItemsForUser(): Promise<SavedItem[]> {
  const supabase = await createClient()

  const { data: favs, error } = await supabase
    .from('favorites')
    .select('id, city_id, place_id, match_id, created_at')
    .order('created_at', { ascending: false })

  if (error || !favs || favs.length === 0) return []

  const cityIds  = favs.filter((f) => f.city_id).map((f) => f.city_id as string)
  const placeIds = favs.filter((f) => f.place_id).map((f) => f.place_id as string)
  const matchIds = favs.filter((f) => f.match_id).map((f) => f.match_id as string)

  const [citiesRes, placesRes, matchesRes] = await Promise.all([
    cityIds.length
      ? supabase.from('cities').select('id, name, slug, state').in('id', cityIds)
      : Promise.resolve({ data: [] as Pick<City, 'id' | 'name' | 'slug' | 'state'>[] }),
    placeIds.length
      ? supabase.from('places').select('id, name, image_url, city_id').in('id', placeIds)
      : Promise.resolve({ data: [] as Pick<Place, 'id' | 'name' | 'image_url' | 'city_id'>[] }),
    matchIds.length
      ? supabase
          .from('matches')
          .select('id, stage, match_date, city_id, home_team:teams!matches_home_team_id_fkey(name), away_team:teams!matches_away_team_id_fkey(name), city:cities(name, slug)')
          .in('id', matchIds)
      : Promise.resolve({ data: [] as unknown[] }),
  ])

  const cityMap  = Object.fromEntries(((citiesRes.data ?? []) as Pick<City, 'id' | 'name' | 'slug' | 'state'>[]).map((c) => [c.id, c]))
  const placeMap = Object.fromEntries(((placesRes.data ?? []) as Pick<Place, 'id' | 'name' | 'image_url' | 'city_id'>[]).map((p) => [p.id, p]))

  // Fetch city info for places
  const placeCityIds = [...new Set(Object.values(placeMap).map((p) => p.city_id).filter(Boolean))]
  const placeCitiesRes = placeCityIds.length
    ? await supabase.from('cities').select('id, name, slug').in('id', placeCityIds)
    : { data: [] as Pick<City, 'id' | 'name' | 'slug'>[] }
  const placeCityMap = Object.fromEntries(((placeCitiesRes.data ?? []) as Pick<City, 'id' | 'name' | 'slug'>[]).map((c) => [c.id, c]))

  type MatchRow = { id: string; stage: string; match_date: string; home_team: { name: string } | null; away_team: { name: string } | null; city: { name: string; slug: string } | null }
  const matchMap = Object.fromEntries(((matchesRes.data ?? []) as MatchRow[]).map((m) => [m.id, m]))

  const items: SavedItem[] = []

  for (const fav of favs) {
    if (fav.city_id) {
      const city = cityMap[fav.city_id]
      if (city) {
        items.push({ type: 'city', id: fav.city_id, label: city.name, sublabel: city.state, image_url: CITY_IMAGE_MAP[city.slug] ?? null, href: `/cities/${city.slug}`, saved_at: fav.created_at })
      }
    } else if (fav.place_id) {
      const place = placeMap[fav.place_id]
      if (place) {
        const city = placeCityMap[place.city_id]
        items.push({ type: 'place', id: fav.place_id, label: place.name, sublabel: city?.name, image_url: place.image_url, href: city ? `/cities/${city.slug}` : '/', saved_at: fav.created_at })
      }
    } else if (fav.match_id) {
      const match = matchMap[fav.match_id]
      if (match) {
        const home = match.home_team?.name ?? 'TBD'
        const away = match.away_team?.name ?? 'TBD'
        items.push({ type: 'match', id: fav.match_id, label: `${home} vs ${away}`, sublabel: match.city ? `${match.city.name} · ${match.stage}` : match.stage, href: match.city ? `/cities/${match.city.slug}` : '/', saved_at: fav.created_at })
      }
    }
  }

  return items
}
