'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Home, Map, Search, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/explore', label: 'Esplora', icon: Search },
  { href: '/match', label: 'Match', icon: Sparkles },
  { href: '/map', label: 'Mappa', icon: Map },
  { href: '/favorites', label: 'Preferiti', icon: Heart }
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-bg/92 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link key={href} href={href} className={cn('flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-bold text-muted', active && 'bg-surface2 text-lime')}>
              <Icon size={19} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
