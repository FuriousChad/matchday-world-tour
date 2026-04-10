'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getMyTeam, setMyTeam, clearMyTeam } from '@/lib/my-team'
import type { Match, Team } from '@/types'

// ── Static country/team info ─────────────────────────────────────────────────

type TeamInfo = {
  nickname: string
  bestResult: string
  players: string
  tagline: string
}

const TEAM_INFO: Record<string, TeamInfo> = {
  // CONMEBOL
  argentina:       { nickname: 'La Albiceleste',          bestResult: 'Champions 1978 · 1986 · 2022',       players: 'Messi · Álvarez · De Paul',         tagline: "South America's most decorated World Cup nation" },
  brazil:          { nickname: 'A Seleção',                bestResult: 'Champions 1958 · 62 · 70 · 94 · 02', players: 'Vinícius Jr. · Rodrygo · Raphinha',  tagline: 'Five-time champions — football royalty' },
  colombia:        { nickname: 'Los Cafeteros',            bestResult: 'Quarter-Final 2014',                  players: 'James · L. Díaz · Arias',            tagline: 'Known for flair, passion, and golden ambition' },
  uruguay:         { nickname: 'La Celeste',               bestResult: 'Champions 1930 · 1950',              players: 'Valverde · Núñez · Bentancur',        tagline: 'Founders of the World Cup — punch above their size' },
  ecuador:         { nickname: 'La Tri',                   bestResult: 'Round of 16 (2006)',                 players: 'Caicedo · Valencia · Reasco',         tagline: 'Rising South American side with elite midfield talent' },
  paraguay:        { nickname: 'Los Guaraníes',            bestResult: 'Quarter-Final 1954',                 players: 'Almirón · Sanabria · Romero',         tagline: 'Compact, combative, and never easy to beat' },
  venezuela:       { nickname: 'La Vinotinto',             bestResult: 'First WC Appearance',               players: 'Soteldo · Bello · Martínez',          tagline: 'Historic first qualification marks a new chapter' },
  // UEFA
  france:          { nickname: 'Les Bleus',                bestResult: 'Champions 1998 · 2018',              players: 'Mbappé · Griezmann · Tchouaméni',    tagline: 'Defending finalists — a generation of extraordinary talent' },
  spain:           { nickname: 'La Roja',                  bestResult: 'Champions 2010',                     players: 'Pedri · Yamal · Morata',             tagline: 'Masters of possession — built around a brilliant new generation' },
  england:         { nickname: 'The Three Lions',          bestResult: 'Champions 1966',                     players: 'Bellingham · Kane · Saka',           tagline: "Football's coming home — perpetually hopeful, often heartbroken" },
  germany:         { nickname: 'Die Mannschaft',           bestResult: 'Champions 1954 · 74 · 90 · 2014',   players: 'Müller · Kroos · Gnabry',            tagline: 'Four-time champions — the engine of European football' },
  portugal:        { nickname: 'A Seleção das Quinas',     bestResult: 'Third Place 1966',                   players: 'Ronaldo · Leão · Rúben Dias',         tagline: 'Built around the greatest goalscorer the game has ever seen' },
  netherlands:     { nickname: 'Oranje',                   bestResult: 'Runner-Up 1974 · 1978 · 2010',      players: 'Van Dijk · De Jong · Gakpo',         tagline: 'Three finals, zero titles — the most agonizing record in football' },
  italy:           { nickname: 'Gli Azzurri',              bestResult: 'Champions 1934 · 38 · 82 · 2006',   players: 'Donnarumma · Barella · Retegui',      tagline: 'Four-time World Champions with a flair for the dramatic' },
  belgium:         { nickname: 'Les Diables Rouges',       bestResult: 'Third Place 2018',                   players: 'De Bruyne · Lukaku · Trossard',       tagline: "The golden generation's last stand on the world stage" },
  croatia:         { nickname: 'Vatreni',                  bestResult: 'Runner-Up 2018',                     players: 'Modrić · Kovačić · Gvardiol',        tagline: 'A small nation with world-class midfield mastery' },
  switzerland:     { nickname: 'Die Nati',                 bestResult: 'Quarter-Final 1954 · 2010',          players: 'Xhaka · Shaqiri · Akanji',           tagline: 'Consistently solid, consistently surprising in knockouts' },
  denmark:         { nickname: 'Danish Dynamite',          bestResult: 'Group Stage (multiple WCs)',         players: 'Eriksen · Højlund · Maehle',          tagline: 'Unified, relentless, driven by collective spirit' },
  austria:         { nickname: 'Das Wunderteam',           bestResult: 'Third Place 1954',                   players: 'Alaba · Sabitzer · Arnautovic',       tagline: 'A proud footballing nation on the rise once more' },
  turkey:          { nickname: 'Ay-Yıldızlılar',           bestResult: 'Third Place 2002',                   players: 'Çalhanoğlu · Güler · Demiral',        tagline: 'Driven by a golden generation of creative talent' },
  poland:          { nickname: 'Biało-Czerwoni',           bestResult: 'Third Place 1974 · 1982',            players: 'Lewandowski · Zieliński · Szymański', tagline: 'Lewandowski leads a proud European football nation' },
  scotland:        { nickname: 'The Tartan Army',          bestResult: 'Group Stage (multiple)',             players: 'McTominay · Robertson · Adams',       tagline: "Famous for fans as much as flair — the world's greatest supporters" },
  serbia:          { nickname: 'Orlovi',                   bestResult: 'Fourth Place 1930 (Yugoslavia)',     players: 'Mitrović · Vlahović · Tadić',         tagline: 'Electric attack with unfinished business at this level' },
  ukraine:         { nickname: 'Zbirna',                   bestResult: 'Quarter-Final 2006',                 players: 'Mudryk · Yaremchuk · Malinovskyi',    tagline: 'Playing with heart and pride for their homeland' },
  hungary:         { nickname: 'Az Aranycsapat',           bestResult: 'Runner-Up 1938 · 1954',              players: 'Szoboszlai · Gulácsi · Kerkez',       tagline: 'Heirs to the legendary Golden Team of the 1950s' },
  slovakia:        { nickname: 'Repre',                    bestResult: 'Round of 16 (2010)',                 players: 'Lobotka · Haraslín · Duda',           tagline: 'Technical, organized, capable of upsetting anyone' },
  slovenia:        { nickname: 'Zmaji',                    bestResult: 'Group Stage (2010)',                 players: 'Oblak · Šeško · Čerin',               tagline: "Built on Oblak's brick wall and Šeško's rising star" },
  romania:         { nickname: 'Tricoloriștii',            bestResult: 'Quarter-Final 1994',                 players: 'Stanciu · Rațiu · Drăgușin',          tagline: "Bringing back the magic of Hagi's golden era" },
  'czech-republic':{ nickname: 'Lvi',                      bestResult: 'Runner-Up 1934 (Czechoslovakia)',   players: 'Schick · Souček · Coufal',            tagline: 'Schick goals carry Czech ambitions at every tournament' },
  greece:          { nickname: 'Ethnikí',                  bestResult: 'Group Stage 1994 · 2010',           players: 'Ioannidis · Tzolis · Baldock',        tagline: 'A football nation awakened, building toward something special' },
  // CONCACAF
  'united-states': { nickname: 'Stars and Stripes',        bestResult: 'Third Place 1930',                  players: 'Pulisic · Turner · McKennie',         tagline: 'Host nation with the stars to make a deep run' },
  mexico:          { nickname: 'El Tri',                   bestResult: 'Quarter-Final 1970 · 1986',         players: 'Lozano · Jiménez · Vega',             tagline: 'The most-supported CONCACAF nation — always a threat' },
  canada:          { nickname: 'Les Rouges',               bestResult: 'Group Stage 1986',                  players: 'Davies · David · Buchanan',           tagline: 'A new golden generation breaking new ground' },
  panama:          { nickname: 'Los Canaleros',            bestResult: 'Group Stage 2018',                  players: 'Córdoba · Fajardo · Cox',             tagline: 'Tenacious and disciplined — the Canal Republic fights hard' },
  'costa-rica':    { nickname: 'Los Ticos',                bestResult: 'Quarter-Final 2014',                players: 'Navas · Campbell · Borges',           tagline: 'The giant-slayers who stunned Europe a decade ago' },
  jamaica:         { nickname: 'Reggae Boyz',              bestResult: 'Group Stage 1998',                  players: 'Bailey · Lowe · Bell',                tagline: 'Caribbean flair making its mark on the world stage' },
  honduras:        { nickname: 'Los Catrachos',            bestResult: 'Group Stage 2014',                  players: 'Bengtson · Quioto · Rubio',           tagline: 'Passionate Central American underdogs with ambition' },
  guatemala:       { nickname: 'Azul y Blanco',            bestResult: 'World Cup Debut',                   players: 'Alvarado · Ramos · López',            tagline: 'Making history in their first ever World Cup' },
  // CAF
  morocco:         { nickname: 'Atlas Lions',              bestResult: 'Semi-Final 2022',                   players: 'Hakimi · En-Nesyri · Amallah',        tagline: "Africa's trailblazers — their 2022 run changed everything" },
  senegal:         { nickname: 'Lions of Teranga',         bestResult: 'Quarter-Final 2002',                players: 'Mané · Gueye · Sarr',                 tagline: 'African champions with hunger for more on the world stage' },
  egypt:           { nickname: 'The Pharaohs',             bestResult: 'Round of 16 (1934)',                players: 'Salah · Elneny · Galal',              tagline: 'Salah carries the hopes of 100 million Egyptians' },
  nigeria:         { nickname: 'Super Eagles',             bestResult: 'Round of 16 1994 · 1998',           players: 'Osimhen · Lookman · Iheanacho',       tagline: "Africa's most consistent knockout threat" },
  cameroon:        { nickname: 'Indomitable Lions',        bestResult: 'Quarter-Final 1990',                players: 'Anguissa · Aboubakar · Onana',        tagline: "First African quarter-finalists — legends in their history" },
  'south-africa':  { nickname: 'Bafana Bafana',            bestResult: 'Group Stage (2010 host)',           players: 'Zwane · Baloyi · Zungu',              tagline: 'The Rainbow Nation returns to football\'s biggest stage' },
  'ivory-coast':   { nickname: 'Les Éléphants',            bestResult: 'Round of 16 (2006)',               players: 'Haller · Gradel · Fofana',            tagline: "Post-Drogba era, but the fighting spirit endures" },
  algeria:         { nickname: 'Les Fennecs',              bestResult: 'Round of 16 (2014)',               players: 'Belaïli · Mandi · Bennacer',           tagline: 'Africa Cup holders aiming to finally shine at a World Cup' },
  tunisia:         { nickname: 'Eagles of Carthage',       bestResult: 'Group Stage (multiple)',            players: 'Msakni · Khazri · Slimane',           tagline: 'North Africa\'s consistent qualifiers, chasing their moment' },
  mali:            { nickname: 'Les Aigles',               bestResult: 'World Cup Debut',                   players: 'Samassékou · Kouyaté · Traoré',       tagline: 'Making their World Cup bow with extraordinary midfield talent' },
  ghana:           { nickname: 'Black Stars',              bestResult: 'Quarter-Final 2010',                players: 'Kudus · Partey · Mensah',             tagline: 'Chasing redemption after the heartbreak of 2010' },
  tanzania:        { nickname: 'Taifa Stars',              bestResult: 'World Cup Debut',                   players: 'Rusike · Mwita · Simba',              tagline: 'East Africa makes history on the grandest stage of all' },
  // AFC
  japan:           { nickname: 'Samurai Blue',             bestResult: 'Round of 16 (×4)',                 players: 'Kubo · Mitoma · Endo',                tagline: "Asia's most consistent and exciting World Cup performers" },
  'south-korea':   { nickname: 'Taegeuk Warriors',         bestResult: 'Semi-Final 2002',                  players: 'Son · Lee · Kim',                     tagline: 'Son Heung-min captains the bid for 2002 redemption' },
  iran:            { nickname: 'Team Melli',               bestResult: 'Group Stage (multiple)',            players: 'Taremi · Jahanbakhsh · Beiranvand',   tagline: "Asia's most passionate football culture on the global stage" },
  'saudi-arabia':  { nickname: 'Al-Akhdar',                bestResult: 'Round of 16 (1994)',               players: 'Al-Dawsari · Al-Shahrani · Al-Malki', tagline: 'Known for their stunning 2022 upset over Argentina' },
  australia:       { nickname: 'The Socceroos',            bestResult: 'Round of 16 2006 · 2022',          players: 'Leckie · Hrustic · Ryan',             tagline: 'Building a new golden era with European-based talent' },
  qatar:           { nickname: 'The Maroons',              bestResult: 'Group Stage 2022 (host)',           players: 'Al-Haydos · Afif · Al-Rawi',          tagline: 'World Cup hosts in 2022 — now proving themselves away' },
  uzbekistan:      { nickname: 'White Wolves',             bestResult: 'World Cup Debut',                   players: 'Shomurodov · Masharipov · Kholmatov', tagline: "Central Asia's rising football nation on the grand stage" },
  iraq:            { nickname: 'Lions of Mesopotamia',     bestResult: 'Round of 16 (1986)',               players: 'Ameen · Hassan · Al-Hamdani',         tagline: 'Asia Cup winners returning to football\'s biggest arena' },
  jordan:          { nickname: "Nash'amiyoun",             bestResult: 'World Cup Debut',                   players: 'Al-Naimat · Bani Yaseen · Almomani', tagline: "Jordan's footballing revolution earns its moment in history" },
  indonesia:       { nickname: 'Garuda',                   bestResult: 'Group Stage 2026 (debut)',         players: 'Struijk · Verdonk · Pratama',         tagline: "The world's most populous nation chasing a dream" },
  oman:            { nickname: 'Red Warriors',             bestResult: 'World Cup Debut',                   players: 'Al-Musalami · Fawzi · Al-Mandhar',   tagline: 'The Gulf nation writes a new chapter in their football story' },
}

const CONF_LABELS: Record<string, string> = {
  CONMEBOL: 'South America',
  UEFA:     'Europe',
  CONCACAF: 'CONCACAF',
  CAF:      'Africa',
  AFC:      'Asia / OFC',
}

const STAGE_ORDER = [
  'Group Stage',
  'Round of 32',
  'Round of 16',
  'Quarter-Final',
  'Semi-Final',
  'Third Place Play-off',
  'Final',
]

function groupByStage(matches: Match[]): [string, Match[]][] {
  const map = new Map<string, Match[]>()
  for (const m of matches) {
    const stage = m.stage ?? 'Other'
    if (!map.has(stage)) map.set(stage, [])
    map.get(stage)!.push(m)
  }
  const entries = Array.from(map.entries())
  entries.sort(([a], [b]) => {
    const ia = STAGE_ORDER.indexOf(a)
    const ib = STAGE_ORDER.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })
  return entries
}

function flagAt(url: string | null | undefined, size: 'w40' | 'w80' | 'w160' | 'w320'): string | null {
  if (!url) return null
  return url.replace('/w40/', `/${size}/`)
}

// ── Main export ────────────────────────────────────────────────────────────

export function TeamPageClient({ teams }: { teams: Team[] }) {
  const [myTeam, setMyTeamState] = useState<Team | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [loadingMatches, setLoadingMatches] = useState(false)
  const [search, setSearch] = useState('')
  const [confFilter, setConfFilter] = useState<string>('ALL')

  useEffect(() => {
    const saved = getMyTeam()
    if (saved) {
      setMyTeamState(saved)
      fetchMatches(saved.id)
    }
  }, [])

  async function fetchMatches(teamId: string) {
    setLoadingMatches(true)
    const res = await fetch(`/api/teams/${teamId}/matches`)
    if (res.ok) setMatches(await res.json())
    setLoadingMatches(false)
  }

  function selectTeam(team: Team) {
    setMyTeam(team)
    setMyTeamState(team)
    fetchMatches(team.id)
  }

  function removeTeam() {
    clearMyTeam()
    setMyTeamState(null)
    setMatches([])
  }

  const confs = ['ALL', ...Array.from(new Set(teams.map((t) => t.confederation ?? '').filter(Boolean))).sort((a, b) => {
    const order = ['CONMEBOL', 'UEFA', 'CONCACAF', 'CAF', 'AFC']
    return order.indexOf(a) - order.indexOf(b)
  })]

  const filtered = teams.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase())
    const matchesConf = confFilter === 'ALL' || t.confederation === confFilter
    return matchesSearch && matchesConf
  })

  return (
    <>
      {/* Google Fonts — Bebas Neue + Outfit */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {myTeam ? (
        <TeamDashboard
          team={myTeam}
          matches={matches}
          loading={loadingMatches}
          onChangeTeam={removeTeam}
        />
      ) : (
        <TeamSelector
          teams={filtered}
          allTeams={teams}
          search={search}
          confFilter={confFilter}
          confs={confs}
          onSearch={setSearch}
          onConfFilter={setConfFilter}
          onSelect={selectTeam}
        />
      )}
    </>
  )
}

// ── Team Dashboard (selected team view) ─────────────────────────────────────

function TeamDashboard({
  team,
  matches,
  loading,
  onChangeTeam,
}: {
  team: Team
  matches: Match[]
  loading: boolean
  onChangeTeam: () => void
}) {
  const info = TEAM_INFO[team.slug] ?? null
  const heroBg = flagAt(team.flag_url, 'w320')
  const stageGroups = groupByStage(matches)

  return (
    <div className="pb-24 md:pb-10">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: '#04070f', fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Blurred flag backdrop */}
        {heroBg && (
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${heroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(40px) saturate(1.4)',
              opacity: 0.18,
            }}
          />
        )}
        {/* Gradient vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(4,7,15,0.98) 0%, rgba(4,7,15,0.88) 55%, rgba(4,7,15,0.65) 100%)',
          }}
        />

        {/* Diagonal accent line */}
        <div
          className="absolute top-0 right-0 bottom-0 w-px opacity-20"
          style={{ background: 'linear-gradient(to bottom, transparent, #d4a843, transparent)' }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-4xl px-5 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">

            {/* Left: flag + name block */}
            <div className="flex-1 min-w-0">
              {/* Confederation badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-[10px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 rounded-full border"
                  style={{ color: '#d4a843', borderColor: 'rgba(212,168,67,0.35)', background: 'rgba(212,168,67,0.08)' }}
                >
                  {team.confederation ?? 'FIFA'}
                  {team.confederation && CONF_LABELS[team.confederation]
                    ? ` · ${CONF_LABELS[team.confederation]}`
                    : ''}
                </span>
                {team.group && (
                  <span
                    className="text-[10px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border"
                    style={{ color: '#7dd3fc', borderColor: 'rgba(125,211,252,0.3)', background: 'rgba(125,211,252,0.07)' }}
                  >
                    Group {team.group}
                  </span>
                )}
              </div>

              {/* Flag + team name */}
              <div className="flex items-center gap-4 md:gap-5 mb-2">
                {team.flag_url && (
                  <div className="shrink-0 shadow-2xl rounded-sm overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                    <Image
                      src={flagAt(team.flag_url, 'w160') ?? team.flag_url}
                      alt={team.name}
                      width={80}
                      height={54}
                      className="block object-cover"
                      style={{ display: 'block' }}
                    />
                  </div>
                )}
                <h1
                  className="leading-none tracking-wide text-white"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(3rem, 10vw, 5.5rem)',
                    letterSpacing: '0.04em',
                    textShadow: '0 2px 30px rgba(0,0,0,0.6)',
                  }}
                >
                  {team.name}
                </h1>
              </div>

              {/* Nickname */}
              {info?.nickname && (
                <p className="text-sm mb-5" style={{ color: 'rgba(160,168,184,0.9)', fontStyle: 'italic' }}>
                  &ldquo;{info.nickname}&rdquo;
                </p>
              )}

              {/* Tagline */}
              {info?.tagline && (
                <p className="text-sm md:text-base leading-relaxed max-w-xl" style={{ color: 'rgba(200,208,220,0.85)' }}>
                  {info.tagline}
                </p>
              )}
            </div>

            {/* Right: stats panel */}
            {info && (
              <div
                className="shrink-0 rounded-xl p-5 md:p-6 min-w-[220px]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="space-y-4">
                  <StatItem label="Best Result" value={info.bestResult} />
                  <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                  <div>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: '#d4a843' }}>
                      Key Players
                    </p>
                    <div className="flex flex-col gap-1">
                      {info.players.split(' · ').map((p) => (
                        <span
                          key={p}
                          className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/80"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom: stats strip */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <StatChip label="Matches" value={String(matches.length)} />
              {stageGroups.length > 0 && (
                <StatChip
                  label="Stages"
                  value={stageGroups.map(([s]) => s === 'Group Stage' ? 'Groups' : s).join(' → ')}
                />
              )}
              <div className="ml-auto">
                <button
                  onClick={onChangeTeam}
                  className="text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors"
                  style={{ color: 'rgba(160,168,184,0.7)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#d4a843')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(160,168,184,0.7)')}
                >
                  ← Change Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCHEDULE ─────────────────────────────────────────────── */}
      <div
        className="container mx-auto max-w-4xl px-4 md:px-5 mt-8"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2
              className="text-xl md:text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.06em', fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}
            >
              Full Schedule
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              All {matches.length} fixture{matches.length !== 1 ? 's' : ''} · Group Stage through Final
            </p>
          </div>
        </div>

        {loading ? (
          <ScheduleSkeleton />
        ) : matches.length === 0 ? (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: 'rgba(0,0,0,0.02)', border: '1px dashed rgba(0,0,0,0.1)' }}
          >
            <p className="text-muted-foreground text-sm">No matches scheduled yet.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {stageGroups.map(([stage, stageMatches]) => (
              <StageSection
                key={stage}
                stage={stage}
                matches={stageMatches}
                teamId={team.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: '#d4a843' }}>
        {label}
      </p>
      <p className="text-xs font-semibold leading-snug text-white/80">{value}</p>
    </div>
  )
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: '#d4a843' }}>
        {label}
      </span>
      <span className="text-[11px] font-semibold text-white/70">{value}</span>
    </div>
  )
}

// ── Stage section ────────────────────────────────────────────────────────────

function StageSection({
  stage,
  matches,
  teamId,
}: {
  stage: string
  matches: Match[]
  teamId: string
}) {
  // Stage-specific accent color
  const stageColor =
    stage === 'Final' ? '#f59e0b' :
    stage === 'Semi-Final' ? '#818cf8' :
    stage === 'Quarter-Final' ? '#34d399' :
    stage === 'Round of 16' || stage === 'Round of 32' ? '#60a5fa' :
    '#94a3b8'

  return (
    <div>
      {/* Stage divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${stageColor}40, transparent)` }} />
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: stageColor }} />
          <span
            className="text-[10px] font-bold tracking-[0.22em] uppercase"
            style={{ color: stageColor }}
          >
            {stage}
          </span>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: stageColor }} />
        </div>
        <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${stageColor}40, transparent)` }} />
      </div>

      <div className="space-y-2.5">
        {matches.map((match) => (
          <TeamMatchCard key={match.id} match={match} teamId={teamId} />
        ))}
      </div>
    </div>
  )
}

// ── Match card for team page ─────────────────────────────────────────────────

const CITY_TZ: Record<string, string> = {
  'new-york-new-jersey': 'America/New_York',
  boston:                'America/New_York',
  philadelphia:          'America/New_York',
  miami:                 'America/New_York',
  atlanta:               'America/New_York',
  'kansas-city':         'America/Chicago',
  dallas:                'America/Chicago',
  houston:               'America/Chicago',
  'los-angeles':         'America/Los_Angeles',
  'san-francisco':       'America/Los_Angeles',
  seattle:               'America/Los_Angeles',
}

function TeamMatchCard({ match, teamId }: { match: Match; teamId: string }) {
  const citySlug = match.city?.slug ?? ''
  const tz = CITY_TZ[citySlug] ?? 'America/New_York'

  const isHome = match.home_team?.id === teamId
  const finished = match.status === 'FINISHED'
  const live = match.status === 'IN_PLAY' || match.status === 'PAUSED'
  const postponed = match.status === 'POSTPONED' || match.status === 'SUSPENDED' || match.status === 'CANCELLED'

  const homeWon = finished && match.home_score != null && match.away_score != null && match.home_score > match.away_score
  const awayWon = finished && match.home_score != null && match.away_score != null && match.away_score > match.home_score
  const myTeamWon = (isHome && homeWon) || (!isHome && awayWon)
  const myTeamLost = (isHome && awayWon) || (!isHome && homeWon)

  const resultAccent = finished
    ? myTeamWon ? 'rgba(34,197,94,0.12)' : myTeamLost ? 'rgba(239,68,68,0.08)' : 'rgba(251,191,36,0.08)'
    : 'transparent'
  const resultBorder = finished
    ? myTeamWon ? 'rgba(34,197,94,0.4)' : myTeamLost ? 'rgba(239,68,68,0.3)' : 'rgba(251,191,36,0.3)'
    : undefined

  // Format date
  let dayStr = '', monthDay = '', timeStr = '', tzAbbr = ''
  const dateObj = new Date(match.match_date)
  const validDate = !isNaN(dateObj.getTime())
  if (validDate) {
    dayStr   = dateObj.toLocaleDateString('en-US', { timeZone: tz, weekday: 'short' })
    monthDay = dateObj.toLocaleDateString('en-US', { timeZone: tz, month: 'short', day: 'numeric' })
    timeStr  = dateObj.toLocaleTimeString('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit' })
    tzAbbr   = dateObj.toLocaleTimeString('en-US', { timeZone: tz, timeZoneName: 'short' }).split(' ').pop() ?? ''
  }

  const cardContent = (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: resultBorder
          ? resultAccent
          : 'var(--color-card)',
        border: `1px solid ${resultBorder ?? 'var(--color-border)'}`,
      }}
    >
      {/* Win/loss left accent bar */}
      {finished && (
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
          style={{ background: myTeamWon ? '#22c55e' : myTeamLost ? '#ef4444' : '#fbbf24' }}
        />
      )}

      <div className="px-4 py-3.5 pl-5 md:px-6 md:py-4 md:pl-6">
        {/* Top row: scoreboard */}
        <div className="grid items-center gap-2" style={{ gridTemplateColumns: '1fr auto 1fr' }}>

          {/* Home team */}
          <MatchTeamSide
            name={match.home_team?.name ?? 'TBD'}
            flagUrl={match.home_team?.flag_url ?? null}
            align="right"
            isMyTeam={match.home_team?.id === teamId}
            dimmed={finished && awayWon}
          />

          {/* Center */}
          <div className="flex flex-col items-center justify-center min-w-[90px] px-1">
            {finished ? (
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold tabular-nums leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                    {match.home_score ?? '–'}
                  </span>
                  <span className="text-base text-muted-foreground/40 font-light">–</span>
                  <span className="text-2xl font-bold tabular-nums leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                    {match.away_score ?? '–'}
                  </span>
                </div>
                <span className="text-[9px] tracking-[0.18em] uppercase font-bold text-muted-foreground/50 mt-0.5">
                  {myTeamWon ? '✓ Win' : myTeamLost ? 'Loss' : 'Draw'}
                </span>
              </div>
            ) : live ? (
              <div className="flex items-center gap-1.5 bg-red-500/10 rounded-full px-2.5 py-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-red-500">Live</span>
              </div>
            ) : postponed ? (
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 bg-muted rounded-full px-2.5 py-1">
                TBD
              </span>
            ) : validDate ? (
              <div className="flex flex-col items-center gap-0.5 text-center">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  {dayStr} · {monthDay}
                </span>
                <span className="text-sm font-bold tabular-nums">{timeStr}</span>
                <span className="text-[9px] tracking-wider uppercase text-muted-foreground/50">{tzAbbr}</span>
              </div>
            ) : (
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">TBD</span>
            )}
          </div>

          {/* Away team */}
          <MatchTeamSide
            name={match.away_team?.name ?? 'TBD'}
            flagUrl={match.away_team?.flag_url ?? null}
            align="left"
            isMyTeam={match.away_team?.id === teamId}
            dimmed={finished && homeWon}
          />
        </div>

        {/* Bottom row: venue + city link */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            {/* Stadium icon */}
            <svg className="w-3 h-3 shrink-0 text-muted-foreground/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v8a9 3 0 0 0 18 0V5" />
              <path d="M3 9a9 3 0 0 0 18 0" />
            </svg>
            <span className="text-[11px] text-muted-foreground truncate">
              {match.stadium?.name ?? ''}
              {match.city?.name ? ` · ${match.city.name}` : ''}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-muted-foreground/60 shrink-0 group-hover:text-foreground transition-colors">
            City Guide →
          </span>
        </div>
      </div>
    </div>
  )

  // Wrap in Link only if city exists
  if (citySlug) {
    return (
      <Link href={`/cities/${citySlug}`} className="block" style={{ textDecoration: 'none' }}>
        {cardContent}
      </Link>
    )
  }
  return cardContent
}

function MatchTeamSide({
  name,
  flagUrl,
  align,
  isMyTeam,
  dimmed,
}: {
  name: string
  flagUrl: string | null
  align: 'left' | 'right'
  isMyTeam?: boolean
  dimmed?: boolean
}) {
  return (
    <div
      className={[
        'flex items-center gap-2 min-w-0',
        align === 'right' ? 'flex-row-reverse' : 'flex-row',
        dimmed ? 'opacity-40' : '',
      ].join(' ')}
    >
      {flagUrl ? (
        <Image
          src={flagAt(flagUrl, 'w80') ?? flagUrl}
          alt={name}
          width={28}
          height={20}
          className="rounded-[2px] object-cover shrink-0 shadow-sm"
        />
      ) : (
        <div className="w-7 h-5 rounded bg-muted shrink-0" />
      )}
      <span
        className={[
          'text-sm leading-tight truncate',
          align === 'right' ? 'text-right' : 'text-left',
          isMyTeam ? 'font-bold' : 'font-medium',
        ].join(' ')}
        style={isMyTeam ? { color: '#22c55e' } : undefined}
      >
        {name}
      </span>
    </div>
  )
}

function ScheduleSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 rounded-2xl bg-muted" />
      ))}
    </div>
  )
}

// ── Team Selector ────────────────────────────────────────────────────────────

function TeamSelector({
  teams,
  allTeams,
  search,
  confFilter,
  confs,
  onSearch,
  onConfFilter,
  onSelect,
}: {
  teams: Team[]
  allTeams: Team[]
  search: string
  confFilter: string
  confs: string[]
  onSearch: (v: string) => void
  onConfFilter: (v: string) => void
  onSelect: (t: Team) => void
}) {
  return (
    <div
      className="min-h-screen pb-24 md:pb-10"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header banner */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #04070f 0%, #080e1c 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #d4a843 0%, transparent 50%), radial-gradient(circle at 80% 50%, #4f8ef7 0%, transparent 50%)`,
          }}
        />
        <div className="relative z-10 container mx-auto max-w-4xl px-5 py-10 md:py-12">
          <p
            className="text-[10px] font-bold tracking-[0.28em] uppercase mb-2"
            style={{ color: '#d4a843' }}
          >
            FIFA World Cup 2026
          </p>
          <h1
            className="text-white leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.8rem, 9vw, 5rem)',
              letterSpacing: '0.04em',
            }}
          >
            Pick Your Nation
          </h1>
          <p className="mt-3 text-sm max-w-md" style={{ color: 'rgba(160,168,184,0.85)' }}>
            Choose your team and track every fixture — group stage through the Final.
          </p>
          <p
            className="mt-1 text-[11px]"
            style={{ color: 'rgba(160,168,184,0.45)' }}
          >
            {allTeams.length} nations · 48-team tournament
          </p>
        </div>
      </div>

      {/* Search + filters */}
      <div className="container mx-auto max-w-4xl px-4 md:px-5 mt-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Search nations..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full border rounded-xl pl-10 pr-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          />
        </div>

        {/* Confederation pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {confs.map((c) => (
            <button
              key={c}
              onClick={() => onConfFilter(c)}
              className="text-[11px] font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-150"
              style={confFilter === c ? {
                background: '#04070f',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.15)',
              } : {
                background: 'transparent',
                color: 'var(--color-muted-foreground)',
                border: '1px solid var(--color-border)',
              }}
            >
              {c === 'ALL' ? 'All Teams' : (CONF_LABELS[c] ?? c)}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-[11px] text-muted-foreground">
          {teams.length} nation{teams.length !== 1 ? 's' : ''} shown
        </p>

        {/* Team grid */}
        {teams.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No teams found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TeamCard({ team, onSelect }: { team: Team; onSelect: (t: Team) => void }) {
  const info = TEAM_INFO[team.slug]
  const largeFlagUrl = flagAt(team.flag_url, 'w160')

  return (
    <button
      onClick={() => onSelect(team)}
      className="group relative rounded-xl overflow-hidden text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Flag background strip */}
      {largeFlagUrl && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300"
          style={{
            backgroundImage: `url(${largeFlagUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px) saturate(1.5)',
          }}
        />
      )}

      <div className="relative z-10 p-3.5">
        {/* Flag */}
        <div className="mb-3">
          {team.flag_url ? (
            <div className="rounded-[3px] overflow-hidden shadow-sm inline-block" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
              <Image
                src={flagAt(team.flag_url, 'w80') ?? team.flag_url}
                alt={team.name}
                width={48}
                height={33}
                className="block object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-8 rounded bg-muted" />
          )}
        </div>

        {/* Name */}
        <p className="text-sm font-semibold leading-tight">{team.name}</p>

        {/* Nickname */}
        {info?.nickname && (
          <p className="text-[10px] text-muted-foreground mt-0.5 truncate italic">{info.nickname}</p>
        )}

        {/* Confederation tag */}
        {team.confederation && (
          <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-muted-foreground/50 mt-1.5">
            {team.confederation}
          </p>
        )}
      </div>
    </button>
  )
}
