import { Info } from 'lucide-react'

/**
 * FTC-compliant affiliate disclosure. Required wherever affiliate links appear.
 * `variant="inline"` is a compact one-liner for placing right by the links;
 * `variant="banner"` is a bordered callout for the top of a commerce module.
 */
export default function AffiliateDisclosure({ variant = 'inline' }: { variant?: 'inline' | 'banner' }) {
  const text =
    'Some store links are affiliate links. If you buy through them, GTAVI.watch may earn a commission — at no extra cost to you. We only link official and authorized retailers.'

  if (variant === 'banner') {
    return (
      <div className="glass flex items-start gap-3 rounded-xl px-4 py-3" role="note">
        <Info size={15} className="mt-0.5 shrink-0 text-neon-cyan/80" aria-hidden />
        <p className="font-mono text-[10px] leading-relaxed tracking-wide text-white/45">{text}</p>
      </div>
    )
  }
  return <p className="font-mono text-[10px] leading-relaxed tracking-wide text-white/35">{text}</p>
}
