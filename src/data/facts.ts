import type { Trailer } from '../types'

/**
 * Hard facts, all sourced (June 2026):
 * - Release date + delays: Rockstar Newswire (Nov 6, 2025) & May 2, 2025 announcements
 * - Trailer stats: YouTube / Rockstar via The Hollywood Reporter & Guinness World Records
 * - Business figures: Take-Two Q4 FY2026 earnings call (May 21, 2026)
 */
export const LAUNCH_DATE = new Date('2026-11-19T05:00:00Z') // Nov 19, 2026, midnight ET
export const LAUNCH_DATE_LABEL = 'November 19, 2026'
export const PLATFORMS = 'PS5 · Xbox Series X|S'

/**
 * Pre-orders: announced June 18, 2026 via Rockstar Newswire + a 33-second
 * teaser on @RockstarGames that also revealed the official cover art.
 * Go-live: June 25, 2026 on digital storefronts and select retailers.
 */
export const PREORDER_DATE = new Date('2026-06-25T13:00:00Z') // June 25, 2026
export const PREORDER_DATE_LABEL = 'June 25, 2026'
export const PREORDER_PRICE_NOTE = 'Price revealed at go-live · signals point to $79.99'

/** New official artwork from the June 18 reveal, self-hosted under /art. */
export const COVER_ART = {
  portrait: '/art/cover-portrait.jpg',
  landscape: '/art/cover-landscape.jpg',
  square: '/art/cover-square.jpg',
}
export const KEY_ART = {
  jasonLuciaLandscape: '/art/jason-lucia-landscape.webp',
  jasonLuciaLogo: '/art/jason-lucia-logo.webp',
  jasonLuciaPortrait: '/art/jason-lucia-portrait.jpg',
}

/** Where the "Pre-Order" / wishlist buttons point until storefront links go live. */
export const PREORDER_LINKS = [
  { label: 'PlayStation Store', url: 'https://store.playstation.com/' },
  { label: 'Xbox Store', url: 'https://www.xbox.com/games/store' },
  { label: 'Rockstar Store', url: 'https://store.rockstargames.com/' },
]

export const TRAILER_1_ID = 'QdBZY2fkU-0'
export const TRAILER_2_ID = 'VQRLujxTm3c'

export const TRAILERS: Trailer[] = [
  {
    id: 't2',
    youtubeId: TRAILER_2_ID,
    title: 'Trailer 2 — Jason & Lucia',
    date: 'May 6, 2025',
    stat: '475M views in 24h — biggest video launch ever',
  },
  {
    id: 't1',
    youtubeId: TRAILER_1_ID,
    title: 'Trailer 1 — Welcome to Leonida',
    date: 'December 4, 2023',
    stat: '93M YouTube views in 24h — Guinness record',
  },
]

export const DELAY_HISTORY = [
  {
    date: 'Dec 2023',
    label: 'Fall 2025',
    note: 'Original window announced alongside Trailer 1.',
  },
  {
    date: 'May 2, 2025',
    label: 'May 26, 2026',
    note: 'First delay. Rockstar apologizes, promises the polish "you expect and deserve."',
  },
  {
    date: 'Nov 6, 2025',
    label: 'Nov 19, 2026',
    note: 'Second and final delay. Take-Two has since reaffirmed the date in FY27 guidance.',
  },
]

export const STORY_STATS = [
  { value: 475, suffix: 'M', label: 'Trailer 2 views in 24 hours — the biggest video launch in internet history' },
  { value: 93, suffix: 'M', label: 'Trailer 1 YouTube views in 24 hours — three Guinness World Records' },
  { value: 8.2, suffix: 'B', prefix: '$', decimals: 1, label: 'Take-Two FY27 net bookings guidance, anchored to the Nov 19 launch' },
  { value: 182, suffix: 'K%', label: 'Streaming surge for "Hot Together" after Trailer 2 dropped' },
]

export const SOCIALS = [
  { name: 'Rockstar Newswire', url: 'https://www.rockstargames.com/newswire' },
  { name: 'GTA VI Official', url: 'https://www.rockstargames.com/VI' },
  { name: '@RockstarGames', url: 'https://x.com/RockstarGames' },
  { name: 'r/GTA6', url: 'https://www.reddit.com/r/GTA6/' },
]

export const DISCLAIMER =
  'GTAVI.watch is an unofficial fan project. It is not affiliated with, endorsed by, or connected to Rockstar Games, Take-Two Interactive, or any of their subsidiaries. Grand Theft Auto and all related marks are trademarks of Take-Two Interactive Software, Inc. Trailer footage and stills are embedded from Rockstar Games’ official YouTube channel.'
