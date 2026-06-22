import type { ChatMessage } from '../types'

/** Demo-mode chat seed. A realtime backend (Supabase channel) can replace this via lib/api.ts. */
export const CHAT_SEED: ChatMessage[] = [
  { id: 'c1', user: 'ViceQueen86', color: '#ff2d7b', text: '160 days. We’re in the endgame now.', minutesAgo: 42 },
  { id: 'c2', user: 'LeonidaMan', color: '#00f0ff', text: 'zelnick said marketing starts "when it’s summertime"… june 21 is RIGHT THERE', minutesAgo: 38 },
  { id: 'c3', user: 'tommy_v', color: '#ffb800', text: 'still can’t believe trailer 2 did 475M in a day. half a billion people watched a trailer', minutesAgo: 31 },
  { id: 'c4', user: 'HeatherGlades', color: '#bf00ff', text: 'the acoustic sensor guy outside Rockstar North is the realest one of us', minutesAgo: 27 },
  { id: 'c5', user: 'KeysRunner', color: '#00f0ff', text: 'Brian Heder letting Jason live rent free… in THIS economy? mentor of the year', minutesAgo: 19 },
  { id: 'c6', user: 'roxy_stan', color: '#ff2d7b', text: 'Real Dimez album before the game even ships, calling it now', minutesAgo: 14 },
  { id: 'c7', user: 'PixelSmuggler', color: '#ffb800', text: 'survived two delays. i can survive 5 more months. probably.', minutesAgo: 8 },
  { id: 'c8', user: 'ViceQueen86', color: '#ff2d7b', text: 'pre-orders with trailer 3 per techtimes. wallets ready 🫡', minutesAgo: 3 },
]
