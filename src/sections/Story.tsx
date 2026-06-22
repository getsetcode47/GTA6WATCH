import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { Orbs } from '../components/Atmosphere'
import { Reveal, SectionHeading } from '../components/Section'
import { DELAY_HISTORY, STORY_STATS, TRAILER_1_ID, TRAILER_2_ID } from '../data/facts'

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView || reduced) return
    const duration = 1800
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(value * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, reduced])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

const MOSAIC = [
  {
    src: `https://i.ytimg.com/vi/${TRAILER_2_ID}/maxresdefault.jpg`,
    alt: 'Jason and Lucia — official GTA VI Trailer 2 frame',
    span: 'col-span-2 row-span-2',
  },
  {
    src: `https://i.ytimg.com/vi/${TRAILER_1_ID}/hq1.jpg`,
    alt: 'Leonida coastline at sunset — GTA VI Trailer 1 frame',
    span: '',
  },
  {
    src: `https://i.ytimg.com/vi/${TRAILER_2_ID}/hq2.jpg`,
    alt: 'High-speed pursuit through the Keys — GTA VI Trailer 2 frame',
    span: '',
  },
  {
    src: `https://i.ytimg.com/vi/${TRAILER_1_ID}/hq3.jpg`,
    alt: 'Vice City nightlife — GTA VI Trailer 1 frame',
    span: 'col-span-2',
  },
]

export default function Story() {
  return (
    <section id="story" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs variant="pink-violet" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Story"
          title={
            <>
              THE SUNNIEST PLACE <span className="gradient-text">IN AMERICA</span>
            </>
          }
          align="left"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-white/70">
                Grand Theft Auto VI heads to the state of <strong className="text-neon-cyan">Leonida</strong> — home to
                the neon-soaked streets of <strong className="text-neon-pink">Vice City</strong> and beyond — in the
                biggest, most immersive evolution of the series yet.
              </p>
              <p className="mt-5 leading-relaxed text-white/55">
                Lucia Caminos walks out of the Leonida Penitentiary with one plan: the good life her mother dreamed
                about since their days in Liberty City. Jason Duval wants an easy life, but things keep getting harder
                — running work for drug runners in the Keys was supposed to be temporary. Then an easy score goes
                wrong, and a Bonnie-and-Clyde story ignites across an entire state: swamp towns, beach strips,
                back-room recording studios, and a criminal conspiracy stretching across Leonida.
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <blockquote className="glass-pink relative mt-9 p-7">
                <span aria-hidden className="absolute -top-5 left-5 font-display text-7xl text-neon-pink/40">
                  “
                </span>
                <p className="font-display text-2xl leading-tight tracking-wide text-white/90 sm:text-3xl">
                  The only way we’re gonna get through this is by sticking together. Being a team.
                </p>
                <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neon-pink/80">
                  — Lucia Caminos, Trailer 1
                </footer>
              </blockquote>
            </Reveal>

            {/* delay timeline */}
            <Reveal delay={0.2} className="mt-10">
              <p className="eyebrow">The long road</p>
              <ol className="mt-4 space-y-4 border-l border-white/10 pl-5">
                {DELAY_HISTORY.map((d) => (
                  <li key={d.label} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-neon-cyan"
                      style={{ boxShadow: '0 0 8px #00f0ff' }}
                    />
                    <p className="font-tech text-sm font-bold uppercase tracking-[0.15em] text-white/85">
                      {d.label} <span className="ml-2 font-mono text-[10px] font-normal text-white/35">{d.date}</span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">{d.note}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* mosaic + stats */}
          <div>
            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3" style={{ gridAutoRows: 'minmax(90px, auto)' }}>
                {MOSAIC.map((m) => (
                  <figure key={m.src} className={`group relative overflow-hidden rounded-xl border border-white/10 ${m.span}`}>
                    <img
                      src={m.src}
                      alt={m.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
                  </figure>
                ))}
              </div>
            </Reveal>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {STORY_STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.15 + i * 0.07}>
                  <div className="glass h-full p-5">
                    <p className="glow-cyan font-tech text-[clamp(1.6rem,4vw,2.2rem)] font-bold">
                      <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/45">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
