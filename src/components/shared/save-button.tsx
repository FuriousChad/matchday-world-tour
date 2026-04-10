'use client'

import { Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFavorites } from '@/components/shared/favorites-provider'
import type { SavedItem } from '@/types'

type Props = {
  type: SavedItem['type']
  id: string
  label: string
  sublabel?: string
  image_url?: string | null
  href: string
  className?: string
}

export function SaveButton({ type, id, label, sublabel, image_url, href, className }: Props) {
  const { isSaved, toggle } = useFavorites()
  const saved = isSaved(type, id)

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle({ type, id, label, sublabel, image_url, href, saved_at: new Date().toISOString() })
      }}
      aria-label={saved ? 'Remove from My Trip' : 'Save to My Trip'}
      title={saved ? 'Remove from My Trip' : 'Save to My Trip'}
      className={cn(
        'inline-flex items-center justify-center rounded-full w-8 h-8 transition-colors',
        saved
          ? 'text-green-600 bg-green-100 hover:bg-green-200 dark:bg-green-900/40 dark:hover:bg-green-900/60'
          : 'text-muted-foreground bg-background/80 backdrop-blur-sm hover:bg-muted hover:text-foreground',
        className
      )}
    >
      <Bookmark className={cn('h-4 w-4', saved && 'fill-current')} />
    </button>
  )
}
