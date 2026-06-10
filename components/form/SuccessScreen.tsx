import Link from 'next/link'
import { Check } from 'lucide-react'

export default function SuccessScreen() {
  return (
    <div className="rounded-card border border-lime/30 bg-surface p-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-black"><Check size={34} /></div>
      <h1 className="mt-5 font-display text-5xl font-black leading-none">Ricevuto.</h1>
      <p className="mt-3 text-muted">Ti contatteremo presto.</p>
      <Link href="/" className="mt-7 inline-flex rounded-chip bg-lime px-5 py-3 font-black text-black">Torna alla home</Link>
    </div>
  )
}
