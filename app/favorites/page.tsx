import FavoritesClient from './FavoritesClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preferiti - wevent'
}

export default function FavoritesPage() {
  return <FavoritesClient />
}
