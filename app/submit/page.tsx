import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SubmitEventForm from '@/components/form/SubmitEventForm'

export const metadata: Metadata = {
  title: 'Proponi evento - wevent'
}

export default function SubmitPage() {
  return (
    <PageWrapper className="max-w-6xl">
      <div className="mb-8 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-lime">Proponi evento</p>
          <h1 className="mt-2 max-w-lg font-display text-5xl font-black leading-[0.9] md:text-7xl">Qualcosa succede sempre.</h1>
        </div>
        <p className="max-w-md text-sm font-medium leading-6 text-muted md:justify-self-end">
          Mandaci i dettagli essenziali. Niente account, niente pannelli pesanti.
        </p>
      </div>
      <SubmitEventForm />
    </PageWrapper>
  )
}
