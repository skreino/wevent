'use client'

import { useMemo } from 'react'
import type { Event } from '@/data/events'
import { filterEvents, type EventFilters } from '@/lib/eventFilters'

export type { EventFilters }

export function useFilteredEvents(allEvents: Event[], filters: EventFilters) {
  return useMemo(() => filterEvents(allEvents, filters), [allEvents, filters])
}
