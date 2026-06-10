import Link from 'next/link'
import { SearchX } from 'lucide-react'

export default function EmptyState({ title = 'Niente qui.', text = 'Prova altrove.', ctaHref = '/explore', cta = 'Esplora eventi' }) {
  return (
    <div className="rounded-card border border-border bg-surface p-8 text-center">
      <SearchX className="mx-auto mb-4 text-muted" size={48} />
      <h2 className="font-display text-3xl font-black">{title}</h2>
      <p className="mt-2 text-sm text-muted">{text}</p>
      <Link href={ctaHref} className="mt-6 inline-flex rounded-chip bg-lime px-5 py-3 text-sm font-black text-black">{cta}</Link>
    </div>
  )
}
