'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getMyTeam } from '@/lib/my-team'
import type { Team } from '@/types'

export function TeamSelector() {
  const [myTeam] = useState<Team | null>(() => getMyTeam())

  if (myTeam) {
    return (
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ background: '#04070f', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Blurred flag backdrop */}
        {myTeam.flag_url && (
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${myTeam.flag_url.replace('/w40/', '/w160/')})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(24px) saturate(1.4)',
              opacity: 0.14,
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(4,7,15,0.97) 40%, rgba(4,7,15,0.7) 100%)' }}
        />

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 py-5 md:px-6">
          <div className="flex items-center gap-4">
            {myTeam.flag_url && (
              <div className="shrink-0 rounded-sm overflow-hidden shadow-lg" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                <Image
                  src={myTeam.flag_url.replace('/w40/', '/w80/')}
                  alt={myTeam.name}
                  width={52}
                  height={35}
                  className="block object-cover"
                />
              </div>
            )}
            <div>
              <p
                className="text-[9px] font-bold tracking-[0.22em] uppercase mb-0.5"
                style={{ color: '#d4a843' }}
              >
                Following
              </p>
              <p
                className="text-white leading-none"
                style={{
                  fontFamily: 'var(--font-bebas, sans-serif)',
                  fontSize: 'clamp(1.6rem, 5vw, 2rem)',
                  letterSpacing: '0.05em',
                }}
              >
                {myTeam.name}
              </p>
              <p className="text-[11px] mt-1" style={{ color: 'rgba(160,168,184,0.7)' }}>
                Fixtures are highlighted across the site.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <Link
              href="/team"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold tracking-wide transition-all duration-150 hover:scale-[1.02]"
              style={{ background: '#d4a843', color: '#04070f', fontFamily: 'var(--font-outfit, sans-serif)' }}
            >
              View Schedule
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center px-4 py-2 rounded-lg text-[12px] font-semibold transition-colors hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'var(--font-outfit, sans-serif)' }}
            >
              Change Team
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{ background: '#04070f', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Subtle mesh */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse 70% 80% at 90% 50%, rgba(212,168,67,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 py-5 md:px-6">
        <div>
          <p
            className="text-[9px] font-bold tracking-[0.22em] uppercase mb-1"
            style={{ color: '#d4a843' }}
          >
            Get Started
          </p>
          <p
            className="text-white leading-none mb-2"
            style={{
              fontFamily: 'var(--font-bebas, sans-serif)',
              fontSize: 'clamp(1.5rem, 5vw, 1.9rem)',
              letterSpacing: '0.05em',
            }}
          >
            Pick the Nation You&rsquo;re Backing
          </p>
          <p className="text-[12px]" style={{ color: 'rgba(160,168,184,0.7)' }}>
            We&rsquo;ll personalize fixtures and help you plan every matchday.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold tracking-wide transition-all duration-150 hover:scale-[1.02]"
            style={{ background: '#d4a843', color: '#04070f', fontFamily: 'var(--font-outfit, sans-serif)' }}
          >
            Choose Team
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </Link>
          <Link
            href="#cities"
            className="inline-flex items-center px-4 py-2 rounded-lg text-[12px] font-semibold transition-colors hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.12)', fontFamily: 'var(--font-outfit, sans-serif)' }}
          >
            Explore Cities
          </Link>
        </div>
      </div>
    </div>
  )
}
