import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/home/Hero'
import CategoryChips from '@/components/home/CategoryChips'
import SectionHeader from '@/components/home/SectionHeader'
import FeaturedScroll from '@/components/home/FeaturedScroll'
import OrganizerCTA from '@/components/home/OrganizerCTA'
import EventGrid from '@/components/events/EventGrid'
import BrandMark from '@/components/ui/BrandMark'
import { events } from '@/data/events'
import { isWeekendEvent } from '@/lib/eventFilters'

export default function HomePage() {
  const featured = events.filter((event) => event.featured)
  const weekendEvents = events.filter(isWeekendEvent).slice(0, 4)
  return (
    <PageWrapper className="pt-0">
      <Hero />
      <section className="py-6">
        <CategoryChips />
      </section>
      <section className="py-8">
        <SectionHeader title="Vicino a te" count={`${events.length} eventi`} href="/explore" />
        <EventGrid events={events.slice(0, 6)} />
      </section>
      <section className="relative py-8">
        <BrandMark className="absolute -left-24 top-0 h-72 w-72 text-lime opacity-[0.06]" />
        <SectionHeader title="Da non perdere" />
        <FeaturedScroll events={featured} />
      </section>
      <section className="py-8">
        <SectionHeader title="Nel weekend" href="/explore?date=weekend" />
        <EventGrid events={weekendEvents} />
      </section>
      <OrganizerCTA />
      <footer className="mt-12 flex flex-col gap-4 border-t border-border py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <span className="font-black text-cream">wevent © 2026</span>
        <span>Fatto con cuore a Milano</span>
      </footer>
    </PageWrapper>
  )
}
