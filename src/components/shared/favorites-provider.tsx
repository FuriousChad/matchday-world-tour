'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { getSavedItems, saveItem, unsaveItem } from '@/lib/saved'
import {
  addSupabaseFavorite,
  favoriteKey,
  fetchFavoriteKeys,
  removeSupabaseFavorite,
} from '@/lib/favorites'
import type { SavedItem } from '@/types'

type FavoritesContextValue = {
  isSaved: (type: SavedItem['type'], id: string) => boolean
  toggle: (item: SavedItem) => void
}

const FavoritesContext = createContext<FavoritesContextValue>({
  isSaved: () => false,
  toggle: () => {},
})

export function useFavorites() {
  return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    const supabase = createClient()

    async function load(currentUser: User | null) {
      if (currentUser) {
        const keys = await fetchFavoriteKeys(supabase)
        setSavedKeys(keys)
      } else {
        const items = getSavedItems()
        setSavedKeys(new Set(items.map((i) => favoriteKey(i.type, i.id))))
      }
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      load(data.user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      load(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const isSaved = useCallback(
    (type: SavedItem['type'], id: string) => savedKeys.has(favoriteKey(type, id)),
    [savedKeys]
  )

  const toggle = useCallback(
    async (item: SavedItem) => {
      const key = favoriteKey(item.type, item.id)
      const supabase = createClient()

      if (savedKeys.has(key)) {
        setSavedKeys((prev) => {
          const next = new Set(prev)
          next.delete(key)
          return next
        })
        if (user) {
          await removeSupabaseFavorite(supabase, item.type, item.id)
        } else {
          unsaveItem(item.type, item.id)
        }
      } else {
        setSavedKeys((prev) => new Set([...prev, key]))
        if (user) {
          await addSupabaseFavorite(supabase, user.id, item)
        } else {
          saveItem(item)
        }
      }
    },
    [user, savedKeys]
  )

  return (
    <FavoritesContext.Provider value={{ isSaved, toggle }}>
      {children}
    </FavoritesContext.Provider>
  )
}
