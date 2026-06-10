'use client'

import type { TextareaHTMLAttributes } from 'react'

export default function FormTextarea({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.1em] text-muted">{label}</span>
      <textarea {...props} maxLength={500} className="min-h-36 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none transition focus:border-lime focus:ring-2 focus:ring-lime/20" />
    </label>
  )
}
