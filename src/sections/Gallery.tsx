import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { Orbs } from '../components/Atmosphere'
import { Reveal, SectionHeading } from '../components/Section'
import { GALLERY } from '../data/gallery'

function Lightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (dir: 1 | -1) => void }) {
  const item = GALLERY[index]
  const reduced = useReducedMotion()

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
      aria-label={`Image viewer: ${item.caption}`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-void/95 p-4 backdrop-blur-md sm:p-10"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close image viewer"
        className="glass absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center !rounded-full text-white/80 hover:text-neon-pink"
      >
        <X size={20} aria-hidden />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNav(-1)
        }}
        aria-label="Previous image"
        className="glass absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center !rounded-full text-white/80 hover:text-neon-cyan sm:left-6"
      >
        <ChevronLeft size={22} aria-hidden />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNav(1)
        }}
        aria-label="Next image"
        className="glass absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center !rounded-full text-white/80 hover:text-neon-cyan sm:right-6"
      >
        <ChevronRight size={22} aria-hidden />
      </button>

      <motion.figure
        key={item.id}
        initial={reduced ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-h-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[78vh] w-auto rounded-xl border border-white/15"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = item.fallback
          }}
        />
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="font-display text-xl tracking-wide text-white/90">{item.caption}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon-cyan/70">
            {item.trailer} · {index + 1} / {GALLERY.length}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  const nav = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)),
    [],
  )

  return (
    <section id="gallery" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Gallery"
          title={
            <>
              FRAMES FROM <span className="gradient-text">LEONIDA</span>
            </>
          }
          intro="Official stills, pulled frame-by-frame from Rockstar’s two trailers. Click any frame to go full screen — arrow keys to roam."
        />

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.06}>
              <button
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-xl border border-white/10 text-left transition-all duration-300 hover:border-neon-cyan/40"
                aria-label={`Open image: ${g.caption}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${g.tall ? 'aspect-[4/4.6]' : 'aspect-video'}`}
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = g.fallback
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-void/90 via-void/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="font-display text-lg tracking-wide text-white">{g.caption}</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neon-cyan/80">{g.trailer}</p>
                    </div>
                    <Expand size={16} className="mb-1 shrink-0 text-white/70" />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[10px] tracking-wide text-white/30">
          Stills © Rockstar Games, served from the official YouTube uploads. Shown here as fan commentary.
        </p>
      </div>

      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={() => setOpen(null)} onNav={nav} />}</AnimatePresence>
    </section>
  )
}
