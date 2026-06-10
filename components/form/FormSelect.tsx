'use client'

import type { SelectHTMLAttributes } from 'react'

export default function FormSelect({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.12em] text-muted transition group-focus-within:text-lime">{label}</span>
      <select
        {...props}
        className="min-h-[54px] w-full rounded-[18px] border border-white/10 bg-white/[0.045] px-4 py-3 text-base font-bold text-cream outline-none transition hover:border-white/20 focus:border-lime focus:bg-lime/[0.03] focus:ring-4 focus:ring-lime/10"
      >
        {children}
      </select>
    </label>
  )
}
