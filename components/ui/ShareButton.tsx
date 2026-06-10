'use client'

import { Share2 } from 'lucide-react'

export default function ShareButton({ title }: { title: string }) {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 rounded-chip border border-border bg-surface2 px-4 py-3 text-sm font-bold"
      onClick={async () => {
        const url = window.location.href
        if (navigator.share) await navigator.share({ title, url })
        else await navigator.clipboard.writeText(url)
      }}
    >
      <Share2 size={18} /> Condividi
    </button>
  )
}
