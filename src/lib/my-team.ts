'use client'

import type { Team } from '@/types'

const STORAGE_KEY = 'mp_my_team'

export function getMyTeam(): Team | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Team) : null
  } catch {
    return null
  }
}

export function setMyTeam(team: Team): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(team))
}

export function clearMyTeam(): void {
  localStorage.removeItem(STORAGE_KEY)
}
