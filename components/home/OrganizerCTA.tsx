import Link from 'next/link'

export default function OrganizerCTA() {
  return (
    <section className="relative overflow-hidden rounded-card border border-lime/30 bg-surface p-6 md:p-8">
      <p className="text-xs font-black uppercase tracking-[0.1em] text-lime">Per locali e crew</p>
      <h2 className="mt-3 font-display text-4xl font-black leading-none">Hai un evento?</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">Aggiungilo gratis. Arriva a chi sta già cercando qualcosa da fare.</p>
      <Link href="/submit" className="mt-6 inline-flex rounded-chip bg-lime px-5 py-3 text-sm font-black text-black transition hover:bg-cream">Proponi evento</Link>
    </section>
  )
}
