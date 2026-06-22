import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Orbs } from '../components/Atmosphere'
import { Reveal, SectionHeading } from '../components/Section'
import { FAQ as ITEMS } from '../data/faq'

export default function FAQ() {
  const reduced = useReducedMotion()
  // First item open by default so the section reads as real Q&A content.
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Orbs variant="violet-amber" />
      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Straight Answers"
          title={
            <>
              FREQUENTLY <span className="gradient-text">ASKED</span>
            </>
          }
          intro="The questions everyone’s Googling about GTA VI — answered with sourced, current facts. No leaks, no filler."
        />

        <ul className="mt-12 space-y-3">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <li className={`glass overflow-hidden transition-colors ${isOpen ? 'border-neon-cyan/30' : ''}`}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="font-body text-base font-bold text-white/90 sm:text-lg">{item.q}</span>
                      <ChevronDown
                        size={20}
                        aria-hidden
                        className={`shrink-0 text-neon-cyan transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </h3>
                  {/* Answer text stays in the DOM (crawlers + AI read it); the
                      accordion only animates its visible height. */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-white/60 sm:px-6 sm:pb-6 sm:text-[15px]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Reveal>
            )
          })}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm text-white/40">
            Still curious? The{' '}
            <a href="#intel" className="text-neon-cyan underline-offset-4 hover:underline">
              Latest Intel
            </a>{' '}
            feed tracks every confirmed beat on the road to launch.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
