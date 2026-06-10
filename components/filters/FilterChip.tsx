'use client'

import { cn } from '@/lib/utils'

export default function FilterChip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn('min-h-11 rounded-chip border border-border bg-surface px-4 py-2 text-sm font-black transition', active && 'border-lime bg-lime text-black')}>
      {children}
    </button>
  )
}
