import type { Event } from '@/data/events'
import { formatPrice } from '@/lib/utils'

export default function PriceTag({ event }: { event: Event }) {
  const free = event.priceType === 'free'
  return <span className={free ? 'font-black text-lime' : 'font-bold text-cream'}>{formatPrice(event)}</span>
}
