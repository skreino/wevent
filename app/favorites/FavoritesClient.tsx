'use client'

import PageWrapper from '@/components/layout/PageWrapper'
import EventGrid from '@/components/events/EventGrid'
import EmptyState from '@/components/ui/EmptyState'
import { events } from '@/data/events'
import { useFavorites } from '@/hooks/useFavorites'

export default function FavoritesClient() {
  const { favorites } = useFavorites()
  const saved = events.filter((event) => favorites.includes(event.slug))

  return (
    <PageWrapper>
      <p className="text-[11px] font-black uppercase tracking-[0.12em] text-lime">Preferiti</p>
      <h1 className="mt-2 font-display text-5xl font-black leading-none">I tuoi preferiti</h1>
      <p className="mb-6 mt-3 text-sm font-bold text-muted">{saved.length} salvati</p>
      {saved.length ? <EventGrid events={saved} /> : <EmptyState title="Lista vuota." text="Salva qualcosa per dopo." />}
    </PageWrapper>
  )
}
