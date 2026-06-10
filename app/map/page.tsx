import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'

const EventMap = dynamic(() => import('@/components/map/EventMap'), {
  ssr: false,
  loading: () => <div className="h-[calc(100dvh-120px)] rounded-card shimmer" />
})

export const metadata: Metadata = {
  title: 'Mappa eventi - wevent'
}

export default function MapPage() {
  return (
    <PageWrapper className="max-w-none px-0 pt-0 md:px-6 md:pt-8">
      <EventMap />
    </PageWrapper>
  )
}
