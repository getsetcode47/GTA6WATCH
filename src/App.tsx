import { lazy, Suspense, useCallback, useState } from 'react'
import Atmosphere from './components/Atmosphere'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import JsonLd from './components/JsonLd'
import { NeonDivider } from './components/Section'
import { AmbientAudioToggle, EmailPopup } from './components/FloatingUI'
import { useDocumentTitleCountdown } from './hooks/useDocumentTitleCountdown'
import { LAUNCH_DATE } from './data/facts'

// Everything below the fold is code-split
const PreOrder = lazy(() => import('./sections/PreOrder'))
const Livestream = lazy(() => import('./sections/Livestream'))
const News = lazy(() => import('./sections/News'))
const Story = lazy(() => import('./sections/Story'))
const Characters = lazy(() => import('./sections/Characters'))
const Missions = lazy(() => import('./sections/Missions'))
const Community = lazy(() => import('./sections/Community'))
const Gallery = lazy(() => import('./sections/Gallery'))
const Screenshots = lazy(() => import('./sections/Screenshots'))
const FAQ = lazy(() => import('./sections/FAQ'))
const CTA = lazy(() => import('./sections/CTA'))
const Footer = lazy(() => import('./sections/Footer'))

function SectionFallback() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6" aria-hidden>
      <div className="glass h-64 animate-pulse" />
    </div>
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [popupOpen, setPopupOpen] = useState(false)

  const openPopup = useCallback(() => setPopupOpen(true), [])
  const closePopup = useCallback(() => setPopupOpen(false), [])
  const onBootDone = useCallback(() => setBooted(true), [])

  useDocumentTitleCountdown(LAUNCH_DATE)

  return (
    <>
      <JsonLd />
      <LoadingScreen onDone={onBootDone} />
      <Atmosphere />
      <Navbar onNotify={openPopup} />

      <main>
        <Hero />
        <NeonDivider />
        <Suspense fallback={<SectionFallback />}>
          <PreOrder onNotify={openPopup} />
          <NeonDivider />
          <Livestream />
          <NeonDivider />
          <News />
          <NeonDivider />
          <Story />
          <NeonDivider />
          <Characters />
          <NeonDivider />
          <Missions />
          <NeonDivider />
          <Community />
          <NeonDivider />
          <Gallery />
          <NeonDivider />
          <Screenshots />
          <NeonDivider />
          <FAQ />
          <NeonDivider />
          <CTA onNotify={openPopup} />
          <Footer />
        </Suspense>
      </main>

      <AmbientAudioToggle />
      <EmailPopup open={popupOpen} onClose={closePopup} autoTrigger={booted} />
    </>
  )
}
