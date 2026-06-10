'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Search } from 'lucide-react'
import BrandMark from '@/components/ui/BrandMark'
import { useGeolocation } from '@/hooks/useGeolocation'

export default function Hero() {
  const reduce = useReducedMotion()
  const { lat, lng, request, loading, error } = useGeolocation()
  const [geoMessage, setGeoMessage] = useState('')

  useEffect(() => {
    if (lat && lng) setGeoMessage('Posizione rilevata. Ora puoi filtrare gli eventi vicini.')
  }, [lat, lng])

  useEffect(() => {
    if (error) setGeoMessage(error === 'Permesso posizione negato' ? 'Permesso negato. Puoi cercare per città.' : error)
  }, [error])

  return (
    <section className="relative min-h-[76dvh] overflow-hidden py-5 md:grid md:min-h-[720px] md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-8 md:py-12">
      <BrandMark className="absolute -right-24 top-4 h-72 w-72 text-lime opacity-[0.08] md:left-1/3 md:top-0 md:h-[520px] md:w-[520px]" />
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.36 }}
        className="relative z-10"
      >
        <div className="relative mb-8 h-24 w-56 md:h-32 md:w-80">
          <Image src="/brand/wevent-logo.png" alt="wevent" fill className="object-contain object-left" priority />
        </div>
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-lime">Milano · Monza · Bergamo</p>
        <h1 className="poster-title mt-4 max-w-[760px] font-display text-[4.2rem] font-black leading-[0.82] text-cream md:text-[7.2rem]">
          Che si fa<br />stasera<span className="text-lime">?</span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted md:text-lg">Serate, aperitivi, DJ set e live vicino a te. Entri, trovi, decidi.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={request} disabled={loading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-chip bg-lime px-5 py-3 font-black text-black transition hover:bg-cream disabled:cursor-wait disabled:opacity-80">
            <MapPin size={18} /> {loading ? 'Rilevo posizione...' : lat && lng ? 'Posizione rilevata' : 'Usa la mia posizione'}
          </button>
          <Link href="/explore" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-chip bg-surface2 px-5 py-3 font-black text-cream ring-1 ring-border transition hover:ring-lime">
            <Search size={18} /> Cerca una città
          </Link>
        </div>
        {geoMessage && <p className="mt-3 max-w-sm text-sm font-bold text-muted">{geoMessage}</p>}
      </motion.div>
      <div className="relative z-10 mt-10 grid grid-cols-[1fr_0.72fr] gap-3 md:mt-0">
        <div className="relative aspect-[3/4] overflow-hidden rounded-card border border-border bg-surface">
          <Image src="/brand/founder.png" alt="Volto wevent" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-4 max-w-[10rem] font-display text-3xl font-black leading-none">Zero sbatti. Solo piani.</p>
        </div>
        <div className="space-y-3 pt-10">
          <div className="rounded-card border border-border bg-cream p-4 text-black">
            <p className="font-display text-4xl font-black leading-none">20</p>
            <p className="text-xs font-black uppercase tracking-[0.08em]">eventi demo</p>
          </div>
          <div className="rounded-card border border-lime/30 bg-surface p-4">
            <p className="font-display text-3xl font-black leading-none text-lime">live</p>
            <p className="mt-2 text-xs font-bold text-muted">Mappa, filtri e preferiti.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
