'use client'

import Link from 'next/link'
import { FormEvent, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Bot, Loader2, Send, Sparkles, X } from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const starters = [
  'Sono con due amiche, cosa facciamo?',
  'Budget basso, ma voglio uscire.',
  'Voglio qualcosa tranquillo.',
  'Dove si balla stasera?'
]

function eventLinksFrom(text: string) {
  return Array.from(new Set(text.match(/\/events\/[a-z0-9-]+/g) ?? []))
}

export default function AiConcierge() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Dimmi con chi sei, dove sei e che mood avete. Ti tiro fuori un piano.'
    }
  ])
  const reduce = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)
  const canSend = input.trim().length > 2 && !loading

  const visibleMessages = useMemo(() => messages.slice(-8), [messages])

  async function ask(question: string) {
    const clean = question.trim()
    if (!clean || loading) return

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: clean }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/ai-concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages })
      })
      const data = await response.json() as { answer?: string }
      setMessages((current) => [...current, { role: 'assistant', content: data.answer || 'Non ho trovato il piano giusto. Riprova con città e mood.' }])
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: 'Connessione ballerina. Riprova tra un attimo.' }])
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (canSend) void ask(input)
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          setOpen(true)
          setTimeout(() => inputRef.current?.focus(), 150)
        }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-[92px] right-4 z-40 flex min-h-12 items-center gap-2 rounded-chip bg-lime px-4 py-3 text-sm font-black text-black shadow-lime md:bottom-6 md:right-6"
        aria-label="Apri concierge AI"
      >
        <Sparkles size={18} />
        <span className="hidden sm:inline">Chiedi a wevent</span>
      </motion.button>

      <AnimatePresence mode="wait">
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Chiudi concierge AI"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="ai-concierge-title"
              initial={{ opacity: 0, y: reduce ? 0 : 28, scale: reduce ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 bottom-3 z-[80] overflow-hidden rounded-[26px] border border-white/10 bg-bg shadow-2xl md:inset-x-auto md:bottom-6 md:right-6 md:w-[430px]"
            >
              <header className="border-b border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-lime">AI concierge</p>
                    <h2 id="ai-concierge-title" className="mt-1 font-display text-2xl font-black leading-none">Che piano vuoi?</h2>
                  </div>
                  <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface2 text-muted hover:text-cream" aria-label="Chiudi">
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                  {starters.map((starter) => (
                    <button
                      key={starter}
                      type="button"
                      onClick={() => void ask(starter)}
                      className="shrink-0 rounded-chip border border-white/10 bg-surface px-3 py-2 text-left text-xs font-bold text-cream hover:border-lime"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </header>

              <div className="max-h-[48dvh] space-y-3 overflow-y-auto p-4 md:max-h-[420px]">
                {visibleMessages.map((message, index) => {
                  const mine = message.role === 'user'
                  const links = message.role === 'assistant' ? eventLinksFrom(message.content) : []
                  return (
                    <div key={`${message.role}-${index}`} className={mine ? 'ml-auto max-w-[86%]' : 'mr-auto max-w-[92%]'}>
                      <div className={mine ? 'rounded-[20px] bg-lime px-4 py-3 text-sm font-bold leading-6 text-black' : 'rounded-[20px] border border-white/10 bg-white/[0.045] px-4 py-3 text-sm font-medium leading-6 text-cream'}>
                        {!mine && <Bot className="mb-2 text-lime" size={17} />}
                        <p className="whitespace-pre-line">{message.content}</p>
                      </div>
                      {links.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {links.map((href) => (
                            <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-chip bg-surface2 px-3 py-2 text-xs font-black text-lime ring-1 ring-white/10">
                              Vedi evento
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
                {loading && (
                  <div className="flex items-center gap-2 text-sm font-bold text-muted">
                    <Loader2 className="animate-spin text-lime" size={17} />
                    Sto scegliendo...
                  </div>
                )}
              </div>

              <form onSubmit={onSubmit} className="border-t border-white/10 bg-bg/95 p-3">
                <div className="flex items-center gap-2 rounded-[20px] border border-white/10 bg-white/[0.045] p-2 focus-within:border-lime focus-within:ring-4 focus-within:ring-lime/10">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Sono con due amiche..."
                    className="min-h-11 flex-1 bg-transparent px-2 text-base font-bold outline-none placeholder:text-muted"
                  />
                  <button disabled={!canSend} type="submit" className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-black disabled:opacity-40" aria-label="Invia domanda">
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
