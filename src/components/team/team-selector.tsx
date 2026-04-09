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
      <div className="rounded-2xl border bg-card p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {myTeam.flag_url && (
              <Image src={myTeam.flag_url} alt={myTeam.name} width={40} height={28} className="rounded object-cover" />
            )}
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Your team</p>
              <p className="text-lg font-semibold">{myTeam.name}</p>
              <p className="text-sm text-muted-foreground">You&apos;ll get highlighted fixtures across the site.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/team"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              View Team Hub
            </Link>
            <Link
              href="/team"
              className="rounded-lg border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Change Team
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-card p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Step 1 of 3</p>
          <p className="text-lg font-semibold">Pick the team you&apos;re backing</p>
          <p className="text-sm text-muted-foreground">
            We&apos;ll personalize match highlights and help you plan around their fixtures.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/team"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Pick a Team
          </Link>
          <Link
            href="#featured-cities"
            className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Explore Cities
          </Link>
        </div>
      </div>
    </div>
  )
}
