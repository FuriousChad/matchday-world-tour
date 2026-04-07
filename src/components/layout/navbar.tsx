'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { AuthButton } from '@/components/layout/auth-button'

const NAV_LINKS = [
  { href: '/',      label: 'Home'    },
  { href: '/team',  label: 'My Team' },
  { href: '/saved', label: 'My Trip' },
  { href: '/blog',  label: 'Guides'  },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-green-600">⚽</span> Matchday World Tour
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {label}
              </Link>
            ))}
            <AuthButton />
          </nav>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t bg-background">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-1 flex-col items-center py-2 text-xs font-medium transition-colors',
              pathname === href ? 'text-green-600' : 'text-foreground/60'
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  )
}
