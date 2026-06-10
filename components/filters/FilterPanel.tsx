'use client'

import { categories, type EventCategory } from '@/lib/categories'
import type { EventFilters } from '@/hooks/useFilteredEvents'
import FilterChip from './FilterChip'

const cities = ['Tutte', 'Milano', 'Monza', 'Bergamo', 'Lecco', 'Vimercate', 'Busnago']

export default function FilterPanel({ filters, setFilters }: { filters: EventFilters; setFilters: (filters: EventFilters) => void }) {
  const toggleCategory = (category: EventCategory) => {
    const current = filters.categories ?? []
    setFilters({ ...filters, categories: current.includes(category) ? current.filter((item) => item !== category) : [...current, category] })
  }

  return (
    <aside className="space-y-6 rounded-card border border-border bg-surface p-4 md:sticky md:top-28">
      <div>
        <label className="mb-2 block text-[11px] font-black uppercase tracking-[0.1em] text-muted">Citta</label>
        <select value={filters.city ?? 'Tutte'} onChange={(event) => setFilters({ ...filters, city: event.target.value })} className="h-12 w-full rounded-xl border border-border bg-bg px-3 text-base outline-none focus:border-lime">
          {cities.map((city) => <option key={city}>{city}</option>)}
        </select>
      </div>
      <div>
        <p className="mb-2 text-[11px] font-black uppercase tracking-[0.1em] text-muted">Data</p>
        <div className="flex flex-wrap gap-2">
          {[
            ['today', 'Oggi'],
            ['tomorrow', 'Domani'],
            ['weekend', 'Weekend'],
            ['week', 'Settimana']
          ].map(([id, label]) => <FilterChip key={id} active={filters.date === id} onClick={() => setFilters({ ...filters, date: filters.date === id ? undefined : id as EventFilters['date'] })}>{label}</FilterChip>)}
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] font-black uppercase tracking-[0.1em] text-muted">Categoria</p>
        <div className="flex flex-wrap gap-2">
          {categories.filter((cat) => !['stasera', 'weekend'].includes(cat.id)).map(({ id, label }) => (
            <FilterChip key={id} active={filters.categories?.includes(id as EventCategory)} onClick={() => toggleCategory(id as EventCategory)}>{label}</FilterChip>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] font-black uppercase tracking-[0.1em] text-muted">Prezzo</p>
        <div className="flex flex-wrap gap-2">
          {[
            ['all', 'Tutti'],
            ['free', 'Gratis'],
            ['paid', 'A pagamento']
          ].map(([id, label]) => <FilterChip key={id} active={(filters.price ?? 'all') === id} onClick={() => setFilters({ ...filters, price: id as EventFilters['price'] })}>{label}</FilterChip>)}
        </div>
      </div>
      <button onClick={() => setFilters({ query: filters.query })} className="w-full rounded-chip border border-border px-4 py-3 text-sm font-black text-muted">Reset</button>
    </aside>
  )
}
