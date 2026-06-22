import { useCountdown, pad } from '../hooks/useCountdown'
import { LAUNCH_DATE } from '../data/facts'

export default function CountdownTimer({
  target = LAUNCH_DATE,
  size = 'lg',
  label = 'Time until Grand Theft Auto VI launches',
}: {
  target?: Date
  size?: 'lg' | 'sm'
  label?: string
}) {
  const { days, hours, minutes, seconds, done } = useCountdown(target)

  const units = [
    { v: String(days), l: 'Days', glow: 'glow-cyan', border: 'border-neon-cyan/30' },
    { v: pad(hours), l: 'Hours', glow: 'glow-pink', border: 'border-neon-pink/30' },
    { v: pad(minutes), l: 'Minutes', glow: 'glow-gold', border: 'border-neon-amber/30' },
    { v: pad(seconds), l: 'Seconds', glow: 'text-neon-violet', border: 'border-neon-violet/30' },
  ]

  if (done) {
    return (
      <p role="timer" aria-label={label} className="glow-pink font-display text-4xl tracking-wider">
        IT’S OUT. GO PLAY.
      </p>
    )
  }

  return (
    <div role="timer" aria-label={label} aria-live="off" className={`grid grid-cols-4 ${size === 'lg' ? 'gap-2 sm:gap-4' : 'gap-2'}`}>
      {units.map((u) => (
        <div
          key={u.l}
          className={`glass ${u.border} flex flex-col items-center justify-center ${
            size === 'lg' ? 'px-1 py-3 sm:px-4 sm:py-5' : 'px-1 py-2.5'
          }`}
        >
          <span
            className={`${u.glow} font-tech font-bold tabular-nums ${
              size === 'lg' ? 'text-[clamp(1.5rem,6vw,3rem)]' : 'text-xl sm:text-2xl'
            }`}
          >
            {u.v}
          </span>
          <span className={`mt-1 font-mono uppercase tracking-[0.2em] text-white/45 ${size === 'lg' ? 'text-[9px] sm:text-[11px]' : 'text-[8px] sm:text-[9px]'}`}>
            {u.l}
          </span>
        </div>
      ))}
    </div>
  )
}
