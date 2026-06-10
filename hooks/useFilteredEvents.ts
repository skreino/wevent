'use client'

import { useMemo } from 'react'
import type { Event } from '@/data/events'
import type { EventCategory } from '@/lib/categories'

export interface EventFilters {
  query?: string
  city?: string
  categories?: EventCategory[]
  date?: 'today' | 'tomorrow' | 'weekend' | 'week'
  price?: 'free' | 'paid' | 'all'
}

export function useFilteredEvents(allEvents: Event[], filters: EventFilters) {
  return useMemo(() => {
    const now = new Date()
    const today = now.toISOString().slice(0, 10)
    const tomorrow = new Date(now)
    tomorrow.setDate(now.getDate() + 1)
    const tomorrowIso = tomorrow.toISOString().slice(0, 10)

    return allEvents
      .filter((event) => {
        const haystack = `${event.title} ${event.venue} ${event.city} ${event.description}`.toLowerCase()
        if (filters.query && !haystack.includes(filters.query.toLowerCase())) return false
        if (filters.city && filters.city !== 'Tutte' && event.city !== filters.city) return false
        if (filters.categories?.length && !filters.categories.includes(event.category)) return false
        if (filters.price && filters.price !== 'all' && event.priceType !== filters.price) return false
        if (filters.date === 'today' && event.date !== today) return false
        if (filters.date === 'tomorrow' && event.date !== tomorrowIso) return false
        if (filters.date === 'week' && new Date(event.date).getTime() > now.getTime() + 7 * 86400000) return false
        if (filters.date === 'weekend') {
          const day = new Date(event.date).getDay()
          if (![0, 5, 6].includes(day)) return false
        }
        return true
      })
      .sort((a, b) => Number(b.featured) - Number(a.featured) || a.date.localeCompare(b.date))
  }, [allEvents, filters])
}
