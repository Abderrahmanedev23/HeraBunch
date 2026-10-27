import { useRef } from 'react'
import { useLang } from '../i18n'
import { gsap, useGsap } from '../lib/motion'
import { Label } from './Bits'

// The homepage paragraph fills in word by word as you scroll.
export function Intro() {
  const root = useRef()
  const { t } = useLang()
  const marks = t.intro.highlights.map((h) => h.toLowerCase())

  useGsap(
    root,
    () => {
      gsap.from('.intro-text .w', {
        opacity: 0.14,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '.intro-text', start: 'top 80%', end: 'bottom 55%', scrub: true },
      })
    },
    [t],
  )

  return (
    <section className="intro" ref={root}>
      <Label>{t.intro.label}</Label>
      <p className="intro-text">
        {t.intro.text.split(' ').map((word, i) => {
          const hit = marks.some((m) => word.toLowerCase().includes(m))
          return (
            <span key={i} className={`w ${hit ? 'hl' : ''}`}>
              {word}{' '}
            </span>
          )
        })}
      </p>
    </section>
  )
}
