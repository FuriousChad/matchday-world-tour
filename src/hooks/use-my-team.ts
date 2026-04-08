'use client'

import { useState, useEffect } from 'react'
import { getMyTeam } from '@/lib/my-team'
import type { Team } from '@/types'

export function useMyTeam(): Team | null {
  const [team, setTeam] = useState<Team | null>(null)

  useEffect(() => {
    setTeam(getMyTeam())
  }, [])

  return team
}
