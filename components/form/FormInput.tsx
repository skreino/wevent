'use client'

import type { InputHTMLAttributes } from 'react'

export default function FormInput({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.12em] text-muted transition group-focus-within:text-lime">{label}</span>
      <input
        {...props}
        className="min-h-[54px] w-full rounded-[18px] border border-white/10 bg-white/[0.045] px-4 py-3 text-base font-bold text-cream outline-none transition placeholder:text-muted/60 hover:border-white/20 focus:border-lime focus:bg-lime/[0.03] focus:ring-4 focus:ring-lime/10"
      />
    </label>
  )
}
