import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#preorder', label: 'Pre-Order' },
  { href: '#live', label: 'Live' },
  { href: '#intel', label: 'Intel' },
  { href: '#story', label: 'Story' },
  { href: '#cast', label: 'Cast' },
  { href: '#missions', label: 'Missions' },
  { href: '#community', label: 'Community' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#screenshots', label: 'Screens' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar({ onNotify }: { onNotify: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-void/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <a href="#top" className="flex items-baseline gap-1.5 font-display text-2xl tracking-wider">
          <span className="gradient-text-shimmer">GTAVI</span>
          <span className="font-mono text-xs text-white/50">.watch</span>
        </a>

        <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-tech text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-neon-cyan"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={onNotify} className="btn-neon-solid hidden !min-h-[40px] !px-5 !py-2 sm:inline-flex">
            <Bell size={13} aria-hidden /> Notify Me
          </button>
          <button
            className="glass flex h-11 w-11 items-center justify-center !rounded-xl lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-white/10 bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-tech text-sm font-semibold uppercase tracking-[0.22em] text-white/70 transition-colors hover:bg-white/5 hover:text-neon-cyan"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setOpen(false)
                    onNotify()
                  }}
                  className="btn-neon-solid mt-2 w-full"
                >
                  <Bell size={14} aria-hidden /> Notify Me
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
