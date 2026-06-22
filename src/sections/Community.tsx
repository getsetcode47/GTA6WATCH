import { useEffect, useRef, useState } from 'react'
import { ExternalLink, MessageSquare, SendHorizonal, Users } from 'lucide-react'
import { Orbs } from '../components/Atmosphere'
import { LiveDot, Reveal, SectionHeading } from '../components/Section'
import { fetchChatMessages, IS_DEMO_MODE } from '../lib/api'
import type { ChatMessage } from '../types'

const JOIN_CARDS = [
  {
    name: 'r/GTA6',
    desc: '1.4M+ members dissecting every frame since 2023.',
    url: 'https://www.reddit.com/r/GTA6/',
    tone: '#ff2d7b',
  },
  {
    name: 'Rockstar Newswire',
    desc: 'The only first-party source of truth. When it posts, everything else is commentary.',
    url: 'https://www.rockstargames.com/newswire',
    tone: '#ffb800',
  },
  {
    name: 'GTA VI Official Site',
    desc: 'Character pages, both trailers, and the Leonida map of places.',
    url: 'https://www.rockstargames.com/VI',
    tone: '#00f0ff',
  },
]

export default function Community() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let alive = true
    fetchChatMessages().then((m) => alive && setMessages(m))
    return () => {
      alive = false
    }
  }, [])

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    // demo mode: append locally — a Supabase realtime channel slots in here later
    setMessages((m) => [...m, { id: `local-${m.length}`, user: 'you', color: '#ffffff', text, minutesAgo: 0 }])
    setDraft('')
    requestAnimationFrame(() => logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' }))
  }

  return (
    <section id="community" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs variant="pink-violet" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Waiting Room"
          title={
            <>
              COMMUNITY <span className="gradient-text">FREQUENCY</span>
            </>
          }
          intro="Three years of collective patience, one chat. Demo feed for now — wired so a realtime backend can take over at launch."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* chat */}
          <Reveal className="min-w-0">
            <div className="glass flex h-[480px] flex-col overflow-hidden !rounded-2xl">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-white/10 px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={15} className="text-neon-cyan" aria-hidden />
                  <span className="font-tech text-xs font-bold uppercase tracking-[0.2em] text-white/85">#countdown-lounge</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                  <LiveDot color="#00f0ff" />
                  <Users size={12} aria-hidden /> 1,962 waiting
                  {IS_DEMO_MODE && <span className="rounded bg-neon-amber/15 px-1.5 py-0.5 text-neon-amber">demo</span>}
                </div>
              </div>

              <div ref={logRef} className="flex-1 space-y-3.5 overflow-y-auto px-5 py-4" aria-label="Chat messages" aria-live="polite">
                {messages.map((m) => (
                  <div key={m.id} className="flex items-baseline gap-2.5">
                    <span className="shrink-0 font-mono text-[10px] tabular-nums text-white/25">
                      {m.minutesAgo === 0 ? 'now' : `-${m.minutesAgo}m`}
                    </span>
                    <p className="min-w-0 text-sm leading-relaxed text-white/70">
                      <span className="mr-2 font-tech text-xs font-bold" style={{ color: m.color }}>
                        {m.user}
                      </span>
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>

              <form onSubmit={send} className="flex gap-2 border-t border-white/10 p-3">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Transmit to the lounge…"
                  aria-label="Chat message"
                  maxLength={240}
                  className="min-h-[44px] flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/30 focus:border-neon-cyan/50 focus:outline-none"
                />
                <button type="submit" aria-label="Send message" className="btn-neon-ghost !min-h-[44px] !px-4">
                  <SendHorizonal size={15} aria-hidden />
                </button>
              </form>
            </div>
          </Reveal>

          {/* join cards */}
          <div className="flex flex-col gap-4">
            {JOIN_CARDS.map((c, i) => (
              <Reveal key={c.name} delay={0.08 + i * 0.07}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group block p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderColor: `${c.tone}33` }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-tech text-sm font-bold uppercase tracking-[0.15em]" style={{ color: c.tone }}>
                      {c.name}
                    </p>
                    <ExternalLink size={14} className="text-white/30 transition-colors group-hover:text-white/70" aria-hidden />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{c.desc}</p>
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="px-2 font-mono text-[10px] leading-relaxed text-white/30">
                Fan-run spaces. None of these (including this one) are operated by Rockstar Games.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
