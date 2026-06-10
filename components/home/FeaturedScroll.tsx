import Image from 'next/image'
import Link from 'next/link'
import type { Event } from '@/data/events'
import Badge from '@/components/ui/Badge'
import { categoryLabels } from '@/lib/categories'
import { formatDate } from '@/lib/utils'

export default function FeaturedScroll({ events }: { events: Event[] }) {
  return (
    <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] md:mx-0 md:px-0">
      {events.map((event) => (
        <Link key={event.slug} href={`/events/${event.slug}`} className="group relative min-w-[86%] snap-start overflow-hidden rounded-card border border-border bg-surface md:min-w-[520px]">
          <div className="relative aspect-video">
            <Image src={event.coverUrl} alt={event.title} fill sizes="520px" className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <Badge>{categoryLabels[event.category]}</Badge>
            <h3 className="mt-3 font-display text-3xl font-black leading-none">{event.title}</h3>
            <p className="mt-2 text-sm font-bold text-cream/75">{event.venue} · {formatDate(event.date, event.timeStart)}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
