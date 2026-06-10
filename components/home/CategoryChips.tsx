import Link from 'next/link'
import { categories } from '@/lib/categories'

export default function CategoryChips() {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
      {categories.map(({ id, label, icon: Icon }) => (
        <Link key={id} href={`/explore?category=${id}`} className="inline-flex shrink-0 items-center gap-2 rounded-chip border border-border bg-surface px-4 py-3 text-sm font-black transition hover:border-lime hover:text-lime">
          <Icon size={16} /> {label}
        </Link>
      ))}
    </div>
  )
}
