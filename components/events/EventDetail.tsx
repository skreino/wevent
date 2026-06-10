'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock, Instagram, MapPin } from 'lucide-react'
import type { Event } from '@/data/events'
import { events } from '@/data/events'
import { categoryLabels } from '@/lib/categories'
import { formatDate, googleMapsUrl } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import FavoriteButton from '@/components/ui/FavoriteButton'
import ShareButton from '@/components/ui/ShareButton'
import EventCard from './EventCard'

export default function EventDetail({ event }: { event: Event }) {
  const similar = events.filter((item) => item.category === event.category && item.slug !== event.slug).slice(0, 3)

  return (
    <article>
      <Link href="/explore" className="mb-4 inline-flex items-center gap-2 rounded-chip bg-surface2 px-4 py-2 text-sm font-bold text-muted">
        <ArrowLeft size={16} /> Indietro
      </Link>
      <div className="relative -mx-4 aspect-video overflow-hidden md:mx-0 md:rounded-card md:border md:border-border">
        <Image src={event.coverUrl} alt={event.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute bottom-4 left-4"><Badge>{categoryLabels[event.category]}</Badge></div>
      </div>
      <div className="mx-auto max-w-3xl py-6">
        <h1 className="font-display text-5xl font-black leading-none md:text-7xl">{event.title}</h1>
        <div className="mt-5 space-y-3 text-sm font-medium text-muted">
          <a href={googleMapsUrl(event)} target="_blank" className="flex items-center gap-2 text-cream underline decoration-lime/50 underline-offset-4">
            <MapPin size={18} /> {event.venue}
          </a>
          <p>{event.address}, {event.city}</p>
          <p className="flex items-center gap-2"><CalendarDays size={18} /> {formatDate(event.date)}</p>
          <p className="flex items-center gap-2"><Clock size={18} /> {event.timeStart} - {event.timeEnd}</p>
        </div>
        <hr className="my-7 border-border" />
        <p className="text-base leading-7 text-cream/85">{event.description}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a href={event.bookingUrl} className="inline-flex min-h-12 items-center justify-center rounded-chip bg-lime px-5 py-3 font-black text-black">Prenota / Info</a>
          <a href={googleMapsUrl(event)} target="_blank" className="inline-flex min-h-12 items-center justify-center rounded-chip bg-surface2 px-5 py-3 font-black">Indicazioni</a>
          <a href={event.instagramUrl} target="_blank" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-chip border border-border px-5 py-3 font-black"><Instagram size={18} /> Instagram</a>
        </div>
        <div className="mt-6 flex gap-3">
          <FavoriteButton slug={event.slug} label />
          <ShareButton title={event.title} />
        </div>
      </div>
      {similar.length > 0 && (
        <section className="py-6">
          <h2 className="mb-4 font-display text-3xl font-black">Potrebbe interessarti</h2>
          <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none]">
            {similar.map((item) => <EventCard key={item.slug} event={item} compact />)}
          </div>
        </section>
      )}
    </article>
  )
}
