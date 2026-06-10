import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SubmitEventForm from '@/components/form/SubmitEventForm'

export const metadata: Metadata = {
  title: 'Proponi evento - wevent'
}

export default function SubmitPage() {
  return (
    <PageWrapper>
      <div className="mb-7 max-w-2xl">
        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-lime">Proponi evento</p>
        <h1 className="mt-2 font-display text-5xl font-black leading-none">Qualcosa succede sempre.</h1>
        <p className="mt-4 text-muted">Invio demo, nessun backend. Salviamo solo in locale.</p>
      </div>
      <SubmitEventForm />
    </PageWrapper>
  )
}
