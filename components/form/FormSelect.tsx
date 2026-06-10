'use client'

import type { SelectHTMLAttributes } from 'react'

export default function FormSelect({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.1em] text-muted">{label}</span>
      <select {...props} className="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none transition focus:border-lime focus:ring-2 focus:ring-lime/20">
        {children}
      </select>
    </label>
  )
}
