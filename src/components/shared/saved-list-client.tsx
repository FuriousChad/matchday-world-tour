'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSavedItems, unsaveItem } from '@/lib/saved'
import type { SavedItem } from '@/types'

const TYPE_LABELS: Record<SavedItem['type'], string> = {
  city:  'City',
  place: 'Spot',
  match: 'Match',
}

export function SavedListClient() {
  const [items, setItems] = useState<SavedItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setItems(getSavedItems())
    setMounted(true)
  }, [])

  function remove(type: SavedItem['type'], id: string) {
    unsaveItem(type, id)
    setItems(getSavedItems())
  }

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p className="text-4xl mb-3">🗺️</p>
        <p className="font-medium">Your trip is empty</p>
        <p className="text-sm mt-1">Save cities, spots, and matches as you browse.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={`${item.type}-${item.id}`}
          className="flex items-center justify-between rounded-xl border bg-card p-4 gap-4"
        >
          <Link href={item.href} className="flex-1 min-w-0 hover:underline">
            <p className="font-medium text-sm truncate">{item.label}</p>
            {item.sublabel && (
              <p className="text-xs text-muted-foreground truncate">{item.sublabel}</p>
            )}
            <p className="text-xs text-green-600 mt-0.5">{TYPE_LABELS[item.type]}</p>
          </Link>
          <button
            onClick={() => remove(item.type, item.id)}
            className="text-muted-foreground hover:text-foreground text-lg leading-none shrink-0"
            aria-label="Remove"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
