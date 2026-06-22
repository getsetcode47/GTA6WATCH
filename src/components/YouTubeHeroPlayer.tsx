import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { TRAILER_1_ID, TRAILER_2_ID } from '../data/facts'

/** Minimal typings for the parts of the YouTube IFrame API we use. */
interface YTPlayer {
  mute(): void
  unMute(): void
  isMuted(): boolean
  playVideo(): void
  destroy(): void
}
interface YTNamespace {
  Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer
  PlayerState: { PLAYING: number }
}
declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTNamespace> | null = null
function loadYouTubeAPI(): Promise<YTNamespace> {
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT)
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      resolve(window.YT as YTNamespace)
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  })
  return apiPromise
}

/**
 * Full-bleed muted background player that cycles Trailer 2 → Trailer 1 on loop.
 * Sized like object-fit: cover for a 16:9 source and slightly overscanned to
 * crop YouTube chrome. Skipped entirely under prefers-reduced-motion.
 */
export default function YouTubeHeroPlayer({ onPlayerChange }: { onPlayerChange: (p: YTPlayer | null) => void }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (reduced || !hostRef.current) return
    let player: YTPlayer | undefined
    let cancelled = false

    loadYouTubeAPI().then((YT) => {
      if (cancelled || !hostRef.current) return
      player = new YT.Player(hostRef.current, {
        videoId: TRAILER_2_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          // first video = videoId, then this list, then loop back around
          playlist: TRAILER_1_ID,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute()
            e.target.playVideo()
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (e.data === YT.PlayerState.PLAYING) {
              setPlaying(true)
              onPlayerChange(e.target)
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      onPlayerChange(null)
      player?.destroy()
    }
  }, [reduced, onPlayerChange])

  if (reduced) return null

  return (
    <div
      aria-hidden
      className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${playing ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* 16:9 cover box: always at least as wide/tall as the viewport, overscanned 15% */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.15]"
        style={{
          width: 'max(100vw, 177.78vh)',
          height: 'max(100vh, 56.25vw)',
        }}
      >
        <div ref={hostRef} className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full" />
      </div>
    </div>
  )
}

export type { YTPlayer }
