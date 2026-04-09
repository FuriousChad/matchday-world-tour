export type City = {
  id: string
  name: string
  slug: string
  state: string
  description: string
  hero_image_url: string | null
  travel_tips: string | null
  featured: boolean
  created_at: string
}

export type Stadium = {
  id: string
  city_id: string
  name: string
  capacity: number | null
  description: string | null
  image_url: string | null
}

export type Team = {
  id: string
  name: string
  slug: string
  flag_url: string | null
  group: string | null
  confederation: string | null
}

export type Match = {
  id: string
  city_id: string
  stadium_id: string
  home_team_id: string | null
  away_team_id: string | null
  match_date: string
  stage: string
  api_match_id: string | null
  home_score: number | null
  away_score: number | null
  status: string  // SCHEDULED | TIMED | IN_PLAY | PAUSED | FINISHED | POSTPONED | SUSPENDED | CANCELLED
  created_at: string
  // joined
  city?: City
  stadium?: Stadium
  home_team?: Team | null
  away_team?: Team | null
}

export type PlaceType = 'bar' | 'restaurant' | 'attraction'

export type Place = {
  id: string
  city_id: string
  name: string
  type: PlaceType
  description: string | null
  address: string | null
  maps_url: string | null
  image_url: string | null
  affiliate_url: string | null
  tags: string[] | null
  created_at: string
}

export type Itinerary = {
  id: string
  city_id: string
  title: string
  duration: string
  content: string
}

export type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image_url: string | null
  published: boolean
  published_at: string | null
  created_at: string
}

export type Favorite = {
  id: string
  user_id: string
  city_id: string | null
  place_id: string | null
  match_id: string | null
  created_at: string
}

// Saved list item — used for localStorage (guests) and Supabase (auth users)
export type SavedItem = {
  type: 'city' | 'place' | 'match'
  id: string
  label: string
  sublabel?: string
  image_url?: string | null
  href: string
  saved_at: string
}
