import Link from 'next/link'
import { getCities, getUpcomingMatches } from '@/lib/queries'
import { CityGrid } from '@/components/city/city-grid'
import { TeamSelector } from '@/components/team/team-selector'
import { UpcomingMatchesList } from '@/components/match/upcoming-matches-list'

export default async function HomePage() {
  const [cities, upcomingMatches] = await Promise.all([
    getCities(),
    getUpcomingMatches(6),
  ])

  return (
    <div style={{ fontFamily: 'var(--font-outfit, sans-serif)' }}>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#04070f' }}
      >
        {/* Mesh gradient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              'radial-gradient(ellipse 80% 60% at 15% 60%, rgba(34,197,94,0.12) 0%, transparent 60%)',
              'radial-gradient(ellipse 60% 50% at 85% 30%, rgba(59,130,246,0.10) 0%, transparent 60%)',
              'radial-gradient(ellipse 40% 40% at 50% 100%, rgba(212,168,67,0.08) 0%, transparent 60%)',
            ].join(', '),
          }}
        />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '256px',
          }}
        />

        <div className="relative z-10 container mx-auto max-w-5xl px-5 py-16 md:py-24">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p
              className="text-[10px] font-bold tracking-[0.28em] uppercase mb-4"
              style={{ color: '#d4a843' }}
            >
              FIFA World Cup 2026 · USA
            </p>

            {/* Headline */}
            <h1
              className="leading-none mb-5 text-white"
              style={{
                fontFamily: 'var(--font-bebas, sans-serif)',
                fontSize: 'clamp(3.5rem, 11vw, 7rem)',
                letterSpacing: '0.04em',
                textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              }}
            >
              Follow Your Team<br />
              <span style={{ color: '#d4a843' }}>From Kickoff</span><br />
              To Final Whistle
            </h1>

            {/* Subheadline */}
            <p
              className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'rgba(200,208,220,0.85)' }}
            >
              Pick your nation, discover the 11 host cities, and map out every
              stop in your matchday journey across America.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-150 hover:scale-[1.02]"
                style={{
                  background: '#d4a843',
                  color: '#04070f',
                  fontFamily: 'var(--font-outfit, sans-serif)',
                }}
              >
                Pick Your Team
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
              <Link
                href="/cities"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-150 hover:bg-white/10"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontFamily: 'var(--font-outfit, sans-serif)',
                }}
              >
                Explore Cities
              </Link>
            </div>

            {/* Stats strip */}
            <div
              className="flex items-center gap-6 mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              {[
                { label: 'Nations', value: '48' },
                { label: 'Host Cities', value: '11' },
                { label: 'Matches', value: '104' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    className="leading-none"
                    style={{
                      fontFamily: 'var(--font-bebas, sans-serif)',
                      fontSize: '1.75rem',
                      letterSpacing: '0.05em',
                      color: '#ffffff',
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5"
                    style={{ color: 'rgba(160,168,184,0.6)' }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM SELECTOR ─────────────────────────────────────────── */}
      <section
        className="px-4 py-8"
        style={{ background: 'rgba(4,7,15,0.03)', borderBottom: '1px solid var(--color-border)' }}
      >
        <div className="container mx-auto max-w-5xl">
          <TeamSelector />
        </div>
      </section>

      {/* ── UPCOMING MATCHES ──────────────────────────────────────── */}
      {upcomingMatches.length > 0 && (
        <section className="px-4 py-10">
          <div className="container mx-auto max-w-5xl">
            {/* Section header */}
            <div className="flex items-baseline justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-6" style={{ background: '#d4a843' }} />
                <h2
                  className="leading-none"
                  style={{
                    fontFamily: 'var(--font-bebas, sans-serif)',
                    fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                    letterSpacing: '0.06em',
                  }}
                >
                  Upcoming Fixtures
                </h2>
              </div>
              <Link
                href="/team"
                className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Full Schedule →
              </Link>
            </div>

            <UpcomingMatchesList matches={upcomingMatches} />
          </div>
        </section>
      )}

      {/* ── HOST CITIES ───────────────────────────────────────────── */}
      <section className="px-4 py-10">
        <div className="container mx-auto max-w-5xl">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-6" style={{ background: '#d4a843' }} />
            <h2
              className="leading-none"
              style={{
                fontFamily: 'var(--font-bebas, sans-serif)',
                fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                letterSpacing: '0.06em',
              }}
            >
              Host Cities
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6 pl-9">
            11 cities across America — venues, travel tips, and every matchday fixture.
          </p>
          <CityGrid cities={cities} />
        </div>
      </section>

    </div>
  )
}
