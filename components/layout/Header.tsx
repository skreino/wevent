import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'

const links = [
  ['Esplora', '/explore'],
  ['Mappa', '/map'],
  ['Preferiti', '/favorites']
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-border/70 bg-bg/82 backdrop-blur-xl md:block">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="relative h-14 w-40 overflow-hidden" aria-label="wevent home">
          <Image src="/brand/wevent-logo.png" alt="wevent" fill className="object-contain object-left" priority />
        </Link>
        <nav className="flex items-center gap-7 text-sm font-medium text-muted">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-cream">{label}</Link>
          ))}
          <Link href="/submit" className="inline-flex items-center gap-2 rounded-chip bg-lime px-4 py-2.5 text-sm font-bold text-black transition hover:bg-cream">
            <Plus size={16} /> Proponi evento
          </Link>
        </nav>
      </div>
    </header>
  )
}
