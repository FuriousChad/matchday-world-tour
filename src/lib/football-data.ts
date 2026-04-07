// football-data.org API client for FIFA World Cup 2026 (competition ID: 2000)

const BASE_URL = 'https://api.football-data.org/v4'
const API_KEY = process.env.FOOTBALL_DATA_API_KEY!

export type FDMatch = {
  id: number
  utcDate: string
  status: string
  matchday: number
  stage: string
  group: string | null
  homeTeam: { id: number; name: string } | null
  awayTeam: { id: number; name: string } | null
}

export async function fetchWCMatches(): Promise<FDMatch[]> {
  const res = await fetch(`${BASE_URL}/competitions/WC/matches`, {
    headers: { 'X-Auth-Token': API_KEY },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`football-data API error: ${res.status}`)
  const data = await res.json()
  return data.matches ?? []
}

// Normalise team names from the API to match our seed data
export function normaliseTeamName(name: string): string {
  const map: Record<string, string> = {
    'Czech Republic':       'Czech Republic',
    'Czechia':              'Czech Republic',
    'USA':                  'United States',
    'United States':        'United States',
    'Korea Republic':       'South Korea',
    'South Korea':          'South Korea',
    'IR Iran':              'Iran',
    'Iran':                 'Iran',
    'Bosnia-Herzegovina':   'Bosnia & Herzegovina',
    'Cape Verde Islands':   'Cape Verde',
    'Congo DR':             'DR Congo',
    'Curaçao':              'Curaçao',
    'Haiti':                'Haiti',
  }
  return map[name] ?? name
}

// Map FIFA 2026 API match IDs → our city slugs
// Based on the officially published FIFA 2026 venue schedule
export const MATCH_CITY_MAP: Record<number, string> = {
  // ── GROUP STAGE ──────────────────────────────────────────────────────────
  // Group A — Mexico host (Azteca / Guadalajara / Monterrey — skip, not US)
  // 537327 Mexico vs South Africa         → Mexico City (skip)
  // 537328 South Korea vs Czechia         → Guadalajara (skip)
  // 537329 Czechia vs South Africa        → Monterrey (skip)
  // 537330 Mexico vs South Korea          → Mexico City (skip)
  // 537331 Czechia vs Mexico              → Mexico City (skip)
  // 537332 South Africa vs South Korea    → Guadalajara (skip)

  // Group B — Canada host (Toronto / Vancouver — skip, not US)
  // US-hosted Group B neutral matches
  537334: 'dallas',              // Qatar vs Switzerland
  537335: 'houston',             // Switzerland vs Bosnia-Herzegovina
  537338: 'kansas-city',         // Bosnia-Herzegovina vs Qatar

  // Group C
  537339: 'los-angeles',         // Brazil vs Morocco
  537340: 'seattle',             // Haiti vs Scotland
  537342: 'los-angeles',         // Scotland vs Morocco
  537341: 'san-francisco',       // Brazil vs Haiti
  537344: 'seattle',             // Morocco vs Haiti
  537343: 'san-francisco',       // Scotland vs Brazil

  // Group D — USA's group
  537345: 'kansas-city',         // United States vs Paraguay
  537346: 'dallas',              // Australia vs Turkey
  537348: 'philadelphia',        // United States vs Australia
  537347: 'dallas',              // Turkey vs Paraguay
  537349: 'new-york-new-jersey', // Turkey vs United States
  537350: 'philadelphia',        // Paraguay vs Australia

  // Group E
  537351: 'seattle',             // Germany vs Curaçao
  537352: 'atlanta',             // Ivory Coast vs Ecuador
  537353: 'seattle',             // Germany vs Ivory Coast
  537354: 'atlanta',             // Ecuador vs Curaçao
  537355: 'boston',              // Ecuador vs Germany
  537356: 'boston',              // Curaçao vs Ivory Coast

  // Group F
  537357: 'miami',               // Netherlands vs Japan
  537358: 'houston',             // Sweden vs Tunisia
  537359: 'miami',               // Netherlands vs Sweden
  537360: 'houston',             // Tunisia vs Japan
  537361: 'miami',               // Tunisia vs Netherlands
  537362: 'houston',             // Japan vs Sweden

  // Group G
  537363: 'new-york-new-jersey', // Belgium vs Egypt
  537364: 'philadelphia',        // Iran vs New Zealand
  537365: 'new-york-new-jersey', // Belgium vs Iran
  537366: 'philadelphia',        // New Zealand vs Egypt
  537367: 'new-york-new-jersey', // New Zealand vs Belgium
  537368: 'philadelphia',        // Egypt vs Iran

  // Group H
  537369: 'san-francisco',       // Spain vs Cape Verde Islands
  537370: 'los-angeles',         // Saudi Arabia vs Uruguay
  537371: 'san-francisco',       // Spain vs Saudi Arabia
  537372: 'los-angeles',         // Uruguay vs Cape Verde Islands
  537373: 'san-francisco',       // Uruguay vs Spain
  537374: 'los-angeles',         // Cape Verde Islands vs Saudi Arabia

  // Group I
  537391: 'dallas',              // France vs Senegal
  537392: 'houston',             // Iraq vs Norway
  537393: 'dallas',              // France vs Iraq
  537394: 'houston',             // Norway vs Senegal
  537395: 'dallas',              // Norway vs France
  537396: 'houston',             // Senegal vs Iraq

  // Group J
  537397: 'boston',              // Argentina vs Algeria
  537398: 'kansas-city',         // Austria vs Jordan
  537399: 'boston',              // Argentina vs Austria
  537400: 'kansas-city',         // Jordan vs Algeria
  537401: 'boston',              // Jordan vs Argentina
  537402: 'kansas-city',         // Algeria vs Austria

  // Group K
  537403: 'atlanta',             // Portugal vs Congo DR
  537404: 'miami',               // Uzbekistan vs Colombia
  537405: 'atlanta',             // Portugal vs Uzbekistan
  537406: 'miami',               // Colombia vs Congo DR
  537407: 'atlanta',             // Colombia vs Portugal
  537408: 'miami',               // Congo DR vs Uzbekistan

  // Group L
  537409: 'los-angeles',         // England vs Croatia
  537410: 'seattle',             // Ghana vs Panama
  537411: 'los-angeles',         // England vs Ghana
  537412: 'seattle',             // Panama vs Croatia
  537413: 'los-angeles',         // Panama vs England
  537414: 'seattle',             // Croatia vs Ghana

  // ── ROUND OF 32 ──────────────────────────────────────────────────────────
  537417: 'dallas',
  537423: 'san-francisco',
  537415: 'miami',
  537418: 'philadelphia',
  537424: 'seattle',
  537416: 'atlanta',
  537425: 'kansas-city',
  537426: 'houston',
  537422: 'new-york-new-jersey',
  537421: 'los-angeles',
  537420: 'boston',
  537419: 'dallas',
  537429: 'san-francisco',
  537428: 'miami',
  537427: 'seattle',
  537430: 'atlanta',

  // ── ROUND OF 16 ──────────────────────────────────────────────────────────
  537376: 'dallas',
  537375: 'new-york-new-jersey',
  537377: 'los-angeles',
  537378: 'san-francisco',
  537379: 'miami',
  537380: 'kansas-city',
  537381: 'seattle',
  537382: 'houston',

  // ── QUARTER-FINALS ───────────────────────────────────────────────────────
  537383: 'los-angeles',
  537384: 'dallas',
  537385: 'new-york-new-jersey',
  537386: 'san-francisco',

  // ── SEMI-FINALS ──────────────────────────────────────────────────────────
  537387: 'new-york-new-jersey',
  537388: 'los-angeles',

  // ── THIRD PLACE ──────────────────────────────────────────────────────────
  537389: 'miami',

  // ── FINAL ────────────────────────────────────────────────────────────────
  537390: 'new-york-new-jersey',
}

// Human-readable stage labels
export function formatStage(stage: string): string {
  const map: Record<string, string> = {
    GROUP_STAGE:    'Group Stage',
    LAST_32:        'Round of 32',
    LAST_16:        'Round of 16',
    QUARTER_FINALS: 'Quarter-Final',
    SEMI_FINALS:    'Semi-Final',
    THIRD_PLACE:    'Third Place Play-off',
    FINAL:          'Final',
  }
  return map[stage] ?? stage
}
