import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, ChevronDown, Volume2, VolumeX } from 'lucide-react'
import YouTubeHeroPlayer, { type YTPlayer } from './YouTubeHeroPlayer'
import CountdownTimer from './CountdownTimer'
import { LiveDot } from './Section'
import { LAUNCH_DATE_LABEL, PLATFORMS, TRAILER_2_ID } from '../data/facts'

const POSTER = `https://i.ytimg.com/vi/${TRAILER_2_ID}/maxresdefault.jpg`

export default function Hero() {
  const reduced = useReducedMotion()
  const [player, setPlayer] = useState<YTPlayer | null>(null)
  const [muted, setMuted] = useState(true)

  const handlePlayerChange = useCallback((p: YTPlayer | null) => {
    setPlayer(p)
    if (!p) setMuted(true)
  }, [])

  const toggleAudio = () => {
    if (!player) return
    if (muted) player.unMute()
    else player.mute()
    setMuted(!muted)
  }

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.21, 0.6, 0.35, 1] as const },
        }

  return (
    <section id="top" className="scanlines vignette relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* poster: paints first, stays as reduced-motion / slow-network fallback */}
      <img
        src={POSTER}
        alt="Official GTA VI key art — Jason and Lucia against the Vice City skyline"
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
      />
      <YouTubeHeroPlayer onPlayerChange={handlePlayerChange} />

      {/* legibility layers */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/35 to-void" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-void/60 via-transparent to-void/60" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 72%, rgba(3,3,8,0.82), transparent)' }}
      />

      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:px-6">
        <motion.a
          {...fade(0.1)}
          href="#preorder"
          className="glass-pink inline-flex items-center gap-2.5 !rounded-full px-4 py-2 transition-transform duration-300 hover:scale-[1.03]"
        >
          <LiveDot />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/80 sm:text-[11px]">
            Just announced: pre-orders open June 25 — see the cover art
          </span>
        </motion.a>

        <motion.p {...fade(0.25)} className="eyebrow mt-7">
          The road back to Vice City ends in
        </motion.p>

        <motion.h1
          {...fade(0.35)}
          className="mt-3 font-display leading-[0.88] tracking-wide"
          style={{ fontSize: 'clamp(4.2rem, 16vw, 11rem)' }}
        >
          <span className="block text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">GRAND THEFT</span>
          <span className="gradient-text-shimmer block">AUTO VI</span>
        </motion.h1>

        <motion.p {...fade(0.5)} className="mt-5 max-w-xl text-balance text-base font-medium leading-relaxed text-white/70 sm:text-lg">
          Jason and Lucia have always known the deck is stacked against them. When an easy score goes wrong, they find
          themselves on the darkest side of the sunniest place in America.
        </motion.p>

        <motion.div {...fade(0.62)} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <span className="glass-amber inline-flex items-center gap-2 !rounded-full px-5 py-2.5">
            <CalendarDays size={15} className="text-neon-amber" aria-hidden />
            <span className="font-tech text-xs font-bold uppercase tracking-[0.2em] text-neon-amber">{LAUNCH_DATE_LABEL}</span>
          </span>
          <span className="glass inline-flex items-center !rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            {PLATFORMS}
          </span>
        </motion.div>

        <motion.div {...fade(0.75)} className="mt-9 w-full max-w-2xl">
          <CountdownTimer />
        </motion.div>
      </div>

      {/* trailer audio toggle — appears once the background video is actually live */}
      {player && (
        <motion.button
          initial={reduced ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleAudio}
          aria-label={muted ? 'Unmute trailer audio' : 'Mute trailer audio'}
          aria-pressed={!muted}
          className="glass-cyan absolute bottom-6 right-4 z-30 flex h-12 items-center gap-2 !rounded-full px-4 text-neon-cyan sm:right-6"
        >
          {muted ? <VolumeX size={17} aria-hidden /> : <Volume2 size={17} aria-hidden />}
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Trailer audio</span>
        </motion.button>
      )}

      {/* scroll hint */}
      <motion.a
        href="#live"
        aria-label="Scroll to the livestream hub"
        className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-white/50 transition-colors hover:text-neon-cyan"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={26} aria-hidden />
      </motion.a>
    </section>
  )
}
