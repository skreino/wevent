'use client'

import { useEffect, useMemo, useState } from 'react'

const KEY = 'wevent_favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem(KEY) || '[]'))
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites))
  }, [favorites])

  return useMemo(() => ({
    favorites,
    isFavorite: (slug: string) => favorites.includes(slug),
    addFavorite: (slug: string) => setFavorites((items) => Array.from(new Set([...items, slug]))),
    removeFavorite: (slug: string) => setFavorites((items) => items.filter((item) => item !== slug)),
    toggleFavorite: (slug: string) => setFavorites((items) => items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug])
  }), [favorites])
}
