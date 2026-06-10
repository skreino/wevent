import ExploreClient from './ExploreClient'
import type { Metadata } from 'next'
import { events } from '@/data/events'
import { filterEvents, type EventFilters } from '@/lib/eventFilters'
import type { EventCategory } from '@/lib/categories'

export const metadata: Metadata = {
  title: 'Esplora eventi - wevent'
}

export default function ExplorePage({ searchParams }: { searchParams?: { category?: string; date?: string; city?: string; price?: string; q?: string } }) {
  const category = searchParams?.category
  const date = searchParams?.date
  const price = searchParams?.price
  const initialFilters: EventFilters = {
    query: searchParams?.q,
    city: searchParams?.city,
    categories: category && !['stasera', 'weekend'].includes(category) ? [category as EventCategory] : undefined,
    date: date === 'weekend' || date === 'today' || date === 'tomorrow' || date === 'week' ? date : undefined,
    price: price === 'free' || price === 'paid' ? price : 'all'
  }
  const initialEvents = filterEvents(events, initialFilters)

  return <ExploreClient initialFilters={initialFilters} initialEvents={initialEvents} />
}
