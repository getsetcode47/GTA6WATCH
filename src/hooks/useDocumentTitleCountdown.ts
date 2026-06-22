import { useEffect } from 'react'

const BASE_TITLE = 'GTAVI.watch — GTA VI Launch Countdown · November 19, 2026'

/**
 * Live-updates the browser tab title with the days/hours remaining — a small
 * engagement + freshness touch. Updates once a minute (seconds in the title
 * just churns), and restores the SEO title on unmount.
 */
export function useDocumentTitleCountdown(target: Date) {
  useEffect(() => {
    const update = () => {
      const ms = target.getTime() - Date.now()
      if (ms <= 0) {
        document.title = 'GTA VI is OUT — GTAVI.watch'
        return
      }
      const days = Math.floor(ms / 86_400_000)
      const hours = Math.floor(ms / 3_600_000) % 24
      document.title = `${days}d ${hours}h to GTA VI · GTAVI.watch`
    }
    update()
    const id = setInterval(update, 60_000)
    return () => {
      clearInterval(id)
      document.title = BASE_TITLE
    }
  }, [target])
}
