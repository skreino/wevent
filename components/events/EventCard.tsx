import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin } from 'lucide-react'
import type { Event } from '@/data/events'
import { categoryLabels } from '@/lib/categories'
import { cn, formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import FavoriteButton from '@/components/ui/FavoriteButton'
import PriceTag from '@/components/ui/PriceTag'

export default function EventCard({ event, compact = false }: { event: Event; compact?: boolean }) {
  return (
    <Link href={`/events/${event.slug}`} className={cn('group block overflow-hidden rounded-card border border-border bg-surface transition duration-300 hover:scale-[1.02] hover:shadow-lime', compact && 'min-w-[240px]')}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={event.coverUrl} alt={event.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-2 top-2"><Badge>{categoryLabels[event.category]}</Badge></div>
        {event.hot && <div className="absolute right-2 top-2"><Badge tone="coral">HOT</Badge></div>}
      </div>
      <div className="space-y-3 p-3 md:p-4">
        <h3 className="line-clamp-2 font-display text-lg font-black leading-[1.05]">{event.title}</h3>
        <div className="space-y-1 text-[12px] font-medium text-muted">
          <p className="flex items-center gap-1.5"><MapPin size={13} /> {event.venue} · {event.city}</p>
          <p className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatDate(event.date, event.timeStart)}</p>
        </div>
        <div className="flex items-center justify-between">
          <PriceTag event={event} />
          <FavoriteButton slug={event.slug} />
        </div>
      </div>
    </Link>
  )
}
