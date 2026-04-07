import type { Metadata } from 'next'
import { SavedListClient } from '@/components/shared/saved-list-client'

export const metadata: Metadata = {
  title: 'My Trip',
  description: 'Your saved cities, places, and matches for the 2026 World Cup.',
}

export default function SavedPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold mb-1">My Trip</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Everything you&apos;ve saved — cities, spots, and matches.
      </p>
      <SavedListClient />
    </div>
  )
}
