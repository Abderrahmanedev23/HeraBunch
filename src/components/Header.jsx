import { useEffect, useState } from 'react'
import { languages, useLang } from '../i18n'
import { scrollState, scrollTo } from '../lib/motion'
import { site } from '../data/site'
import { Roll, Wordmark } from './Bits'

export function Header() {
  const { t, lang, setLang } = useLang()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)

  // Hide while scrolling down, come back when scrolling up.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 40)
      // Only real movement counts, and never the site's own scrolls,
      // so the header doesn't pop in or out on its own.
      if (!scrollState.auto && Math.abs(y - last) > 3) setHidden(y > 300 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lets sticky bars further down slide up into the header's place.
  useEffect(() => {
    document.documentElement.classList.toggle('header-hidden', hidden)
  }, [hidden])

  const go = (id) => (e) => {
    e.preventDefault()
    scrollTo(id)
  }

  return (
    <header className={`header ${hidden ? 'is-hidden' : ''} ${solid ? 'is-solid' : ''}`}>
      <a href="#top" onClick={go('#top')} className="header-logo">
        <Wordmark />
      </a>
      <nav className="header-nav" aria-label="Main">
        <a href="#menu" onClick={go('#menu')}>
          <Roll>{t.nav.menu}</Roll>
        </a>
        <a href="#story" onClick={go('#story')}>
          <Roll>{t.nav.story}</Roll>
        </a>
        <a href="#visit" onClick={go('#visit')}>
          <Roll>{t.nav.visit}</Roll>
        </a>
      </nav>
      <div className="header-end">
        <div className="lang" role="group" aria-label="Language">
          {languages.map((l) => (
            <button key={l.code} className={l.code === lang ? 'is-active' : ''} onClick={() => setLang(l.code)} aria-pressed={l.code === lang} lang={l.code}>
              {l.label}
            </button>
          ))}
        </div>
        <a className="btn btn-small" href={site.phone ? `tel:${site.phone}` : site.instagram} target="_blank" rel="noreferrer">
          <Roll>{t.nav.book}</Roll>
        </a>
      </div>
    </header>
  )
}
