'use client'

import type { InputHTMLAttributes } from 'react'

export default function FormInput({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.1em] text-muted">{label}</span>
      <input {...props} className="min-h-12 w-full rounded-xl border border-border bg-surface px-4 py-3 text-base outline-none transition focus:border-lime focus:ring-2 focus:ring-lime/20" />
    </label>
  )
}
