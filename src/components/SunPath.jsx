import { useEffect, useRef } from 'react'
import { useLang } from '../i18n'
import { ScrollTrigger, scrollTo } from '../lib/motion'

// A small sun that crosses its arc as you scroll: sunrise at the top of the page,
// sunset at the footer. Clicking it goes back to the top.
export function SunPath() {
  const link = useRef()
  const sun = useRef()
  const trail = useRef()
  const { t } = useLang()

  useEffect(() => {
    const place = (p) => {
      const a = Math.PI * (1 - p)
      sun.current.setAttribute('cx', (32 + 26 * Math.cos(a)).toFixed(2))
      sun.current.setAttribute('cy', (30 - 26 * Math.sin(a)).toFixed(2))
      trail.current.style.strokeDashoffset = String(1 - p)
    }
    place(0)
    const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => place(self.progress) })
    // It has set once the footer comes up, so it steps aside there.
    const set = ScrollTrigger.create({
      trigger: '.footer',
      start: 'top 90%',
      toggleClass: { targets: link.current, className: 'is-set' },
    })
    return () => {
      st.kill()
      set.kill()
    }
  }, [])

  return (
    <a
      href="#top"
      className="sunpath"
      ref={link}
      aria-label={t.nav.top}
      onClick={(e) => {
        e.preventDefault()
        scrollTo('#top')
      }}
    >
      <svg viewBox="0 0 64 36" aria-hidden="true">
        <path className="sunpath-track" d="M6 30A26 26 0 0 1 58 30" pathLength="1" />
        <path className="sunpath-trail" d="M6 30A26 26 0 0 1 58 30" pathLength="1" ref={trail} />
        <path className="sunpath-horizon" d="M2 30.5h60" />
        <circle className="sunpath-sun" r="4.5" cx="6" cy="30" ref={sun} />
      </svg>
    </a>
  )
}
