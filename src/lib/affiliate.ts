/**
 * Affiliate link layer.
 *
 * Ships working TODAY: every outbound store link is UTM-tagged so you get
 * analytics immediately. It becomes MONETIZED the moment you paste your
 * affiliate IDs / network deep-links into AFFILIATE below — no component
 * changes needed.
 *
 * How each network works:
 *  - Amazon Associates: append `?tag=YOURTAG-20` to the product URL.
 *  - Best Buy (Impact), Xbox/Microsoft & GameStop (Rakuten), PlayStation
 *    (Partnerize): these give you a "deep link" that wraps the destination
 *    URL. Paste the template and mark where the encoded URL goes with `{u}`,
 *    e.g. 'https://goto.bestbuy.com/c/123456/789/1234?u={u}'.
 *
 * Until a retailer has config here, its card links straight to the retailer
 * (UTM-tagged). isMonetized() reflects whether real affiliate tracking is on.
 */

export interface AffiliateEntry {
  /** Network deep-link template; `{u}` is replaced with the encoded dest URL. */
  deepLink?: string
  /** Extra query params appended to the destination (e.g. Amazon tag). */
  params?: Record<string, string>
}

/** 👉 Paste your real affiliate credentials here as they get approved. */
export const AFFILIATE: Record<string, AffiliateEntry> = {
  playstation: { deepLink: '' },
  xbox: { deepLink: '' },
  rockstar: { deepLink: '' },
  bestbuy: { deepLink: '' }, // Impact — proven GTA 6 5% campaign
  gamestop: { deepLink: '' }, // Rakuten
  amazon: { params: { tag: '' } }, // Associates tag, e.g. 'gtaviwatch-20'
  cdkeys: { deepLink: '' },
  startselect: { deepLink: '' },
}

const UTM = {
  utm_source: 'gtavi.watch',
  utm_medium: 'affiliate',
  utm_campaign: 'gta6-preorder',
}

function withParams(url: string, params: Record<string, string>): string {
  const u = new URL(url)
  for (const [k, v] of Object.entries(params)) {
    if (v) u.searchParams.set(k, v)
  }
  return u.toString()
}

/** True once a retailer has real affiliate tracking configured. */
export function isMonetized(retailerId: string): boolean {
  const cfg = AFFILIATE[retailerId]
  if (!cfg) return false
  if (cfg.deepLink && cfg.deepLink.includes('{u}')) return true
  return Boolean(cfg.params && Object.values(cfg.params).some(Boolean))
}

/** Any retailer monetized yet? Drives the disclosure copy. */
export function anyMonetized(): boolean {
  return Object.keys(AFFILIATE).some(isMonetized)
}

/**
 * Build the outbound URL for a retailer. Always UTM-tagged; wrapped in the
 * network deep-link when one is configured.
 */
export function buildAffiliateUrl(retailerId: string, destUrl: string): string {
  const cfg = AFFILIATE[retailerId]
  const tagged = withParams(destUrl, { ...UTM, ...(cfg?.params ?? {}) })
  if (cfg?.deepLink && cfg.deepLink.includes('{u}')) {
    return cfg.deepLink.replace('{u}', encodeURIComponent(tagged))
  }
  return tagged
}

/**
 * rel for monetizable outbound links, per Google's link-attribution guidance:
 * sponsored + nofollow, plus the usual safety attrs.
 */
export const AFFILIATE_REL = 'sponsored nofollow noopener noreferrer'
