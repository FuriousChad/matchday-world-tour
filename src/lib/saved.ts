'use client'

import type { SavedItem } from '@/types'

const STORAGE_KEY = 'mp_saved'

export function getSavedItems(): SavedItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as SavedItem[]) : []
  } catch {
    return []
  }
}

export function saveItem(item: SavedItem): void {
  const current = getSavedItems()
  const exists = current.some((i) => i.type === item.type && i.id === item.id)
  if (exists) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...current]))
}

export function unsaveItem(type: SavedItem['type'], id: string): void {
  const current = getSavedItems()
  const updated = current.filter((i) => !(i.type === type && i.id === id))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function isItemSaved(type: SavedItem['type'], id: string): boolean {
  return getSavedItems().some((i) => i.type === type && i.id === id)
}
