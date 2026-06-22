import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Orbs } from '../components/Atmosphere'
import { Reveal, SectionHeading } from '../components/Section'
import { CHARACTERS } from '../data/characters'

export default function Characters() {
  const [activeId, setActiveId] = useState(CHARACTERS[0].id)
  const reduced = useReducedMotion()
  const active = CHARACTERS.find((c) => c.id === activeId) ?? CHARACTERS[0]

  return (
    <section id="cast" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Cast"
          title={
            <>
              PEOPLE OF <span className="gradient-text">LEONIDA</span>
            </>
          }
          intro="Every character Rockstar has announced so far — bios straight from the official reveals. Stylized portraits until official art ships with the marketing push."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* selectable roster */}
          <Reveal>
            <ul
              role="tablist"
              aria-label="Cast roster"
              aria-orientation="vertical"
              className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1"
            >
              {CHARACTERS.map((c) => {
                const selected = c.id === activeId
                return (
                  <li key={c.id}>
                    <button
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveId(c.id)}
                      className={`btn-clip flex min-h-[56px] w-full items-center gap-3 px-3.5 py-2.5 text-left transition-all duration-300 ${
                        selected ? 'bg-white/10' : 'bg-white/[0.03] hover:bg-white/[0.07]'
                      }`}
                      style={selected ? { boxShadow: `inset 3px 0 0 ${c.hueFrom}` } : undefined}
                    >
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-display text-sm tracking-wider text-white/90"
                        style={{ background: `linear-gradient(135deg, ${c.hueFrom}55, ${c.hueTo}55)` }}
                      >
                        {c.monogram}
                      </span>
                      <span className="min-w-0">
                        <span className={`block truncate font-tech text-[11px] font-bold uppercase tracking-[0.12em] ${selected ? 'text-white' : 'text-white/65'}`}>
                          {c.name}
                        </span>
                        <span className="block truncate font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
                          {c.role}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* profile card */}
          <Reveal delay={0.1}>
            <div className="relative min-h-[460px]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -26 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
                  className="glass scanlines absolute inset-0 grid overflow-hidden !rounded-2xl sm:grid-cols-[240px_1fr]"
                  aria-label={`${active.name} profile`}
                >
                  {/* stylized portrait */}
                  <div
                    aria-hidden
                    className="relative hidden items-center justify-center overflow-hidden sm:flex"
                    style={{ background: `linear-gradient(160deg, ${active.hueFrom}2e, #07070f 55%, ${active.hueTo}2e)` }}
                  >
                    <span
                      className="font-display text-[7rem] leading-none"
                      style={{
                        color: 'transparent',
                        backgroundImage: `linear-gradient(135deg, ${active.hueFrom}, ${active.hueTo})`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        filter: `drop-shadow(0 0 24px ${active.hueFrom}66)`,
                      }}
                    >
                      {active.monogram}
                    </span>
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/2"
                      style={{ background: 'linear-gradient(to top, #07070f, transparent)' }}
                    />
                  </div>

                  <div className="flex flex-col p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="rounded px-2.5 py-1 font-tech text-[9px] font-bold uppercase tracking-[0.2em]"
                        style={{ background: `${active.hueFrom}26`, color: active.hueFrom }}
                      >
                        {active.role}
                      </span>
                      <span className="rounded bg-white/8 px-2.5 py-1 font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                        {active.faction}
                      </span>
                    </div>

                    <h3
                      className="mt-4 font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-[0.95] tracking-wide"
                      style={{
                        color: 'transparent',
                        backgroundImage: `linear-gradient(100deg, #fff, ${active.hueFrom})`,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                      }}
                    >
                      {active.name}
                    </h3>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60 sm:text-[15px]">{active.bio}</p>

                    <div className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5">
                      <Quote size={16} style={{ color: active.hueFrom }} className="mt-0.5 shrink-0" aria-hidden />
                      <p className="font-body text-base font-semibold italic leading-snug text-white/80">
                        {active.quote}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
