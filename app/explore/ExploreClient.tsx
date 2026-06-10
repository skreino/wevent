'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import SearchBar from '@/components/filters/SearchBar'
import FilterPanel from '@/components/filters/FilterPanel'
import EventGrid from '@/components/events/EventGrid'
import EmptyState from '@/components/ui/EmptyState'
import { events } from '@/data/events'
import { useFilteredEvents, type EventFilters } from '@/hooks/useFilteredEvents'
import type { EventCategory } from '@/lib/categories'

export default function ExploreClient() {
  const params = useSearchParams()
  const [filters, setFilters] = useState<EventFilters>({
    categories: params.get('category') && !['stasera', 'weekend'].includes(params.get('category')!) ? [params.get('category') as EventCategory] : undefined,
    date: params.get('date') === 'weekend' ? 'weekend' : undefined,
    price: 'all'
  })
  const filtered = useFilteredEvents(events, filters)

  return (
    <PageWrapper>
      <div className="mb-6">
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-lime">Esplora</p>
        <h1 className="mt-2 font-display text-5xl font-black leading-none">Trova il tuo piano.</h1>
      </div>
      <div className="grid gap-5 md:grid-cols-[300px_1fr]">
        <FilterPanel filters={filters} setFilters={setFilters} />
        <section>
          <div className="sticky top-0 z-20 -mx-4 bg-bg/90 px-4 py-3 backdrop-blur md:static md:mx-0 md:bg-transparent md:px-0 md:pt-0">
            <SearchBar value={filters.query ?? ''} onChange={(query) => setFilters({ ...filters, query })} />
            <p className="mt-3 text-sm font-bold text-muted">{filtered.length} eventi trovati</p>
          </div>
          {filtered.length ? <EventGrid events={filtered} /> : <EmptyState title="Niente qui." text="Cambia filtri o cerca un altra citta." />}
        </section>
      </div>
    </PageWrapper>
  )
}
