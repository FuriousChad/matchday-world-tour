'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSavedItems, unsaveItem } from '@/lib/saved'
import { useFavorites } from '@/components/shared/favorites-provider'
import type { SavedItem } from '@/types'

const TYPE_LABELS: Record<SavedItem['type'], string> = {
  city:  'City',
  place: 'Spot',
  match: 'Match',
}

type Props = {
  /** Pre-fetched items for authenticated users (from Supabase). If absent, reads localStorage. */
  initialItems?: SavedItem[]
}

export function SavedListClient({ initialItems }: Props) {
  const [items, setItems] = useState<SavedItem[]>(initialItems ?? [])
  const [mounted, setMounted] = useState(!!initialItems)
  const { toggle } = useFavorites()

  useEffect(() => {
    if (!initialItems) {
      setItems(getSavedItems())
    }
    setMounted(true)
  }, [initialItems])

  function remove(item: SavedItem) {
    toggle(item)
    if (!initialItems) {
      unsaveItem(item.type, item.id)
      setItems(getSavedItems())
    } else {
      setItems((prev) => prev.filter((i) => !(i.type === item.type && i.id === item.id)))
    }
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
            onClick={() => remove(item)}
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
