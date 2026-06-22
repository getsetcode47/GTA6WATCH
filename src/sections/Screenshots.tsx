import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { Orbs } from '../components/Atmosphere'
import { Reveal, SectionHeading } from '../components/Section'
import {
  SCREENSHOTS,
  SHOT_FILTERS,
  shotFull,
  shotThumb,
  type ShotCategory,
  type Screenshot,
} from '../data/screenshots'

const SOURCE_URL = 'https://www.rockstargames.com/VI/media/screenshots'

function Lightbox({
  shots,
  index,
  onClose,
  onNav,
}: {
  shots: Screenshot[]
  index: number
  onClose: () => void
  onNav: (dir: 1 | -1) => void
}) {
  const reduced = useReducedMotion()
  const shot = shots[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNav])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Screenshot viewer: ${shot.group}`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-void/95 p-4 backdrop-blur-md sm:p-10"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close viewer"
        className="glass absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center !rounded-full text-white/80 hover:text-neon-pink"
      >
        <X size={20} aria-hidden />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNav(-1)
        }}
        aria-label="Previous screenshot"
        className="glass absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center !rounded-full text-white/80 hover:text-neon-cyan sm:left-6"
      >
        <ChevronLeft size={22} aria-hidden />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNav(1)
        }}
        aria-label="Next screenshot"
        className="glass absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center !rounded-full text-white/80 hover:text-neon-cyan sm:right-6"
      >
        <ChevronRight size={22} aria-hidden />
      </button>

      <motion.figure
        key={shot.file}
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-h-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={shotFull(shot.file)}
          alt={shot.alt}
          className="max-h-[78vh] w-auto rounded-xl border border-white/15"
        />
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="font-display text-xl tracking-wide text-white/90">{shot.group}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan/70">
            {shot.category} · {index + 1} / {shots.length}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

export default function Screenshots() {
  const [filter, setFilter] = useState<'all' | ShotCategory>('all')
  const [open, setOpen] = useState<number | null>(null)

  const shots = useMemo(
    () => (filter === 'all' ? SCREENSHOTS : SCREENSHOTS.filter((s) => s.category === filter)),
    [filter],
  )

  const nav = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  )

  const select = (f: 'all' | ShotCategory) => {
    setFilter(f)
    setOpen(null)
  }

  return (
    <section id="screenshots" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs variant="pink-violet" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Official Screenshots"
          title={
            <>
              STRAIGHT FROM <span className="gradient-text">LEONIDA</span>
            </>
          }
          intro="Every official GTA VI screenshot Rockstar has released — characters and locations across Vice City and the state of Leonida. Tap any frame to go full screen; arrow keys to roam."
        />

        {/* filter pills */}
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {SHOT_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => select(f.key)}
              aria-pressed={filter === f.key}
              className={`min-h-[40px] rounded-full px-5 py-2 font-tech text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${
                filter === f.key
                  ? 'bg-gradient-to-r from-neon-cyan/25 to-neon-pink/25 text-white shadow-[0_0_20px_-6px_rgba(0,240,255,0.6)]'
                  : 'bg-white/5 text-white/45 hover:bg-white/10 hover:text-white/80'
              }`}
            >
              {f.label}
              <span className="ml-2 text-white/30">
                {f.key === 'all' ? SCREENSHOTS.length : SCREENSHOTS.filter((s) => s.category === f.key).length}
              </span>
            </button>
          ))}
        </Reveal>

        {/* grid */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {shots.map((s, i) => (
            <Reveal key={s.file} delay={(i % 8) * 0.03}>
              <button
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-xl border border-white/10 text-left transition-all duration-300 hover:border-neon-cyan/40"
                aria-label={`Open screenshot: ${s.alt}`}
              >
                <img
                  src={shotThumb(s.file)}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={360}
                  className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-void/90 via-void/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <div className="flex items-end justify-between gap-2">
                    <span className="font-tech text-xs font-bold uppercase tracking-[0.1em] text-white">{s.group}</span>
                    <Expand size={15} className="mb-0.5 shrink-0 text-white/70" />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] tracking-wide text-white/30">
          Screenshots © Rockstar Games, from the{' '}
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-neon-cyan/70 hover:underline">
            official GTA VI media library
          </a>
          . Shown here as fan commentary.
        </p>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox shots={shots} index={open} onClose={() => setOpen(null)} onNav={nav} />}
      </AnimatePresence>
    </section>
  )
}
