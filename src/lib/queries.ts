import { createClient } from '@/lib/supabase/server'
import type { City, Match, Place, Post, Stadium, Team } from '@/types'

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
