'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getMyTeam } from '@/lib/my-team'
import type { Team } from '@/types'

export function TeamSelector() {
  const [myTeam, setMyTeam] = useState<Team | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMyTeam(getMyTeam())
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (myTeam) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {myTeam.flag_url && (
            <Image src={myTeam.flag_url} alt={myTeam.name} width={36} height={24} className="rounded object-cover" />
          )}
          <div>
            <p className="text-xs text-muted-foreground">Following</p>
            <p className="font-semibold">{myTeam.name}</p>
          </div>
        </div>
        <Link
          href="/team"
          className="text-sm text-green-600 font-medium hover:underline"
        >
          View Schedule →
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold">Who are you supporting?</p>
        <p className="text-sm text-muted-foreground">Select your team to follow their schedule</p>
      </div>
      <Link
        href="/team"
        className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Pick a Team
      </Link>
    </div>
  )
}
