import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const BOOT_LINES = ['CONNECTING TO LEONIDA UPLINK…', 'CALIBRATING NEON…', 'SYNCING COUNTDOWN…']

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion()
  const [line, setLine] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (reduced) {
      // skip the theatrics entirely
      setGone(true)
      onDone()
      return
    }
    const lineId = setInterval(() => setLine((l) => Math.min(l + 1, BOOT_LINES.length - 1)), 520)
    const doneId = setTimeout(() => {
      setGone(true)
      onDone()
    }, 1900)
    return () => {
      clearInterval(lineId)
      clearTimeout(doneId)
    }
  }, [onDone, reduced])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="scanlines fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          aria-label="Loading GTAVI.watch"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 0.8 }}
            className="eyebrow"
          >
            GTAVI.WATCH
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.21, 0.6, 0.35, 1] }}
            className="gradient-text-shimmer mt-4 font-display text-[clamp(5rem,22vw,12rem)] leading-none"
          >
            VI
          </motion.h1>
          <div className="mt-6 h-px w-48 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-amber"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40" aria-live="polite">
            {BOOT_LINES[line]}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
