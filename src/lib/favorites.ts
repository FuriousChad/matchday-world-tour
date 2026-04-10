import type { SupabaseClient } from '@supabase/supabase-js'
import type { SavedItem } from '@/types'

export function favoriteKey(type: SavedItem['type'], id: string): string {
  return `${type}:${id}`
}

export async function fetchFavoriteKeys(supabase: SupabaseClient): Promise<Set<string>> {
  const { data, error } = await supabase
    .from('favorites')
    .select('city_id, place_id, match_id')

  if (error || !data) return new Set()

  const keys = new Set<string>()
  for (const row of data as { city_id: string | null; place_id: string | null; match_id: string | null }[]) {
    if (row.city_id)  keys.add(favoriteKey('city',  row.city_id))
    if (row.place_id) keys.add(favoriteKey('place', row.place_id))
    if (row.match_id) keys.add(favoriteKey('match', row.match_id))
  }
  return keys
}

export async function addSupabaseFavorite(
  supabase: SupabaseClient,
  userId: string,
  item: SavedItem
): Promise<void> {
  const row: Record<string, string> = { user_id: userId }
  if (item.type === 'city')  row.city_id  = item.id
  else if (item.type === 'place') row.place_id = item.id
  else row.match_id = item.id

  await supabase.from('favorites').insert(row)
}

export async function removeSupabaseFavorite(
  supabase: SupabaseClient,
  type: SavedItem['type'],
  id: string
): Promise<void> {
  const column = type === 'city' ? 'city_id' : type === 'place' ? 'place_id' : 'match_id'
  await supabase.from('favorites').delete().eq(column, id)
}
