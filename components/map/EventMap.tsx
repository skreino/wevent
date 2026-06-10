'use client'

import 'leaflet/dist/leaflet.css'
import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import { LocateFixed } from 'lucide-react'
import type { Event } from '@/data/events'
import { events } from '@/data/events'
import { useGeolocation } from '@/hooks/useGeolocation'
import EventBottomSheet from './EventBottomSheet'

function markerIcon(event: Event, selected: boolean) {
  return L.divIcon({
    className: '',
    html: `<div style="width:${selected ? 42 : event.featured ? 38 : 32}px;height:${selected ? 42 : event.featured ? 38 : 32}px;border-radius:999px;background:${event.featured ? '#FF5F87' : '#C7FF3D'};border:3px solid #0A0A0A;box-shadow:0 0 0 2px rgba(199,255,61,.22);display:grid;place-items:center;color:#0A0A0A;font-weight:900;font-size:12px;">${event.category.slice(0, 2).toUpperCase()}</div>`,
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  })
}

function FlyTo({ event }: { event: Event | null }) {
  const map = useMap()
  if (event) map.flyTo([event.lat, event.lng], 14, { duration: 0.7 })
  return null
}

export default function EventMap() {
  const [selected, setSelected] = useState<Event | null>(events[0])
  const { lat, lng, request } = useGeolocation()
  const userIcon = useMemo(() => L.divIcon({
    className: '',
    html: '<div style="width:18px;height:18px;border-radius:999px;background:#F0EBE0;border:4px solid #0930B8;box-shadow:0 0 0 6px rgba(9,48,184,.25)"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  }), [])

  return (
    <div className="relative h-[calc(100dvh-76px)] min-h-[620px] overflow-hidden rounded-none md:h-[calc(100dvh-120px)] md:rounded-card md:border md:border-border">
      <MapContainer center={[45.4654, 9.1866]} zoom={11} scrollWheelZoom className="h-full w-full">
        <TileLayer attribution="&copy; OpenStreetMap &copy; CARTO" url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <FlyTo event={selected} />
        {events.map((event) => (
          <Marker key={event.slug} position={[event.lat, event.lng]} icon={markerIcon(event, selected?.slug === event.slug)} eventHandlers={{ click: () => setSelected(event) }} />
        ))}
        {lat && lng && <Marker position={[lat, lng]} icon={userIcon} />}
      </MapContainer>
      <button onClick={request} className="absolute right-4 top-4 z-[800] flex h-12 w-12 items-center justify-center rounded-full bg-lime text-black shadow-lime" aria-label="Usa la mia posizione">
        <LocateFixed size={20} />
      </button>
      <div className="absolute left-4 top-4 z-[800] hidden max-h-[calc(100%-2rem)] w-80 overflow-y-auto rounded-card border border-border bg-bg/88 p-3 backdrop-blur md:block">
        {events.slice(0, 10).map((event) => (
          <button key={event.slug} onClick={() => setSelected(event)} className="mb-2 w-full rounded-xl border border-border bg-surface p-3 text-left hover:border-lime">
            <span className="block font-display text-lg font-black leading-none">{event.title}</span>
            <span className="mt-1 block text-xs font-bold text-muted">{event.venue} · {event.city}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {selected && <EventBottomSheet key={selected.slug} event={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
