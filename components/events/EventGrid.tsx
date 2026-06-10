import type { Event } from '@/data/events'
import EventCard from './EventCard'

export default function EventGrid({ events }: { events: Event[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
      {events.map((event) => <EventCard key={event.slug} event={event} />)}
    </div>
  )
}
