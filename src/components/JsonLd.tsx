import { useEffect } from 'react'
import { FAQ } from '../data/faq'

/**
 * Injects FAQPage structured data at runtime from the single FAQ source.
 * Google restricted FAQ *rich results* to gov/health sites in 2026, but AI
 * answer engines (ChatGPT, Gemini, Perplexity, Claude) still read this markup
 * for answer extraction — so it stays worth emitting. The stable entity schema
 * (VideoGame, Organization, WebSite, Event) lives statically in index.html so
 * crawlers see it without running JS.
 */
export default function JsonLd() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = 'faq-jsonld'
    el.textContent = JSON.stringify(data)
    document.head.appendChild(el)
    return () => {
      document.getElementById('faq-jsonld')?.remove()
    }
  }, [])
  return null
}
