import { useReducedMotion } from 'framer-motion'

/**
 * Site-wide ambience: animated film grain, a slow scanline sweep,
 * floating neon orbs, and drifting particles. Everything is fixed,
 * pointer-transparent, and collapses to static glows under
 * prefers-reduced-motion.
 */
export default function Atmosphere() {
  const reduced = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {/* film grain */}
      <div
        className={`absolute -inset-[100%] opacity-[0.07] ${reduced ? '' : 'animate-grain'}`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '256px 256px',
        }}
      />
      {/* slow scanline sweep */}
      {!reduced && (
        <div
          className="absolute inset-x-0 h-32 animate-scansweep"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgba(0,240,255,0.045), rgba(0,240,255,0.09), rgba(0,240,255,0.045), transparent)',
          }}
        />
      )}
    </div>
  )
}

/** Per-section ambient orbs + particles (absolutely positioned inside a relative parent). */
export function Orbs({ variant = 'cyan-pink' }: { variant?: 'cyan-pink' | 'violet-amber' | 'pink-violet' }) {
  const reduced = useReducedMotion()
  const [a, b] =
    variant === 'violet-amber'
      ? ['rgba(191,0,255,0.13)', 'rgba(255,184,0,0.10)']
      : variant === 'pink-violet'
        ? ['rgba(255,45,123,0.13)', 'rgba(191,0,255,0.11)']
        : ['rgba(0,240,255,0.12)', 'rgba(255,45,123,0.11)']

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className={`absolute -left-24 top-1/4 h-96 w-96 rounded-full blur-3xl ${reduced ? '' : 'animate-floaty'}`}
        style={{ background: `radial-gradient(circle, ${a}, transparent 70%)` }}
      />
      <div
        className={`absolute -right-24 bottom-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl ${reduced ? '' : 'animate-floaty'}`}
        style={{ background: `radial-gradient(circle, ${b}, transparent 70%)`, animationDelay: '-7s' }}
      />
      {!reduced &&
        [12, 28, 47, 63, 81, 92].map((left, i) => (
          <span
            key={left}
            className="absolute block h-1 w-1 rounded-full"
            style={{
              left: `${left}%`,
              background: i % 2 ? '#ff2d7b' : '#00f0ff',
              boxShadow: `0 0 6px ${i % 2 ? '#ff2d7b' : '#00f0ff'}`,
              animation: `riseUp ${16 + i * 3}s linear infinite`,
              animationDelay: `${i * -4.5}s`,
              opacity: 0,
            }}
          />
        ))}
    </div>
  )
}
