import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Mail, Music2, Music4, X } from 'lucide-react'
import { submitEmail } from '../lib/api'

/* ---------------------------------------------------------------- *
 *  Ambient audio — a faint synthwave pad generated with WebAudio,
 *  so no audio asset (or copyrighted track) ships with the site.
 * ---------------------------------------------------------------- */
function useAmbientPad() {
  const ctxRef = useRef<{ ctx: AudioContext; master: GainNode } | null>(null)
  const [on, setOn] = useState(false)

  const toggle = () => {
    if (on) {
      ctxRef.current?.master.gain.linearRampToValueAtTime(0, ctxRef.current.ctx.currentTime + 0.6)
      setTimeout(() => {
        ctxRef.current?.ctx.close()
        ctxRef.current = null
      }, 700)
      setOn(false)
      return
    }
    const ctx = new AudioContext()
    const master = ctx.createGain()
    master.gain.value = 0
    master.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 480
    filter.connect(master)
    master.connect(ctx.destination)

    // slow filter sweep for movement
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.06
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 220
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()

    // A minor-ish pad: A2, E3, C4, slightly detuned
    ;[110, 164.81, 261.63, 110.5].forEach((freq, i) => {
      const osc = ctx.createOscillator()
      osc.type = i === 3 ? 'sine' : 'sawtooth'
      osc.frequency.value = freq
      const g = ctx.createGain()
      g.gain.value = i === 3 ? 0.5 : 0.22
      osc.connect(g)
      g.connect(filter)
      osc.start()
    })

    ctxRef.current = { ctx, master }
    setOn(true)
  }

  useEffect(() => () => void ctxRef.current?.ctx.close(), [])
  return { on, toggle }
}

export function AmbientAudioToggle() {
  const { on, toggle } = useAmbientPad()
  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Turn off ambient synthwave audio' : 'Turn on ambient synthwave audio'}
      className={`glass fixed bottom-5 left-4 z-[70] flex h-12 items-center gap-2 !rounded-full px-4 transition-colors sm:left-6 ${
        on ? 'border-neon-violet/50 text-neon-violet' : 'text-white/55 hover:text-white'
      }`}
    >
      {on ? <Music4 size={16} aria-hidden /> : <Music2 size={16} aria-hidden />}
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{on ? 'Ambience on' : 'Ambience'}</span>
    </button>
  )
}

/* ---------------------------------------------------------------- *
 *  Email capture popup
 * ---------------------------------------------------------------- */
const STORAGE_KEY = 'gtavi-watch:email-popup'

export function EmailPopup({
  open,
  onClose,
  autoTrigger = true,
}: {
  open: boolean
  onClose: () => void
  autoTrigger?: boolean
}) {
  const reduced = useReducedMotion()
  const [autoOpen, setAutoOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')

  // tasteful auto-trigger: once, after 25s, only if never dismissed
  useEffect(() => {
    if (!autoTrigger || localStorage.getItem(STORAGE_KEY)) return
    const id = setTimeout(() => setAutoOpen(true), 25_000)
    return () => clearTimeout(id)
  }, [autoTrigger])

  const visible = open || autoOpen
  const close = () => {
    localStorage.setItem(STORAGE_KEY, 'dismissed')
    setAutoOpen(false)
    onClose()
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@') || state === 'sending') return
    setState('sending')
    await submitEmail(email)
    localStorage.setItem(STORAGE_KEY, 'subscribed')
    setState('done')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center bg-void/70 p-4 backdrop-blur-sm sm:items-center"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Launch reminder signup"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
            className="glass-pink scanlines relative w-full max-w-md overflow-hidden p-7 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close signup popup"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} aria-hidden />
            </button>

            {state === 'done' ? (
              <div className="py-6 text-center">
                <CheckCircle2 size={36} className="mx-auto text-neon-cyan" aria-hidden />
                <p className="mt-4 font-display text-3xl tracking-wide text-white">YOU’RE ON THE LIST</p>
                <p className="mt-2 text-sm text-white/55">
                  We’ll ping you when pre-orders open and on launch morning. See you in Leonida.
                </p>
              </div>
            ) : (
              <>
                <p className="eyebrow !text-neon-pink/80">One-time offer</p>
                <h3 className="mt-3 font-display text-[clamp(1.9rem,5vw,2.6rem)] leading-[0.95] tracking-wide text-white">
                  DON’T MISS THE <span className="gradient-text">DROP</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  Trailer 3, pre-orders, and launch-day alerts. One email per beat, zero spam, gone after November 19.
                </p>
                <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" aria-hidden />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@vicecity.com"
                      aria-label="Email address"
                      className="min-h-[48px] w-full rounded-xl border border-white/15 bg-white/5 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:border-neon-pink/60 focus:outline-none"
                    />
                  </div>
                  <button type="submit" disabled={state === 'sending'} className="btn-neon-solid disabled:opacity-60">
                    {state === 'sending' ? 'Locking in…' : 'Lock it in'}
                  </button>
                </form>
                <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Demo mode: stored locally only · unofficial fan project
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
