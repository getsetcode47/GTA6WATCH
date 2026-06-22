# GTAVI.watch

A neon-noir **launch countdown hub for Grand Theft Auto VI** — a cinematic,
content-dense single-page app with a live countdown to the **November 19, 2026**
release, a pre-order countdown to **June 25, 2026**, the official trailers, real
sourced news, the announced cast, and all 53 official screenshots.

> ⚠️ **Unofficial fan project.** Not affiliated with, endorsed by, or connected
> to Rockstar Games or Take-Two Interactive. *Grand Theft Auto* and all related
> marks are trademarks of Take-Two Interactive. Trailer footage and stills are
> embedded/used as fan commentary.

---

## ✨ Features

- **Loading screen → fixed navbar → full-viewport hero** with the official GTA VI
  trailers autoplaying (muted, looping) via the YouTube IFrame API, a poster
  fallback, and a trailer-audio toggle.
- **Live countdowns** to both launch (Nov 19) and pre-orders (Jun 25), plus a
  live tab-title countdown.
- **Pre-Order section** with the official cover art and a **"Where to Pre-Order"**
  affiliate-ready comparison module (PlayStation, Xbox, Rockstar, Best Buy,
  GameStop, Amazon + gift-card helpers), an FTC disclosure, and a scam-safety note.
- **Latest Intel** — filterable, sourced news feed with a featured lead story.
- **Story**, **Cast explorer**, **Mission tracker**, **Community chat**,
  **Gallery**, and a filterable **53-shot official Screenshots** gallery with a
  keyboard-navigable lightbox.
- **FAQ** targeting top search queries (+ FAQPage structured data).
- **SEO & PWA**: rich JSON-LD (WebSite / Organization / VideoGame / Event /
  FAQPage), OpenGraph + Twitter cards, sitemap, robots, a crawlable `<noscript>`
  fallback, and an installable web manifest with generated icons.
- **Accessibility & motion**: aria labels, keyboard support, and full
  `prefers-reduced-motion` handling.

## 🛠 Tech stack

- **React 18** + **TypeScript** + **Vite 6**
- **Tailwind CSS** (extended theme — see `tailwind.config.js`)
- **framer-motion** (animation) · **lucide-react** (icons)
- Google Fonts: Bebas Neue, Orbitron, Rajdhani, Space Mono
- Below-the-fold sections are code-split with `React.lazy` + `Suspense`

## 🚀 Getting started

```bash
npm install
npm run dev        # dev server (http://localhost:5173 by default)
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server (HMR) |
| `npm run build` | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

Requires **Node 20** (see `.nvmrc`).

## 📁 Project structure

```
src/
├─ components/      Reusable UI (Navbar, Hero, CountdownTimer, ShareBar,
│                   WhereToPreOrder, AffiliateDisclosure, JsonLd, Atmosphere…)
├─ sections/        Page sections (PreOrder, News, Story, Characters, Missions,
│                   Community, Gallery, Screenshots, FAQ, CTA, Footer)
├─ data/            Static content (facts, news, characters, missions, gallery,
│                   screenshots, retailers, faq, chat)
├─ hooks/           useCountdown, useDocumentTitleCountdown
├─ lib/             api.ts (Supabase-ready data layer), affiliate.ts
└─ types.ts
public/
├─ art/             Official cover art + key art (self-hosted)
├─ screenshots/     53 official screenshots (full ~1600px + thumb ~640px)
└─ icons/           Generated PWA icons
```

## 💰 Monetization config

Outbound store links are UTM-tagged out of the box and become **affiliate links**
the moment you add your IDs — no component changes needed.

- Edit **`src/lib/affiliate.ts`** → paste your Amazon Associates tag and the
  Impact / Rakuten / Partnerize deep-link templates (use `{u}` for the encoded
  destination URL).
- Edit **`src/data/retailers.ts`** → swap the canonical URLs for the exact GTA VI
  product pages once listings go live.
- All commercial links carry `rel="sponsored nofollow noopener noreferrer"`, and
  an FTC disclosure renders wherever affiliate links appear.

## 🔌 Backend (optional)

The app ships in **demo mode** against static data. `src/lib/api.ts` is shaped so
a Supabase backend can drop in later — set `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` and replace the local branches with Supabase queries
(news feed, realtime chat, email capture).

## ☁️ Deploy to AWS Amplify

The repo is Amplify-ready: `amplify.yml` (build spec → publishes `dist/`),
`customHttp.yml` (immutable asset caching + security headers), and `.nvmrc`.

1. Push to GitHub/GitLab/Bitbucket/CodeCommit.
2. Amplify console → **Host web app** → connect the repo + `main` branch.
   Amplify auto-detects `amplify.yml`.
3. Add the SPA rewrite (Hosting → Rewrites and redirects): route everything that
   isn't a static file to `/index.html` as a `200 (Rewrite)`.
4. Optional: set a **custom domain** and any `VITE_*` env vars.

Every push to `main` then rebuilds and redeploys automatically.

## 📰 Data & sources

All facts are researched and sourced (release date, delay history, pre-order
date, cast bios, trailer stats). News items link to their original reporting;
rumors are labeled as rumors. Cover art, key art, and screenshots are © Rockstar
Games, used here as fan commentary.

## 📄 License

Project code is provided for educational/portfolio purposes. All *Grand Theft
Auto* assets, trademarks, and artwork belong to Take-Two Interactive / Rockstar
Games.
