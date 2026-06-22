import { motion, useReducedMotion } from 'framer-motion'
import { BadgeCheck, Bell, CalendarClock, ShoppingBag, Sparkles } from 'lucide-react'
import { Orbs } from '../components/Atmosphere'
import { LiveDot, Reveal, SectionHeading } from '../components/Section'
import CountdownTimer from '../components/CountdownTimer'
import WhereToPreOrder from '../components/WhereToPreOrder'
import { COVER_ART, KEY_ART, PLATFORMS, PREORDER_DATE, PREORDER_DATE_LABEL, PREORDER_PRICE_NOTE } from '../data/facts'

const HIGHLIGHTS = [
  { icon: BadgeCheck, text: 'November 19 release confirmed — Rockstar accepting money means no more delays' },
  { icon: CalendarClock, text: 'Pre-orders go live on digital storefronts and select retailers' },
  { icon: Sparkles, text: 'Official cover art, new Jason & Lucia key art, and a refreshed Rockstar logo revealed' },
]

export default function PreOrder({ onNotify }: { onNotify?: () => void }) {
  const reduced = useReducedMotion()

  return (
    <section id="preorder" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs variant="violet-amber" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Just Announced · June 18"
          title={
            <>
              PRE-ORDERS OPEN <span className="gradient-text">JUNE 25</span>
            </>
          }
          intro="Rockstar broke radio silence with a 33-second teaser, the official cover art, and a date. The wait to give them your money is almost over."
        />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-12">
          {/* cover art */}
          <Reveal className="mx-auto w-full max-w-[360px]">
            <motion.figure
              initial={reduced ? false : { opacity: 0, scale: 0.95, rotateZ: -1 }}
              whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.21, 0.6, 0.35, 1] }}
              className="group relative"
            >
              <div
                aria-hidden
                className="absolute -inset-3 rounded-3xl opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #00f0ff55, #ff2d7b55, #ffb80055)' }}
              />
              <img
                src={COVER_ART.portrait}
                alt="Official Grand Theft Auto VI cover art — the nine-panel grid featuring Jason, Lucia, and Vice City"
                loading="lazy"
                decoding="async"
                className="relative w-full rounded-2xl border border-white/15 shadow-2xl"
              />
              <figcaption className="relative mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Official cover art · revealed June 18, 2026
              </figcaption>
            </motion.figure>
          </Reveal>

          {/* details + countdown */}
          <div>
            <Reveal>
              <div className="glass-amber inline-flex items-center gap-2.5 !rounded-full px-4 py-2">
                <LiveDot color="#ffb800" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 sm:text-[11px]">
                  Pre-orders go live in
                </span>
              </div>
              <div className="mt-4 max-w-xl">
                <CountdownTimer target={PREORDER_DATE} label="Time until GTA VI pre-orders open" />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                {PREORDER_DATE_LABEL} · {PLATFORMS} · {PREORDER_PRICE_NOTE}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-7 space-y-3">
                {HIGHLIGHTS.map((h) => (
                  <li key={h.text} className="flex items-start gap-3">
                    <h.icon size={17} className="mt-0.5 shrink-0 text-neon-amber" aria-hidden />
                    <span className="text-sm leading-relaxed text-white/65">{h.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                {onNotify && (
                  <button onClick={onNotify} className="btn-neon-solid">
                    <Bell size={14} aria-hidden /> Alert me when live
                  </button>
                )}
                <a href="#preorder-stores" className="btn-neon-ghost">
                  <ShoppingBag size={14} aria-hidden /> Where to pre-order
                </a>
              </div>
              <p className="mt-4 font-mono text-[10px] leading-relaxed text-white/30">
                Wishlist GTA VI now to get the alert the moment pre-orders go live on {PREORDER_DATE_LABEL} — then
                compare every store below.
              </p>
            </Reveal>
          </div>
        </div>

        {/* where-to-pre-order comparison */}
        <div id="preorder-stores" className="mt-16 scroll-mt-24">
          <WhereToPreOrder onNotify={onNotify} />
        </div>

        {/* new key art strip */}
        <Reveal delay={0.1} className="mt-12">
          <p className="eyebrow">— New artwork from the reveal</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { src: KEY_ART.jasonLuciaLandscape, alt: 'New Jason and Lucia key art over the Vice City skyline at dusk' },
              { src: COVER_ART.landscape, alt: 'Official GTA VI cover art, landscape composition' },
              { src: KEY_ART.jasonLuciaPortrait, alt: 'Jason and Lucia portrait key art from the June 2026 reveal' },
            ].map((img) => (
              <figure key={img.src} className="group relative overflow-hidden rounded-xl border border-white/10">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
              </figure>
            ))}
          </div>
        </Reveal>

        <p className="mt-8 text-center font-mono text-[10px] tracking-wide text-white/30">
          Cover art and key art © Rockstar Games, from the official June 18, 2026 reveal. Shown here as fan commentary.
        </p>
      </div>
    </section>
  )
}
