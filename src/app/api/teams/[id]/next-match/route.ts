import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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
    .or(`home_team_id.eq.${id},away_team_id.eq.${id}`)
    .gte('match_date', new Date().toISOString())
    .order('match_date')
    .limit(1)
    .single()

  if (error || !data) return NextResponse.json(null)
  return NextResponse.json(data)
}
