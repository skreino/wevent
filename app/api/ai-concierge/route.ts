import { NextResponse } from 'next/server'
import { events, type Event } from '@/data/events'
import { categoryLabels } from '@/lib/categories'
import { formatDate, formatPrice } from '@/lib/utils'

export const runtime = 'nodejs'

interface ConciergeMessage {
  role: 'user' | 'assistant'
  content: string
}

function compactEvent(event: Event) {
  return {
    slug: event.slug,
    title: event.title,
    city: event.city,
    venue: event.venue,
    category: categoryLabels[event.category],
    when: formatDate(event.date, event.timeStart),
    price: formatPrice(event),
    hot: event.hot,
    featured: event.featured,
    description: event.description
  }
}

function pickLocalEvents(query: string) {
  const text = query.toLowerCase()
  const wantsFree = /gratis|free|pochi soldi|budget|econom/i.test(text)
  const wantsChill = /tranquill|parlare|soft|easy|amiche|coppia|aperitivo/i.test(text)
  const wantsNight = /ballare|dj|serata|notte|casino|forte|club/i.test(text)
  const wantsFood = /mangiare|food|cena|fame|drink/i.test(text)

  return events
    .filter((event) => {
      if (wantsFree && event.priceType !== 'free') return false
      if (wantsChill && !['aperitivo', 'esperienze', 'food', 'comedy'].includes(event.category)) return false
      if (wantsNight && !['dj-set', 'serata', 'live'].includes(event.category)) return false
      if (wantsFood && !['food', 'aperitivo'].includes(event.category)) return false
      return true
    })
    .sort((a, b) => Number(b.featured) - Number(a.featured) || Number(b.hot) - Number(a.hot) || a.date.localeCompare(b.date))
    .slice(0, 3)
}

function demoReply(question: string) {
  const picks = pickLocalEvents(question)
  const lines = picks.map((event, index) => `${index + 1}. ${event.title} - ${event.venue}, ${event.city}. ${formatDate(event.date, event.timeStart)}. ${formatPrice(event)}. /events/${event.slug}`)

  return [
    'Ti direi cosi:',
    '',
    ...lines,
    '',
    'Se mi dici citta, budget e se volete parlare o muovervi, stringo meglio la scelta.'
  ].join('\n')
}

function extractText(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return ''
  const maybe = payload as { output_text?: string; output?: Array<{ content?: Array<{ text?: string }> }> }
  if (maybe.output_text) return maybe.output_text
  return maybe.output?.flatMap((item) => item.content ?? []).map((item) => item.text).filter(Boolean).join('\n') ?? ''
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { messages?: ConciergeMessage[] }
    const messages = (body.messages ?? []).filter((message) => message.role === 'user' || message.role === 'assistant').slice(-8)
    const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user')?.content?.trim()

    if (!latestUserMessage) {
      return NextResponse.json({ answer: 'Dimmi con chi sei, dove siete e che mood avete.' })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ answer: demoReply(latestUserMessage), suggestions: pickLocalEvents(latestUserMessage).map(compactEvent), demo: true })
    }

    const eventCatalog = events.map(compactEvent)
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.5-mini',
        input: [
          {
            role: 'system',
            content: [
              'Sei il concierge AI di wevent, una app per decidere cosa fare stasera.',
              'Rispondi in italiano, tono breve, sicuro, zero corporate.',
              'Suggerisci solo eventi presenti nel catalogo.',
              'Quando consigli un evento includi sempre titolo, zona/citta, mood e link /events/slug.',
              'Se mancano dati importanti, fai massimo una domanda e proponi comunque una prima scelta.',
              'Non inventare prezzi, indirizzi o disponibilita.'
            ].join(' ')
          },
          {
            role: 'system',
            content: `Catalogo eventi JSON: ${JSON.stringify(eventCatalog)}`
          },
          ...messages.map((message) => ({ role: message.role, content: message.content }))
        ],
        max_output_tokens: 420
      })
    })

    if (!response.ok) {
      return NextResponse.json({ answer: demoReply(latestUserMessage), suggestions: pickLocalEvents(latestUserMessage).map(compactEvent), demo: true })
    }

    const payload = await response.json()
    const answer = extractText(payload).trim() || demoReply(latestUserMessage)
    return NextResponse.json({ answer, suggestions: pickLocalEvents(latestUserMessage).map(compactEvent) })
  } catch {
    return NextResponse.json({ answer: 'Mi si e incastrata la serata. Riprova tra un attimo.' }, { status: 500 })
  }
}
