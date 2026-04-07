import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import {
  fetchWCMatches,
  normaliseTeamName,
  formatStage,
  MATCH_CITY_MAP,
} from '@/lib/football-data'

// Protect the sync endpoint with a secret so it can't be triggered publicly
function isAuthorised(request: Request): boolean {
  const secret = request.headers.get('x-sync-secret')
  return secret === process.env.SYNC_SECRET
}

export async function POST(request: Request) {
  if (!isAuthorised(request)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  try {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // ── 1. Fetch all WC matches from the API ─────────────────────────────
    const apiMatches = await fetchWCMatches()

    // ── 2. Load lookup tables from Supabase ──────────────────────────────
    const [{ data: teams }, { data: cities }, { data: stadiums }] = await Promise.all([
      supabase.from('teams').select('id, name'),
      supabase.from('cities').select('id, slug'),
      supabase.from('stadiums').select('id, city_id'),
    ])

    const teamByName = Object.fromEntries(
      (teams ?? []).map((t) => [t.name.toLowerCase(), t.id])
    )
    const cityBySlug = Object.fromEntries(
      (cities ?? []).map((c) => [c.slug, c.id])
    )
    // One stadium per city — map city_id → stadium_id
    const stadiumByCityId = Object.fromEntries(
      (stadiums ?? []).map((s) => [s.city_id, s.id])
    )

    // ── 3. Build upsert rows ──────────────────────────────────────────────
    const rows = apiMatches.map((m) => {
      const citySlug = MATCH_CITY_MAP[m.id] ?? null
      const cityId   = citySlug ? (cityBySlug[citySlug] ?? null) : null
      const stadiumId = cityId  ? (stadiumByCityId[cityId] ?? null) : null

      const homeName = m.homeTeam?.name ? normaliseTeamName(m.homeTeam.name) : null
      const awayName = m.awayTeam?.name ? normaliseTeamName(m.awayTeam.name) : null

      return {
        api_match_id:  String(m.id),
        match_date:    m.utcDate,
        stage:         formatStage(m.stage),
        city_id:       cityId,
        stadium_id:    stadiumId,
        home_team_id:  homeName ? (teamByName[homeName.toLowerCase()] ?? null) : null,
        away_team_id:  awayName ? (teamByName[awayName.toLowerCase()] ?? null) : null,
      }
    })

    // ── 4. Upsert — update existing rows if the match already exists ──────
    const { error, count } = await supabase
      .from('matches')
      .upsert(rows, { onConflict: 'api_match_id', ignoreDuplicates: false, count: 'exact' })

    if (error) throw error

    return NextResponse.json({
      ok: true,
      synced: rows.length,
      upserted: count,
      withCity: rows.filter((r) => r.city_id).length,
      withoutCity: rows.filter((r) => !r.city_id).length,
    })
  } catch (err) {
    console.error('Match sync error:', err)
    const message = err instanceof Error
      ? err.message
      : JSON.stringify(err, null, 2)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// Vercel cron hits GET
export async function GET(request: Request) {
  return POST(request)
}
