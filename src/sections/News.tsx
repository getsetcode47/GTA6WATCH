import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Inbox } from 'lucide-react'
import { Orbs } from '../components/Atmosphere'
import { Reveal, SectionHeading } from '../components/Section'
import { NEWS_CATEGORIES } from '../data/news'
import { fetchNews } from '../lib/api'
import type { NewsCategory, NewsItem } from '../types'

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  official: 'bg-neon-cyan/15 text-neon-cyan',
  business: 'bg-neon-amber/15 text-neon-amber',
  rumor: 'bg-neon-violet/20 text-[#d98aff]',
  industry: 'bg-white/10 text-white/70',
  community: 'bg-neon-pink/15 text-neon-pink',
}

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

function CategoryTag({ category }: { category: NewsCategory }) {
  return (
    <span className={`rounded px-2 py-0.5 font-tech text-[9px] font-bold uppercase tracking-[0.2em] ${CATEGORY_STYLES[category]}`}>
      {category}
    </span>
  )
}

export default function News() {
  const reduced = useReducedMotion()
  const [items, setItems] = useState<NewsItem[] | null>(null)
  const [filter, setFilter] = useState<'all' | NewsCategory>('all')

  useEffect(() => {
    let alive = true
    fetchNews().then((n) => alive && setItems(n))
    return () => {
      alive = false
    }
  }, [])

  const filtered = useMemo(
    () => (items ?? []).filter((n) => filter === 'all' || n.category === filter),
    [items, filter],
  )
  const featured = filter === 'all' ? items?.find((n) => n.featured) : undefined
  const rest = filtered.filter((n) => n.id !== featured?.id)

  return (
    <section id="intel" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs variant="violet-amber" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Latest Intel"
          title={
            <>
              THE <span className="gradient-text">WIRE</span>
            </>
          }
          intro="Every verified beat on the road to November 19 — sourced, dated, and linked to the original report. No leaks presented as fact."
        />

        {/* category pills */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {NEWS_CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              aria-pressed={filter === c.key}
              className={`min-h-[40px] rounded-full px-5 py-2 font-tech text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${
                filter === c.key
                  ? 'bg-gradient-to-r from-neon-cyan/25 to-neon-pink/25 text-white shadow-[0_0_20px_-6px_rgba(0,240,255,0.6)]'
                  : 'bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              {c.label}
            </button>
          ))}
        </Reveal>

        {/* loading skeleton */}
        {!items && (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="Loading news">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass h-48 animate-pulse" />
            ))}
          </div>
        )}

        {/* featured lead */}
        {featured && (
          <Reveal delay={0.08} className="mt-10">
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-amber group relative block overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-9"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-60"
                style={{ background: 'radial-gradient(ellipse 60% 100% at 85% 0%, rgba(255,184,0,0.12), transparent)' }}
              />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded bg-neon-amber/20 px-2 py-0.5 font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-neon-amber">
                    Lead Story
                  </span>
                  <CategoryTag category={featured.category} />
                  <time className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">{fmt(featured.date)}</time>
                </div>
                <h3 className="mt-4 max-w-3xl font-display text-[clamp(1.7rem,4vw,2.8rem)] leading-[1.02] tracking-wide text-white">
                  {featured.headline}
                </h3>
                <p className="mt-3 max-w-3xl leading-relaxed text-white/60">{featured.summary}</p>
                <p className="mt-5 inline-flex items-center gap-1.5 font-tech text-[11px] font-bold uppercase tracking-[0.2em] text-neon-amber">
                  {featured.source}
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </p>
              </div>
            </a>
          </Reveal>
        )}

        {/* card grid */}
        {items && (
          <motion.div layout={!reduced} className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {rest.map((n) => (
                <motion.a
                  key={n.id}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <CategoryTag category={n.category} />
                    <time className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">{fmt(n.date)}</time>
                  </div>
                  <h3 className="mt-4 font-body text-lg font-bold leading-snug text-white/90 group-hover:text-white">
                    {n.headline}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{n.summary}</p>
                  <p className="mt-5 inline-flex items-center gap-1.5 font-tech text-[10px] font-bold uppercase tracking-[0.2em] text-neon-cyan/80">
                    {n.source}
                    <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </p>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* empty state */}
        {items && filtered.length === 0 && (
          <div className="glass mx-auto mt-10 max-w-md p-10 text-center">
            <Inbox size={28} className="mx-auto text-white/30" aria-hidden />
            <p className="mt-4 font-tech text-sm font-bold uppercase tracking-[0.2em] text-white/60">Radio silence</p>
            <p className="mt-2 text-sm text-white/40">Nothing on the wire in this channel yet. Check back after the next drop.</p>
          </div>
        )}

        <p className="mt-10 text-center font-mono text-[10px] leading-relaxed tracking-wide text-white/30">
          All headlines summarize external reporting and link to the original source. Rumors are labeled as rumors.
        </p>
      </div>
    </section>
  )
}
