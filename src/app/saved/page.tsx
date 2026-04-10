import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getSavedItemsForUser } from '@/lib/queries'
import { SavedListClient } from '@/components/shared/saved-list-client'

export const metadata: Metadata = {
  title: 'My Trip',
  description: 'Your saved cities, places, and matches for the 2026 World Cup.',
}

export default async function SavedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const initialItems = user ? await getSavedItemsForUser() : undefined

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 pb-20 md:pb-8">
      <h1 className="text-2xl font-bold mb-1">My Trip</h1>
      <p className="text-muted-foreground text-sm mb-8">
        Everything you&apos;ve saved — cities, spots, and matches.
      </p>
      <SavedListClient initialItems={initialItems} />
    </div>
  )
}
