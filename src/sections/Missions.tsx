import { CheckCircle2, Crosshair, Lock } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Orbs } from '../components/Atmosphere'
import { LiveDot, Reveal, SectionHeading } from '../components/Section'
import { MISSIONS } from '../data/missions'
import { LAUNCH_DATE } from '../data/facts'

const TRAILER_1_DATE = new Date('2023-12-05T00:00:00Z')

/** % of the Trailer-1 → launch wait already served (the M-04 progress bar). */
function waitProgress(): number {
  const total = LAUNCH_DATE.getTime() - TRAILER_1_DATE.getTime()
  const elapsed = Date.now() - TRAILER_1_DATE.getTime()
  return Math.min(100, Math.max(0, (elapsed / total) * 100))
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  const reduced = useReducedMotion()
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)`, boxShadow: `0 0 10px ${color}88` }}
        initial={reduced ? { width: `${value}%` } : { width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
    </div>
  )
}

export default function Missions() {
  const overall = waitProgress()

  return (
    <section id="missions" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs variant="violet-amber" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Pre-Launch Operations"
          title={
            <>
              MISSION <span className="gradient-text">TRACKER</span>
            </>
          }
          intro="Community completion log for the wait itself. Strictly pre-launch flavor — actual world records begin November 19."
        />

        {/* overall progress */}
        <Reveal className="mt-12">
          <div className="glass-cyan p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Campaign: The Long Wait</p>
                <p className="mt-2 font-display text-3xl tracking-wide text-white sm:text-4xl">
                  TRAILER 1 → LAUNCH DAY
                </p>
              </div>
              <p className="glow-cyan font-tech text-4xl font-bold tabular-nums sm:text-5xl">{overall.toFixed(1)}%</p>
            </div>
            <div className="mt-5">
              <ProgressBar value={overall} color="#00f0ff" />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Dec 4, 2023 → Nov 19, 2026 · computed live, no skips
            </p>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {MISSIONS.map((m, i) => {
            const progress = m.progress < 0 ? overall : m.progress
            const locked = m.status === 'locked'
            const complete = m.status === 'complete'
            const color = complete ? '#00f0ff' : locked ? '#6b7280' : '#ff2d7b'
            return (
              <Reveal key={m.id} delay={(i % 2) * 0.08}>
                <article
                  className={`glass relative h-full p-6 transition-colors ${locked ? 'opacity-60' : 'hover:border-white/25'}`}
                  aria-label={`Mission ${m.code}: ${m.title}, ${m.status}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{m.code}</span>
                      <h3 className={`font-tech text-sm font-bold uppercase tracking-[0.12em] ${locked ? 'text-white/50' : 'text-white/90'}`}>
                        {m.title}
                      </h3>
                    </div>
                    {complete && <CheckCircle2 size={18} className="shrink-0 text-neon-cyan" aria-hidden />}
                    {m.status === 'active' && (
                      <span className="flex shrink-0 items-center gap-1.5">
                        <LiveDot />
                        <Crosshair size={15} className="text-neon-pink" aria-hidden />
                      </span>
                    )}
                    {locked && <Lock size={16} className="shrink-0 text-white/40" aria-hidden />}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">{m.description}</p>
                  <div className="mt-5">
                    <ProgressBar value={progress} color={color} />
                  </div>
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                    <span className="text-white/35">Reward: {m.reward}</span>
                    <span style={{ color }} className="font-bold tabular-nums">
                      {m.progress < 0 ? `${progress.toFixed(1)}%` : `${progress}%`}
                    </span>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
