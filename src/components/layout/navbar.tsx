'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ComponentType } from 'react'
import { Menu, ChevronDown, Compass, Newspaper, Home, Bookmark, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AuthButton } from '@/components/layout/auth-button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

type NavItem = {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
}

type NavSection = {
  id: string
  label: string
  items: NavItem[]
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'explore',
    label: 'Explore',
    items: [
      { href: '/', label: 'Home', icon: Home },
      { href: '/blog', label: 'Guides', icon: Newspaper },
    ],
  },
  {
    id: 'planning',
    label: 'My Journey',
    items: [
      { href: '/team', label: 'My Team', icon: Shield },
      { href: '/saved', label: 'My Trip', icon: Bookmark },
    ],
  },
]

function NavLinks({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    explore: true,
    planning: true,
  })

  const toggleSection = (id: string) => {
    setOpenSections((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  return (
    <div className="space-y-4">
      {NAV_SECTIONS.map((section) => {
        const isOpen = openSections[section.id]

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
              <span>{section.label}</span>
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
    </div>
  )
}

export function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur md:hidden supports-[backdrop-filter]:bg-background/70">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-green-600">⚽</span> Matchday World Tour
          </Link>

          <Sheet>
            <SheetTrigger
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background"
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
                <NavLinks compact />
                <div className="border-t pt-4">
                  <AuthButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r bg-card md:flex md:flex-col">
        <div className="border-b px-5 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-green-600">⚽</span> Matchday World Tour
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">World Cup 2026 travel planner</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <NavLinks />
        </div>

        <div className="border-t p-4">
          <AuthButton />
        </div>
      </aside>
    </>
  )
}
