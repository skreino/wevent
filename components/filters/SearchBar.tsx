'use client'

import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="relative block">
      <span className="sr-only">Cerca evento</span>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Cerca evento, locale, citta..."
        className="h-13 w-full rounded-card border border-border bg-surface2 py-4 pl-12 pr-12 text-base outline-none transition placeholder:text-muted focus:border-lime focus:ring-2 focus:ring-lime/20"
      />
      {value && (
        <button type="button" aria-label="Svuota ricerca" onClick={() => onChange('')} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-cream">
          <X size={18} />
        </button>
      )}
    </label>
  )
}
