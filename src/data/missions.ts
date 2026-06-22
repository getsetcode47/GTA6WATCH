import type { Mission } from '../types'

/** Pre-launch "missions" — playful, forward-looking flavor. Progress on M-04 is computed live in the section. */
export const MISSIONS: Mission[] = [
  {
    id: 'm1',
    code: 'M-01',
    title: 'Welcome to Leonida',
    description: 'Watch Trailer 1 within 24 hours of release alongside 93 million other people. Triple Guinness World Record unlocked.',
    status: 'complete',
    progress: 100,
    reward: 'HYPE +1000',
  },
  {
    id: 'm2',
    code: 'M-02',
    title: 'Jason & Lucia',
    description: 'Survive the surprise Trailer 2 drop — 475M views in 24 hours, the biggest video launch in internet history.',
    status: 'complete',
    progress: 100,
    reward: 'HYPE +4750',
  },
  {
    id: 'm3',
    code: 'M-03',
    title: 'Endure the Delays',
    description: 'Fall 2025 → May 26, 2026 → November 19, 2026. Two delays absorbed. Take-Two says that’s the last of them.',
    status: 'complete',
    progress: 100,
    reward: 'PATIENCE +∞',
  },
  {
    id: 'm4',
    code: 'M-04',
    title: 'The Long Wait',
    description: 'Hold the line from Trailer 1 (Dec 4, 2023) to launch day. Progress bar is computed live — no skips, no cheats.',
    status: 'active',
    progress: -1, // computed at render from real dates
    reward: 'VICE CITY ACCESS',
  },
  {
    id: 'm5',
    code: 'M-05',
    title: 'Intercept the Reveal',
    description: 'CLEARED June 18 — Rockstar dropped a 33-second teaser, the official nine-panel cover art, new Jason & Lucia key art, and a pre-order date.',
    status: 'complete',
    progress: 100,
    reward: 'INTEL +300',
  },
  {
    id: 'm6',
    code: 'M-06',
    title: 'Secure the Pre-Order',
    description: 'ACTIVE — pre-orders open June 25, 2026 on digital storefronts and select retailers. Price drops at go-live (signals point to $79.99). Wishlist now, wallet ready.',
    status: 'active',
    progress: 60,
    reward: 'DISC / LICENSE',
  },
  {
    id: 'm7',
    code: 'M-07',
    title: 'Day One: Vice City',
    description: 'LOCKED — November 19, 2026. PS5 & Xbox Series X|S. Call in sick. Hydrate. Tell your people you love them.',
    status: 'locked',
    progress: 0,
    reward: 'THE GOOD LIFE',
  },
]
