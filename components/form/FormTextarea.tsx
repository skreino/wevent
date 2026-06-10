'use client'

import type { TextareaHTMLAttributes } from 'react'

export default function FormTextarea({ label, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.12em] text-muted transition group-focus-within:text-lime">{label}</span>
      <textarea
        {...props}
        maxLength={500}
        className="min-h-36 w-full resize-y rounded-[18px] border border-white/10 bg-white/[0.045] px-4 py-3 text-base font-medium leading-6 text-cream outline-none transition placeholder:text-muted/60 hover:border-white/20 focus:border-lime focus:bg-lime/[0.03] focus:ring-4 focus:ring-lime/10"
      />
    </label>
  )
}
