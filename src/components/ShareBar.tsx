import { useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'

const SHARE_URL = 'https://gtavi.watch/'
const SHARE_TEXT = 'Counting down to GTA VI — November 19, 2026. Live countdown, trailers, cast & intel:'

/** X, Reddit, WhatsApp share intents + native share + copy-link fallback. */
const TARGETS = [
  {
    name: 'X',
    href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`,
    label: 'Share on X',
  },
  {
    name: 'Reddit',
    href: `https://www.reddit.com/submit?url=${encodeURIComponent(SHARE_URL)}&title=${encodeURIComponent('GTA VI launch countdown — Nov 19, 2026')}`,
    label: 'Share on Reddit',
  },
  {
    name: 'WhatsApp',
    href: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${SHARE_URL}`)}`,
    label: 'Share on WhatsApp',
  },
]

export default function ShareBar() {
  const [copied, setCopied] = useState(false)

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'GTAVI.watch', text: SHARE_TEXT, url: SHARE_URL })
      } catch {
        /* user dismissed — no-op */
      }
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {/* Native share — most useful on mobile; harmless elsewhere */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button onClick={nativeShare} className="btn-neon-ghost !min-h-[44px] !px-4 !py-2" aria-label="Share this page">
          <Share2 size={14} aria-hidden /> Share
        </button>
      )}
      {TARGETS.map((t) => (
        <a
          key={t.name}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.label}
          className="glass flex min-h-[44px] items-center gap-2 !rounded-full px-4 font-tech text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-neon-cyan"
        >
          {t.name}
        </a>
      ))}
      <button
        onClick={copy}
        aria-label="Copy link to this page"
        className="glass flex min-h-[44px] items-center gap-2 !rounded-full px-4 font-tech text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-neon-cyan"
      >
        {copied ? <Check size={14} className="text-neon-cyan" aria-hidden /> : <Link2 size={14} aria-hidden />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}
