import type { ChatMessage, NewsItem } from '../types'
import { NEWS } from '../data/news'
import { CHAT_SEED } from '../data/chat'

/**
 * Data access layer, shaped so a Supabase backend can drop in later:
 * set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY and replace the local
 * branches with `supabase.from('news').select()` etc. Until then the app
 * runs in demo mode against static data, with simulated latency so
 * loading states stay honest.
 */
export const IS_DEMO_MODE = !import.meta.env.VITE_SUPABASE_URL

const simulateLatency = (ms = 120) => new Promise((r) => setTimeout(r, ms))

export async function fetchNews(): Promise<NewsItem[]> {
  // Supabase: return (await supabase.from('news').select('*').order('date', { ascending: false })).data
  await simulateLatency()
  return [...NEWS].sort((a, b) => b.date.localeCompare(a.date))
}

export async function fetchChatMessages(): Promise<ChatMessage[]> {
  // Supabase: subscribe to a realtime channel instead
  await simulateLatency()
  return CHAT_SEED
}

export async function submitEmail(email: string): Promise<{ ok: boolean }> {
  // Supabase: await supabase.from('subscribers').insert({ email })
  await simulateLatency(450)
  console.info('[demo mode] captured email locally:', email)
  return { ok: true }
}
