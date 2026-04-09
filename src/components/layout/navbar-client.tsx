'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, type ComponentType } from 'react'
import { Menu, ChevronDown, Compass, Newspaper, Home, Bookmark, Shield, Building2, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AuthButton } from '@/components/layout/auth-button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { City, Team } from '@/types'

type NavItem = {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
}

type StaticNavSection = {
  id: string
  label: string
  icon: ComponentType<{ className?: string }>
  items: NavItem[]
}

const STATIC_NAV_SECTIONS: StaticNavSection[] = [
  {
    id: 'explore',
    label: 'Explore',
    icon: Compass,
    items: [
      { href: '/', label: 'Home', icon: Home },
      { href: '/blog', label: 'Guides', icon: Newspaper },
    ],
  },
  {
    id: 'planning',
    label: 'My Journey',
    icon: Shield,
    items: [
      { href: '/team', label: 'My Team', icon: Shield },
      { href: '/saved', label: 'My Trip', icon: Bookmark },
    ],
  },
]

function NavLinks({ teams, cities, compact = false }: { teams: Team[]; cities: City[]; compact?: boolean }) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    explore: true,
    planning: true,
    teams: false,
    cities: false,
  })

  const toggleSection = (id: string) => {
    setOpenSections((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  return (
    <div className="space-y-4">
      {STATIC_NAV_SECTIONS.map((section) => {
        const isOpen = openSections[section.id]
        const SectionIcon = section.icon

        return (
          <div key={section.id}>
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className={cn(
                'mb-1 flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:bg-muted/60',
                compact && 'text-[11px]'
              )}
              aria-expanded={isOpen}
            >
              <span className="inline-flex items-center gap-2">
                <SectionIcon className="h-3.5 w-3.5" />
                {section.label}
              </span>
              <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
            </button>

            {isOpen && (
              <ul className="space-y-1">
                {section.items.map(({ href, label, icon: Icon }) => {
                  const isActive = pathname === href
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={cn(
                          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-green-600/10 text-green-700'
                            : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}

      <div>
        <button
          type="button"
          onClick={() => toggleSection('teams')}
          className={cn(
            'mb-1 flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:bg-muted/60',
            compact && 'text-[11px]'
          )}
          aria-expanded={openSections.teams}
        >
          <span className="inline-flex items-center gap-2">
            <Users className="h-3.5 w-3.5" />
            Teams
          </span>
          <ChevronDown className={cn('h-4 w-4 transition-transform', openSections.teams && 'rotate-180')} />
        </button>
        {openSections.teams && (
          <ul className="space-y-1">
            {teams.map((team) => (
              <li key={team.id}>
                <Link
                  href={`/team?team=${team.slug}`}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                    pathname === '/team' ? 'text-foreground' : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                  )}
                >
                  {team.flag_url ? (
                    <Image
                      src={team.flag_url}
                      alt={team.name}
                      width={20}
                      height={14}
                      className="rounded-sm object-cover shrink-0"
                    />
                  ) : (
                    <div className="h-3.5 w-5 rounded-sm bg-muted shrink-0" />
                  )}
                  <span className="truncate">{team.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => toggleSection('cities')}
          className={cn(
            'mb-1 flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:bg-muted/60',
            compact && 'text-[11px]'
          )}
          aria-expanded={openSections.cities}
        >
          <span className="inline-flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5" />
            Cities
          </span>
          <ChevronDown className={cn('h-4 w-4 transition-transform', openSections.cities && 'rotate-180')} />
        </button>
        {openSections.cities && (
          <ul className="space-y-1">
            {cities.map((city) => (
              <li key={city.id}>
                <Link
                  href={`/cities/${city.slug}`}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-sm transition-colors',
                    pathname === `/cities/${city.slug}`
                      ? 'bg-green-600/10 text-green-700'
                      : 'text-foreground/70 hover:bg-muted hover:text-foreground'
                  )}
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function NavbarClient({ teams, cities }: { teams: Team[]; cities: City[] }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="text-green-600">⚽</span> Matchday World Tour
          </Link>

          <Sheet>
            <SheetTrigger
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[88%] max-w-xs p-0">
              <SheetHeader className="border-b px-4 py-4">
                <SheetTitle>
                  <span className="inline-flex items-center gap-2 text-lg">
                    <Compass className="h-5 w-5 text-green-600" />
                    Navigate
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-6 p-4">
                <NavLinks teams={teams} cities={cities} compact />
                <div className="border-t pt-4">
                  <AuthButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <aside className="hidden w-72 shrink-0 border-r bg-card md:sticky md:top-14 md:flex md:flex-col" style={{ height: 'calc(100vh - 3.5rem)' }}>
        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks teams={teams} cities={cities} />
        </div>

        <div className="border-t p-4">
          <AuthButton />
        </div>
      </aside>
    </>
  )
}
