import { useEffect, useState } from 'react'
import { useLang } from './i18n'
import { reducedMotion, ScrollTrigger, startSmoothScroll } from './lib/motion'
import { Loader } from './components/Loader'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MorningWindow } from './components/MorningWindow'
import { Intro } from './components/Intro'
import { Traditions } from './components/Traditions'
import { TileBand } from './components/TileBand'
import { Menu } from './components/Menu'
import { Moments } from './components/Moments'
import { Marquee } from './components/Marquee'
import { Visit } from './components/Visit'
import { Footer } from './components/Footer'
import { Cursor } from './components/Cursor'
import { SunPath } from './components/SunPath'

export default function App() {
  const [ready, setReady] = useState(false)
  const { lang } = useLang()

  useEffect(() => {
    startSmoothScroll()
  }, [])

  // Text length changes with the language, so scroll positions need re-measuring.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [lang])

  // Section labels draw a short line in front of them as they scroll into view.
  useEffect(() => {
    if (reducedMotion) return
    document.documentElement.classList.add('motion')
    const triggers = ScrollTrigger.batch('.label', {
      start: 'top 92%',
      onEnter: (labels) => labels.forEach((el) => el.classList.add('is-in')),
    })
    return () => triggers.forEach((st) => st.kill())
  }, [lang])

  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <Header />
      <main>
        <Hero ready={ready} />
        <MorningWindow />
        <Intro />
        <Traditions />
        <TileBand />
        <Menu />
        <Moments />
        <Marquee />
        <Visit />
      </main>
      <Footer />
      <SunPath />
      <div className="grain" aria-hidden="true" />
      <Cursor />
    </>
  )
}
