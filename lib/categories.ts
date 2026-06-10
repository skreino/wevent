import { CalendarDays, Clapperboard, CupSoda, Drama, Gift, Martini, Mic2, Moon, Music2, Palette, Pizza, type LucideIcon } from 'lucide-react'

export type EventCategory = 'aperitivo' | 'dj-set' | 'live' | 'serata' | 'food' | 'gratis' | 'esperienze' | 'comedy'

export const categories: Array<{ id: EventCategory | 'stasera' | 'weekend'; label: string; icon: LucideIcon }> = [
  { id: 'stasera', label: 'Stasera', icon: Moon },
  { id: 'aperitivo', label: 'Aperitivo', icon: Martini },
  { id: 'dj-set', label: 'DJ Set', icon: Music2 },
  { id: 'live', label: 'Live', icon: Mic2 },
  { id: 'food', label: 'Food', icon: Pizza },
  { id: 'serata', label: 'Serata', icon: Clapperboard },
  { id: 'gratis', label: 'Gratis', icon: Gift },
  { id: 'weekend', label: 'Weekend', icon: CalendarDays },
  { id: 'esperienze', label: 'Esperienze', icon: Palette },
  { id: 'comedy', label: 'Comedy', icon: Drama }
]

export const categoryLabels: Record<EventCategory, string> = {
  aperitivo: 'Aperitivo',
  'dj-set': 'DJ Set',
  live: 'Live',
  serata: 'Serata',
  food: 'Food',
  gratis: 'Gratis',
  esperienze: 'Esperienze',
  comedy: 'Comedy'
}
