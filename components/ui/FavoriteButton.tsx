'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'
import { cn } from '@/lib/utils'

export default function FavoriteButton({ slug, label = false }: { slug: string; label?: boolean }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(slug)

  return (
    <motion.button
      whileTap={{ scale: [1, 1.3, 1] }}
      onClick={(event) => {
        event.preventDefault()
        toggleFavorite(slug)
      }}
      aria-label={active ? 'Rimuovi dai preferiti' : 'Salva nei preferiti'}
      aria-pressed={active}
      className={cn('inline-flex items-center justify-center gap-2 rounded-chip border border-border bg-bg/70 px-3 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime', active && 'border-lime text-lime')}
    >
      <Heart size={18} fill={active ? 'currentColor' : 'none'} />
      {label && <span>{active ? 'Salvato' : 'Salva'}</span>}
    </motion.button>
  )
}
