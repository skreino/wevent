'use client'

import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import SearchBar from '@/components/filters/SearchBar'
import FilterPanel from '@/components/filters/FilterPanel'
import EventGrid from '@/components/events/EventGrid'
import EmptyState from '@/components/ui/EmptyState'
import { events, type Event } from '@/data/events'
import { useFilteredEvents, type EventFilters } from '@/hooks/useFilteredEvents'

export default function ExploreClient({ initialFilters, initialEvents }: { initialFilters: EventFilters; initialEvents: Event[] }) {
  const [filters, setFilters] = useState<EventFilters>(initialFilters)
  const filtered = useFilteredEvents(events, filters)
  const shownEvents = JSON.stringify(filters) === JSON.stringify(initialFilters) ? initialEvents : filtered

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
            <p className="mt-3 text-sm font-bold text-muted">{shownEvents.length} eventi trovati</p>
          </div>
          {shownEvents.length ? <EventGrid events={shownEvents} /> : <EmptyState title="Niente qui." text="Cambia filtri o cerca un'altra città." />}
        </section>
      </div>
    </PageWrapper>
  )
}
