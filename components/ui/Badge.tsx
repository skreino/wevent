import { cn } from '@/lib/utils'

export default function Badge({ children, tone = 'lime', className = '' }: { children: React.ReactNode; tone?: 'lime' | 'coral' | 'dark'; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-chip px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em]',
      tone === 'lime' && 'bg-lime text-black',
      tone === 'coral' && 'bg-coral text-black',
      tone === 'dark' && 'bg-surface2 text-cream ring-1 ring-border',
      className
    )}>
      {children}
    </span>
  )
}
