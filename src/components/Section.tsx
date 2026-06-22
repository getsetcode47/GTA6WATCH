import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function NeonDivider() {
  return <div aria-hidden className="neon-divider" />
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
}: {
  eyebrow: string
  title: ReactNode
  intro?: string
  align?: 'center' | 'left'
}) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow">— {eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-wide">{title}</h2>
      {intro && <p className="mt-4 text-balance text-base leading-relaxed text-white/60 sm:text-lg">{intro}</p>}
    </Reveal>
  )
}

/** Scroll-reveal wrapper; renders statically under prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function LiveDot({ color = '#ff2d7b' }: { color?: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-2 w-2 shrink-0 rounded-full animate-pulseDot"
      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
    />
  )
}
