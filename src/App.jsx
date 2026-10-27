import { useEffect, useState } from 'react'
import { useLang } from './i18n'
import { ScrollTrigger, startSmoothScroll } from './lib/motion'
import { Loader } from './components/Loader'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { Traditions } from './components/Traditions'
import { Menu } from './components/Menu'
import { Moments } from './components/Moments'
import { Marquee } from './components/Marquee'
import { Visit } from './components/Visit'
import { Footer } from './components/Footer'
import { Cursor } from './components/Cursor'

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

  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <Header />
      <main>
        <Hero ready={ready} />
        <Intro />
        <Traditions />
        <Menu />
        <Moments />
        <Marquee />
        <Visit />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
      <Cursor />
    </>
  )
}
