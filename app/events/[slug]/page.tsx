import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import EventDetail from '@/components/events/EventDetail'
import { events } from '@/data/events'

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = events.find((item) => item.slug === params.slug)
  if (!event) return { title: 'Evento - wevent' }
  return {
    title: `${event.title} a ${event.city} - wevent`,
    description: event.description,
    openGraph: { images: [event.coverUrl] }
  }
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = events.find((item) => item.slug === params.slug)
  if (!event) notFound()
  return (
    <PageWrapper>
      <EventDetail event={event} />
    </PageWrapper>
  )
}
