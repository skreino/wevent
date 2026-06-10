import type { Event } from '@/data/events'

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(event: Event) {
  if (event.priceType === 'free') return 'Gratuito'
  return `€${event.priceAmount ?? 10}`
}

export function formatDate(date: string, time?: string) {
  return new Intl.DateTimeFormat('it-IT', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  }).format(new Date(date)) + (time ? ` · ${time}` : '')
}

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function googleMapsUrl(event: Event) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.venue} ${event.address} ${event.city}`)}`
}

export function instagramUrl(value?: string) {
  if (!value) return null
  const clean = value.trim().replace(/^@/, '')
  if (!clean || clean === 'https://instagram.com' || clean === 'instagram.com') return null
  if (clean.startsWith('https://instagram.com/') || clean.startsWith('https://www.instagram.com/')) return clean
  return `https://instagram.com/${clean}`
}
