/**
 * Where to pre-order GTA VI. Only first-party + authorized retailers — this is
 * a deliberate trust/scam-safety choice (NordVPN has flagged fake GTA 6
 * pre-order scams). Outbound links are built through lib/affiliate.ts.
 *
 * URLs are the retailers' canonical landing pages today; swap in the exact GTA
 * VI product URLs once listings go live on June 25.
 */
export type Platform = 'PS5' | 'Xbox' | 'PC' | 'Physical' | 'Digital'

export interface Retailer {
  id: string
  name: string
  url: string
  platforms: Platform[]
  note: string
  badge?: string
  /** First-party or authorized retailer — shown with a trust check. */
  official?: boolean
}

export const RETAILERS: Retailer[] = [
  {
    id: 'playstation',
    name: 'PlayStation Store',
    url: 'https://store.playstation.com/',
    platforms: ['PS5', 'Digital'],
    note: 'Digital pre-order for PS5. Wishlist now to be alerted the moment it goes live.',
    badge: 'Official',
    official: true,
  },
  {
    id: 'xbox',
    name: 'Xbox Store',
    url: 'https://www.xbox.com/games/store',
    platforms: ['Xbox', 'Digital'],
    note: 'Digital pre-order for Xbox Series X|S. Add to wishlist for a go-live alert.',
    badge: 'Official',
    official: true,
  },
  {
    id: 'rockstar',
    name: 'Rockstar Store',
    url: 'https://store.rockstargames.com/',
    platforms: ['PS5', 'Xbox'],
    note: 'Buy direct from the publisher. Watch here for any store-exclusive bonuses.',
    badge: 'Official',
    official: true,
  },
  {
    id: 'bestbuy',
    name: 'Best Buy',
    url: 'https://www.bestbuy.com/',
    platforms: ['PS5', 'Xbox', 'Physical'],
    note: 'Physical discs for PS5 & Xbox. Ran the verified GTA 6 pre-order campaign in May.',
    badge: 'Physical',
    official: true,
  },
  {
    id: 'gamestop',
    name: 'GameStop',
    url: 'https://www.gamestop.com/',
    platforms: ['PS5', 'Xbox', 'Physical'],
    note: 'Physical + the most likely home for any Collector’s / special edition.',
    badge: 'Collector’s',
    official: true,
  },
  {
    id: 'amazon',
    name: 'Amazon',
    url: 'https://www.amazon.com/',
    platforms: ['PS5', 'Xbox', 'Physical'],
    note: 'Physical copies, usually with pre-order price guarantee. Reliable, ships day one.',
    badge: 'Physical',
    official: true,
  },
]

/** Fund a console wallet with a gift card, then pre-order — for buyers without a card on file. */
export interface GiftCardOption {
  id: string
  name: string
  url: string
  note: string
}

export const GIFT_CARD_OPTIONS: GiftCardOption[] = [
  {
    id: 'cdkeys',
    name: 'CDKeys',
    url: 'https://www.cdkeys.com/',
    note: 'PSN & Xbox gift cards, often below face value.',
  },
  {
    id: 'startselect',
    name: 'Startselect',
    url: 'https://startselect.com/',
    note: 'Top up your PlayStation / Xbox wallet, then pre-order on console.',
  },
]
