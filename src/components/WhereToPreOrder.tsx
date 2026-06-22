import { ArrowUpRight, BadgeCheck, Bell, Gift, ShieldCheck } from 'lucide-react'
import { Reveal } from './Section'
import AffiliateDisclosure from './AffiliateDisclosure'
import { GIFT_CARD_OPTIONS, RETAILERS, type Platform } from '../data/retailers'
import { AFFILIATE_REL, buildAffiliateUrl } from '../lib/affiliate'
import { PREORDER_DATE_LABEL } from '../data/facts'

const PLATFORM_STYLE: Record<Platform, string> = {
  PS5: 'bg-neon-cyan/15 text-neon-cyan',
  Xbox: 'bg-[#9bf00b]/15 text-[#b6f55a]',
  PC: 'bg-neon-violet/20 text-[#d98aff]',
  Physical: 'bg-white/10 text-white/60',
  Digital: 'bg-neon-pink/15 text-neon-pink',
}

export default function WhereToPreOrder({ onNotify }: { onNotify?: () => void }) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">— Where to pre-order</p>
          <h3 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-none tracking-wide text-white">
            COMPARE EVERY STORE
          </h3>
        </div>
        {onNotify && (
          <button onClick={onNotify} className="btn-neon-solid !min-h-[44px]">
            <Bell size={13} aria-hidden /> Alert me {PREORDER_DATE_LABEL.replace(', 2026', '')}
          </button>
        )}
      </div>

      <div className="mt-5">
        <AffiliateDisclosure variant="banner" />
      </div>

      {/* retailer grid */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RETAILERS.map((r, i) => (
          <Reveal key={r.id} delay={(i % 3) * 0.06}>
            <a
              href={buildAffiliateUrl(r.id, r.url)}
              target="_blank"
              rel={AFFILIATE_REL}
              className="glass group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:border-neon-amber/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 font-tech text-sm font-bold uppercase tracking-[0.12em] text-white/90">
                  {r.official && <BadgeCheck size={15} className="shrink-0 text-neon-cyan" aria-hidden />}
                  {r.name}
                </span>
                <ArrowUpRight
                  size={15}
                  aria-hidden
                  className="shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-amber"
                />
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.platforms.map((p) => (
                  <span key={p} className={`rounded px-2 py-0.5 font-tech text-[9px] font-bold uppercase tracking-[0.15em] ${PLATFORM_STYLE[p]}`}>
                    {p}
                  </span>
                ))}
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">{r.note}</p>

              <span className="mt-4 inline-flex items-center gap-1.5 font-tech text-[10px] font-bold uppercase tracking-[0.2em] text-neon-amber">
                Pre-order
                {r.badge && <span className="rounded bg-white/8 px-1.5 py-0.5 text-white/55">{r.badge}</span>}
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      {/* gift-card helper */}
      <Reveal delay={0.1} className="mt-5">
        <div className="glass-amber flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Gift size={20} className="mt-0.5 shrink-0 text-neon-amber" aria-hidden />
            <div>
              <p className="font-tech text-xs font-bold uppercase tracking-[0.15em] text-white/85">
                No card on file? Fund your wallet
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/50">
                Top up your PlayStation or Xbox balance with a gift card, then pre-order straight from the console store.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {GIFT_CARD_OPTIONS.map((g) => (
              <a
                key={g.id}
                href={buildAffiliateUrl(g.id, g.url)}
                target="_blank"
                rel={AFFILIATE_REL}
                title={g.note}
                className="glass flex min-h-[40px] items-center gap-1.5 !rounded-full px-4 font-tech text-[10px] font-bold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-neon-amber"
              >
                {g.name}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* scam-safety note */}
      <Reveal delay={0.12} className="mt-4">
        <div className="flex items-start gap-3 rounded-xl border border-neon-pink/20 bg-neon-pink/[0.04] px-4 py-3">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-neon-pink" aria-hidden />
          <p className="text-xs leading-relaxed text-white/55">
            <span className="font-bold text-white/80">Stay safe:</span> only pre-order from official or authorized
            retailers like the ones above. Ignore third-party sites selling early "pre-orders," beta keys, or prices
            that look too good — security researchers have flagged a wave of GTA VI pre-order scams.
          </p>
        </div>
      </Reveal>
    </div>
  )
}
