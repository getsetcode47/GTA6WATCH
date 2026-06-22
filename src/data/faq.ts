/**
 * FAQ content targets the highest-volume GTA VI search queries (Google "People
 * Also Ask" + AI answer engines). Single source of truth: rendered visibly in
 * the FAQ section AND emitted as FAQPage JSON-LD. Answers kept to ~40–60 words
 * per current schema guidance. All facts sourced as of June 2026.
 */
export interface FaqItem {
  q: string
  a: string
}

export const FAQ: FaqItem[] = [
  {
    q: 'When does GTA 6 come out?',
    a: 'Grand Theft Auto VI launches on Thursday, November 19, 2026, on PlayStation 5 and Xbox Series X|S. Rockstar Games has confirmed the date and Take-Two has reaffirmed it repeatedly — opening pre-orders on June 25 is a strong signal that the November 19 date is final.',
  },
  {
    q: 'When do GTA 6 pre-orders open?',
    a: 'GTA VI pre-orders open on June 25, 2026, on digital storefronts (PlayStation Store, Xbox Store) and at select retailers. Rockstar confirmed the date on June 18 alongside the official cover art. Wishlist the game now to be alerted the moment pre-orders go live.',
  },
  {
    q: 'How much will GTA 6 cost?',
    a: 'No price is officially confirmed yet — it is expected to be revealed when pre-orders open on June 25. Take-Two has signalled a $70–$80 standard edition, in line with current AAA pricing, with a Collector’s Edition widely expected to cost more.',
  },
  {
    q: 'Is GTA 6 coming to PC?',
    a: 'Not at launch. The November 19, 2026 release covers PS5 and Xbox Series X|S only, and Rockstar has not announced a PC version or date. Based on the GTA V and Red Dead Redemption 2 pattern, a PC release is widely expected roughly 12–18 months later (2027 or beyond).',
  },
  {
    q: 'What platforms is GTA 6 on?',
    a: 'At launch, Grand Theft Auto VI is a current-generation console exclusive: PlayStation 5 and Xbox Series X and Series S. There is no last-gen (PS4 / Xbox One) version, and no PC version is confirmed for the initial release.',
  },
  {
    q: 'Has GTA 6 been delayed again?',
    a: 'No. GTA VI slipped twice — from Fall 2025 to May 26, 2026, then to November 19, 2026 — but Take-Two’s CEO has said it "won’t be delayed again." Opening pre-orders on June 25, 2026 reinforces that the November date is locked.',
  },
  {
    q: 'Where does GTA 6 take place?',
    a: 'GTA VI is set in the state of Leonida — a modern reimagining of Florida — centered on neon-soaked Vice City. You play as Jason Duval and Lucia Caminos, a Bonnie-and-Clyde duo whose easy score goes wrong, in the biggest open world Rockstar has ever built.',
  },
]
