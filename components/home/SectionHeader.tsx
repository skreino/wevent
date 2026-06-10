import Link from 'next/link'

export default function SectionHeader({ title, count, href }: { title: string; count?: string; href?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-3xl font-black leading-none md:text-4xl">{title}</h2>
        {count && <span className="rounded-chip border border-border px-2.5 py-1 text-[11px] font-bold text-muted">{count}</span>}
      </div>
      {href && <Link href={href} className="text-sm font-black text-lime">Vedi tutti</Link>}
    </div>
  )
}
