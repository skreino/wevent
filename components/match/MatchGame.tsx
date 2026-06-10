'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Heart, MessageCircle, RotateCcw, Sparkles, ThumbsDown, Users } from 'lucide-react'
import { events, type Event } from '@/data/events'
import Badge from '@/components/ui/Badge'
import { categoryLabels } from '@/lib/categories'
import { cn, formatDate, formatPrice } from '@/lib/utils'

type Stage = 'intro' | 'you' | 'them' | 'match'

interface ChatMessage {
  from: 'you' | 'them'
  text: string
}

const starterEvents = events.filter((event) => event.featured || event.hot || ['aperitivo', 'dj-set', 'live', 'serata', 'comedy'].includes(event.category)).slice(0, 10)

const demoReplies = [
  'Ci sta. Io direi di bloccarlo prima che cambiamo idea.',
  'Questo mi sembra il compromesso giusto.',
  'Ok, ma dopo prendiamo anche qualcosa da bere.',
  'Se è vicino per me super sì.'
]

function getStoredChat(slug: string): ChatMessage[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem(`wevent_match_chat_${slug}`) || '[]') as ChatMessage[]
}

function saveStoredChat(slug: string, messages: ChatMessage[]) {
  localStorage.setItem(`wevent_match_chat_${slug}`, JSON.stringify(messages))
}

export default function MatchGame() {
  const [stage, setStage] = useState<Stage>('intro')
  const [index, setIndex] = useState(0)
  const [yourLikes, setYourLikes] = useState<string[]>([])
  const [matchedEvent, setMatchedEvent] = useState<Event | null>(null)
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const reduce = useReducedMotion()

  const current = starterEvents[index]
  const progress = Math.round((index / starterEvents.length) * 100)
  const likedEvents = useMemo(() => starterEvents.filter((event) => yourLikes.includes(event.slug)), [yourLikes])

  function reset() {
    setStage('intro')
    setIndex(0)
    setYourLikes([])
    setMatchedEvent(null)
    setChat([])
    setDraft('')
  }

  function choose(like: boolean) {
    const nextLikes = like && current ? [...yourLikes, current.slug] : yourLikes
    setYourLikes(nextLikes)
    const next = index + 1

    if (next >= starterEvents.length) {
      setStage('them')
      setIndex(0)
      setTimeout(() => resolveTheirTurn(nextLikes), 650)
      return
    }

    setIndex(next)
  }

  function resolveTheirTurn(likes = yourLikes) {
    const candidateLikes = starterEvents.filter((event, eventIndex) => event.featured || event.hot || eventIndex % 3 === 0).map((event) => event.slug)
    const overlap = likes.filter((slug) => candidateLikes.includes(slug))
    const fallback = likes[0] || candidateLikes[0]
    const matchedSlug = overlap[0] || fallback
    const match = starterEvents.find((event) => event.slug === matchedSlug) ?? starterEvents[0]
    const stored = getStoredChat(match.slug)
    const initial = stored.length ? stored : [
      { from: 'them', text: `Match su ${match.title}. Ti va di sentirci e capire se andare?` }
    ] as ChatMessage[]

    setMatchedEvent(match)
    setChat(initial)
    saveStoredChat(match.slug, initial)
    setStage('match')
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft.trim() || !matchedEvent) return
    const next: ChatMessage[] = [...chat, { from: 'you', text: draft.trim() }]
    const reply = demoReplies[next.length % demoReplies.length]
    const withReply: ChatMessage[] = [...next, { from: 'them', text: reply }]
    setChat(withReply)
    saveStoredChat(matchedEvent.slug, withReply)
    setDraft('')
  }

  if (stage === 'intro') {
    return (
      <section className="grid min-h-[70dvh] gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-lime">Event Match</p>
          <h1 className="mt-3 max-w-lg font-display text-6xl font-black leading-[0.82] md:text-8xl">Trovate il piano.</h1>
          <p className="mt-5 max-w-md text-sm font-medium leading-6 text-muted">
            Swipe sugli eventi. Se piace a entrambi, si apre la chat per accordarsi.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setStage('you')} className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-chip bg-lime px-6 py-3 font-black text-black shadow-lime transition hover:bg-cream">
              <Sparkles size={18} /> Inizia roulette
            </button>
            <Link href="/explore" className="inline-flex min-h-[54px] items-center justify-center rounded-chip border border-white/10 bg-white/[0.04] px-6 py-3 font-black text-cream">
              Guarda eventi
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-[36px] bg-lime/10 blur-3xl" />
          <div className="relative rotate-[-3deg] overflow-hidden rounded-[28px] border border-white/10 bg-surface shadow-2xl">
            <div className="relative aspect-[4/5]">
              <Image src={starterEvents[0].coverUrl} alt={starterEvents[0].title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <Badge>{categoryLabels[starterEvents[0].category]}</Badge>
                <h2 className="mt-3 font-display text-4xl font-black leading-none">{starterEvents[0].title}</h2>
                <p className="mt-2 text-sm font-bold text-cream/75">{starterEvents[0].venue} · {starterEvents[0].city}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (stage === 'them') {
    return (
      <section className="grid min-h-[70dvh] place-items-center text-center">
        <div className="max-w-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime text-black shadow-lime">
            <Users size={36} />
          </div>
          <h1 className="mt-6 font-display text-5xl font-black leading-none">Tocca all&apos;altra persona.</h1>
          <p className="mt-4 text-sm font-medium leading-6 text-muted">Nel demo simuliamo le sue scelte. Nel social vero qui entrerà il secondo utente.</p>
          <div className="mx-auto mt-7 h-2 max-w-xs overflow-hidden rounded-full bg-surface2">
            <motion.div className="h-full bg-lime" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 0.65 }} />
          </div>
        </div>
      </section>
    )
  }

  if (stage === 'match' && matchedEvent) {
    return (
      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-lime">Match</p>
          <h1 className="mt-2 font-display text-5xl font-black leading-none">Ci state entrambi.</h1>
          <div className="mt-5 overflow-hidden rounded-[28px] border border-lime/25 bg-surface">
            <div className="relative aspect-[4/3]">
              <Image src={matchedEvent.coverUrl} alt={matchedEvent.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge>{categoryLabels[matchedEvent.category]}</Badge>
                <h2 className="mt-3 font-display text-4xl font-black leading-none">{matchedEvent.title}</h2>
                <p className="mt-2 text-sm font-bold text-cream/75">{matchedEvent.venue} · {matchedEvent.city}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 text-sm font-bold text-muted">
              <span className="flex items-center gap-2"><CalendarDays size={16} /> {formatDate(matchedEvent.date, matchedEvent.timeStart)}</span>
              <span className="text-right text-lime">{formatPrice(matchedEvent)}</span>
              <Link href={`/events/${matchedEvent.slug}`} className="col-span-2 rounded-chip bg-lime px-4 py-3 text-center font-black text-black">Vedi evento</Link>
            </div>
          </div>
          <button onClick={reset} className="mt-4 inline-flex items-center gap-2 rounded-chip border border-white/10 px-4 py-3 text-sm font-black text-muted">
            <RotateCcw size={16} /> Nuova roulette
          </button>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-bg">
          <div className="border-b border-white/10 bg-white/[0.035] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-lime">Chat post-match</p>
            <h2 className="mt-1 flex items-center gap-2 font-display text-3xl font-black leading-none">
              <MessageCircle size={24} /> Accettate l&apos;appuntamento
            </h2>
          </div>
          <div className="max-h-[430px] space-y-3 overflow-y-auto p-4">
            {chat.map((message, messageIndex) => (
              <div key={messageIndex} className={cn('max-w-[86%] rounded-[20px] px-4 py-3 text-sm font-bold leading-6', message.from === 'you' ? 'ml-auto bg-lime text-black' : 'bg-white/[0.055] text-cream ring-1 ring-white/10')}>
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-[20px] border border-white/10 bg-white/[0.045] p-2 focus-within:border-lime focus-within:ring-4 focus-within:ring-lime/10">
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Scrivi per accordarvi..." className="min-h-11 flex-1 bg-transparent px-2 text-base font-bold outline-none placeholder:text-muted" />
              <button type="submit" className="flex h-11 w-11 items-center justify-center rounded-full bg-lime text-black" aria-label="Invia messaggio">
                <MessageCircle size={18} />
              </button>
            </div>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-md">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-lime">Round 1</p>
          <h1 className="font-display text-4xl font-black leading-none">Swipe eventi</h1>
        </div>
        <span className="rounded-chip border border-white/10 px-3 py-2 text-xs font-black text-muted">{Math.min(index + 1, starterEvents.length)}/{starterEvents.length}</span>
      </div>
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-surface2">
        <div className="h-full bg-lime transition-all" style={{ width: `${progress}%` }} />
      </div>

      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, x: reduce ? 0 : 22, rotate: reduce ? 0 : 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -22, rotate: reduce ? 0 : -2 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden rounded-[30px] border border-white/10 bg-surface shadow-2xl"
          >
            <div className="relative aspect-[3/4]">
              <Image src={current.coverUrl} alt={current.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute left-4 top-4 flex gap-2">
                <Badge>{categoryLabels[current.category]}</Badge>
                {current.hot && <Badge tone="coral">HOT</Badge>}
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <h2 className="font-display text-5xl font-black leading-none">{current.title}</h2>
                <p className="mt-2 text-sm font-bold text-cream/80">{current.venue} · {current.city}</p>
                <p className="mt-1 text-sm font-bold text-muted">{formatDate(current.date, current.timeStart)} · {formatPrice(current)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button onClick={() => choose(false)} className="flex min-h-[58px] items-center justify-center gap-2 rounded-chip border border-white/10 bg-white/[0.04] font-black text-cream">
          <ThumbsDown size={20} /> Passo
        </button>
        <button onClick={() => choose(true)} className="flex min-h-[58px] items-center justify-center gap-2 rounded-chip bg-lime font-black text-black shadow-lime">
          <Heart size={20} fill="currentColor" /> Ci sto
        </button>
      </div>
      <p className="mt-4 text-center text-xs font-bold text-muted">{likedEvents.length} salvati per il match</p>
    </section>
  )
}
