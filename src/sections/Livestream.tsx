import { useState } from 'react'
import { Eye, Play, Radio, TrendingUp } from 'lucide-react'
import { Orbs } from '../components/Atmosphere'
import { LiveDot, Reveal, SectionHeading } from '../components/Section'
import CountdownTimer from '../components/CountdownTimer'
import { LAUNCH_DATE, LAUNCH_DATE_LABEL, TRAILERS } from '../data/facts'

const TICKER_ITEMS = [
  'TAKE-TWO REAFFIRMS NOV 19 — "WON’T BE DELAYED AGAIN"',
  'TRAILER 3 + PRE-ORDERS EXPECTED LATE JUNE',
  'PRICING SIGNALS: $70–80 STANDARD EDITION',
  'FY27 GUIDANCE: $8–8.2B NET BOOKINGS',
  'NO PC VERSION ANNOUNCED — PS5 & XBOX SERIES X|S ONLY',
  'GTA ONLINE SUCCESSOR RUMORED ~1 MONTH POST-LAUNCH',
]

const STATS = [
  { icon: Eye, value: '475M', label: 'Trailer 2 views, first 24h', tone: 'text-neon-pink' },
  { icon: TrendingUp, value: '93M', label: 'Trailer 1 views, first 24h', tone: 'text-neon-cyan' },
  { icon: Play, value: '500M+', label: 'Trailer 2 lifetime views', tone: 'text-neon-amber' },
]

type Tab = 'live' | (typeof TRAILERS)[number]['id']

export default function Livestream() {
  const [tab, setTab] = useState<Tab>('live')
  const activeTrailer = TRAILERS.find((t) => t.id === tab)

  return (
    <section id="live" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Broadcast"
          title={
            <>
              LIVESTREAM <span className="gradient-text">HUB</span>
            </>
          }
          intro="The launch-night broadcast goes live November 19. Until then, the channel runs the only two transmissions Rockstar has ever sent."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* player column */}
          <Reveal>
            <div role="tablist" aria-label="Stream and trailers" className="flex flex-wrap gap-2">
              <button
                role="tab"
                aria-selected={tab === 'live'}
                onClick={() => setTab('live')}
                className={`btn-clip inline-flex min-h-[44px] items-center gap-2 px-5 py-2.5 font-tech text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  tab === 'live' ? 'bg-neon-pink/20 text-neon-pink' : 'bg-white/5 text-white/50 hover:text-white'
                }`}
              >
                <LiveDot /> Launch Stream
              </button>
              {TRAILERS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`btn-clip inline-flex min-h-[44px] items-center gap-2 px-5 py-2.5 font-tech text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    tab === t.id ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-white/5 text-white/50 hover:text-white'
                  }`}
                >
                  <Play size={12} aria-hidden /> {t.id === 't1' ? 'Trailer 1' : 'Trailer 2'}
                </button>
              ))}
            </div>

            <div className="glass-cyan scanlines relative mt-4 overflow-hidden !rounded-2xl">
              <div className="relative aspect-video w-full">
                {tab === 'live' ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-abyss px-4 text-center">
                    <span className="glass inline-flex items-center gap-2 !rounded-full px-4 py-2">
                      <Radio size={13} className="text-white/40" aria-hidden />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                        Stream offline
                      </span>
                    </span>
                    <p className="mt-5 font-display text-3xl tracking-wide text-white/85 sm:text-4xl">
                      LIVE FROM VICE CITY
                    </p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                      Broadcast begins {LAUNCH_DATE_LABEL}
                    </p>
                    <div className="mt-6 w-full max-w-sm">
                      <CountdownTimer size="sm" label="Time until the launch stream" />
                    </div>
                  </div>
                ) : (
                  activeTrailer && (
                    <iframe
                      key={activeTrailer.id}
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${activeTrailer.youtubeId}?rel=0`}
                      title={`Grand Theft Auto VI — ${activeTrailer.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  )
                )}
              </div>
              {activeTrailer && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3">
                  <p className="font-tech text-xs font-bold uppercase tracking-[0.15em] text-white/80">
                    {activeTrailer.title}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                    {activeTrailer.date} · {activeTrailer.stat}
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          {/* sidebar */}
          <div className="flex flex-col gap-4">
            <Reveal delay={0.1}>
              <div className="glass-pink p-5">
                <p className="eyebrow !text-neon-pink/80">Stream begins in</p>
                <div className="mt-4">
                  <CountdownTimer target={LAUNCH_DATE} size="sm" label="Time until the launch stream" />
                </div>
                <p className="mt-4 font-mono text-[10px] leading-relaxed text-white/40">
                  Launch-night watch party — countdown synced to the Nov 19 release.
                </p>
              </div>
            </Reveal>

            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.07}>
                <div className="glass flex items-center gap-4 p-5">
                  <s.icon size={22} className={s.tone} aria-hidden />
                  <div>
                    <p className={`font-tech text-2xl font-bold ${s.tone}`}>{s.value}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">{s.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* breaking ticker */}
        <Reveal delay={0.2} className="mt-8">
          <div className="glass relative flex items-center overflow-hidden !rounded-full">
            <span className="z-10 flex shrink-0 items-center gap-2 bg-neon-pink/15 px-4 py-3 font-tech text-[10px] font-bold uppercase tracking-[0.2em] text-neon-pink">
              <LiveDot /> Breaking
            </span>
            <div className="flex overflow-hidden">
              <div className="flex animate-ticker whitespace-nowrap">
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                  <span key={i} className="px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
                    {item} <span className="ml-6 text-neon-cyan/50">◆</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
