'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Event } from '@/data/events'
import Badge from '@/components/ui/Badge'
import PriceTag from '@/components/ui/PriceTag'
import { categoryLabels } from '@/lib/categories'
import { formatDate, googleMapsUrl } from '@/lib/utils'

export default function EventBottomSheet({ event, onClose }: { event: Event; onClose: () => void }) {
  return (
    <>
      <button aria-label="Chiudi dettaglio mappa" onClick={onClose} className="fixed inset-0 z-[900] bg-black/45" />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-[901] rounded-t-[24px] border border-border bg-bg p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-2xl md:left-auto md:right-8 md:w-[420px] md:rounded-card"
      >
        <div className="relative aspect-video overflow-hidden rounded-card">
          <Image src={event.coverUrl} alt={event.title} fill className="object-cover" />
        </div>
        <div className="mt-4">
          <Badge>{categoryLabels[event.category]}</Badge>
          <h2 className="mt-3 font-display text-3xl font-black leading-none">{event.title}</h2>
          <p className="mt-2 text-sm font-bold text-muted">{event.venue} · {event.city}</p>
          <p className="mt-1 text-sm font-bold text-muted">{formatDate(event.date, event.timeStart)}</p>
          <div className="mt-3"><PriceTag event={event} /></div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link href={`/events/${event.slug}`} className="rounded-chip bg-lime px-4 py-3 text-center text-sm font-black text-black">Vedi dettaglio</Link>
            <a href={googleMapsUrl(event)} target="_blank" className="rounded-chip bg-surface2 px-4 py-3 text-center text-sm font-black">Indicazioni</a>
          </div>
        </div>
      </motion.div>
    </>
  )
}
