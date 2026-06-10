import ExploreClient from './ExploreClient'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Esplora eventi - wevent'
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreClient />
    </Suspense>
  )
}
