import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import MatchGame from '@/components/match/MatchGame'

export const metadata: Metadata = {
  title: 'Event Match - wevent',
  description: 'Trova un evento che piace a entrambi.'
}

export default function MatchPage() {
  return (
    <PageWrapper className="max-w-6xl">
      <MatchGame />
    </PageWrapper>
  )
}
