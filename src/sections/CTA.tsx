import { Bell, CalendarClock, CalendarPlus } from 'lucide-react'
import { Orbs } from '../components/Atmosphere'
import { Reveal } from '../components/Section'
import CountdownTimer from '../components/CountdownTimer'
import ShareBar from '../components/ShareBar'

/** .ics downloads so "Add to calendar" works with zero backend. */
const ics = (uid: string, date: string, summary: string, description: string) =>
  encodeURIComponent(
    [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//gtavi.watch//reminders//EN',
      'BEGIN:VEVENT',
      `UID:${uid}@gtavi.watch`,
      `DTSTART;VALUE=DATE:${date}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n'),
  )

const LAUNCH_ICS = ics(
  'gta-vi-launch',
  '20261119',
  'Grand Theft Auto VI — Launch Day',
  'GTA VI launches on PS5 and Xbox Series X|S. Reminder by gtavi.watch (unofficial fan project).',
)
const PREORDER_ICS = ics(
  'gta-vi-preorder',
  '20260625',
  'Grand Theft Auto VI — Pre-Orders Open',
  'GTA VI pre-orders go live on digital storefronts and select retailers. Reminder by gtavi.watch (unofficial fan project).',
)

export default function CTA({ onNotify }: { onNotify: () => void }) {
  return (
    <section className="scanlines relative overflow-hidden px-4 py-24 sm:px-6 sm:py-36">
      <Orbs variant="pink-violet" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(255,45,123,0.14), transparent)' }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="eyebrow">Final Boarding Call</p>
          <h2 className="mt-4 font-display leading-[0.9] tracking-wide" style={{ fontSize: 'clamp(3rem,11vw,7.5rem)' }}>
            <span className="block text-white">BE THERE</span>
            <span className="gradient-text-shimmer block">NOVEMBER 19</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
            Three years of waiting. Two delays. One date Take-Two swears is final — and pre-orders open June 25. When
            Vice City opens, you don’t want to be the one finding out from the group chat.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-10 max-w-2xl">
          <CountdownTimer />
        </Reveal>

        <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button onClick={onNotify} className="btn-neon-solid">
            <Bell size={14} aria-hidden /> Notify me at launch
          </button>
          <a
            href={`data:text/calendar;charset=utf-8,${PREORDER_ICS}`}
            download="gta-vi-preorder.ics"
            className="btn-neon-ghost"
          >
            <CalendarClock size={14} aria-hidden /> Remind me June 25
          </a>
          <a href={`data:text/calendar;charset=utf-8,${LAUNCH_ICS}`} download="gta-vi-launch.ics" className="btn-neon-ghost">
            <CalendarPlus size={14} aria-hidden /> Add launch day
          </a>
        </Reveal>

        <Reveal delay={0.32} className="mt-12">
          <p className="eyebrow">— Spread the word</p>
          <div className="mt-4">
            <ShareBar />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
