import { ExternalLink } from 'lucide-react'
import { DISCLAIMER, LAUNCH_DATE_LABEL, PREORDER_DATE_LABEL, SOCIALS } from '../data/facts'
import { IS_DEMO_MODE } from '../lib/api'

const NAV = [
  { href: '#preorder', label: 'Pre-Order' },
  { href: '#live', label: 'Livestream Hub' },
  { href: '#intel', label: 'Latest Intel' },
  { href: '#story', label: 'The Story' },
  { href: '#cast', label: 'The Cast' },
  { href: '#missions', label: 'Mission Tracker' },
  { href: '#community', label: 'Community' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#screenshots', label: 'Screenshots' },
  { href: '#faq', label: 'FAQ' },
]

const FACTS = [
  `Release: ${LAUNCH_DATE_LABEL}`,
  `Pre-orders: ${PREORDER_DATE_LABEL}`,
  'Platforms: PS5 · Xbox Series X|S',
  'Setting: Vice City, State of Leonida',
  'Protagonists: Jason Duval & Lucia Caminos',
  'PC version: not announced',
  'Price: TBA (signals point to $70–80)',
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-abyss px-4 pb-12 pt-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-baseline gap-1.5 font-display text-3xl tracking-wider">
              <span className="gradient-text">GTAVI</span>
              <span className="font-mono text-sm text-white/50">.watch</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              A neon-noir countdown hub for the most anticipated game ever made. Built by fans, for the people
              refreshing the Newswire since 2023.
            </p>
            {IS_DEMO_MODE && (
              <p className="mt-4 inline-block rounded bg-neon-amber/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-neon-amber/80">
                demo mode · static data
              </p>
            )}
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-white/55 transition-colors hover:text-neon-cyan">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Official Channels</p>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-neon-pink"
                  >
                    {s.name} <ExternalLink size={11} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Release Facts</p>
            <ul className="mt-4 space-y-2.5">
              {FACTS.map((f) => (
                <li key={f} className="font-mono text-[11px] leading-relaxed tracking-wide text-white/45">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="neon-divider mt-12" aria-hidden />

        <p className="mt-8 text-center font-mono text-[10px] leading-relaxed text-white/35">{DISCLAIMER}</p>
        <p className="mt-3 text-center font-mono text-[10px] tracking-wide text-white/25">
          © 2026 GTAVI.watch — a fan project · see you in Vice City
        </p>
      </div>
    </footer>
  )
}
