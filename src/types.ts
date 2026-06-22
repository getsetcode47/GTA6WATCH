export type NewsCategory = 'official' | 'business' | 'rumor' | 'industry' | 'community'

export interface NewsItem {
  id: string
  category: NewsCategory
  date: string // ISO date
  headline: string
  summary: string
  source: string
  url: string
  featured?: boolean
}

export interface Character {
  id: string
  name: string
  role: string
  faction: string
  bio: string
  quote: string
  /** Neon hue pair used to render the stylized profile art */
  hueFrom: string
  hueTo: string
  monogram: string
}

export interface Mission {
  id: string
  code: string
  title: string
  description: string
  status: 'complete' | 'active' | 'locked'
  progress: number // 0-100
  reward: string
}

export interface GalleryItem {
  id: string
  src: string
  fallback: string
  alt: string
  caption: string
  trailer: 'Trailer 1' | 'Trailer 2' | 'June Reveal'
  tall?: boolean
}

export interface ChatMessage {
  id: string
  user: string
  color: string
  text: string
  minutesAgo: number
}

export interface Trailer {
  id: string
  youtubeId: string
  title: string
  date: string
  stat: string
}
