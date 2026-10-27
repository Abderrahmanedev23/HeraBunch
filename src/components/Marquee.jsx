import { useRef } from 'react'
import { useLang } from '../i18n'
import { gsap, ScrollTrigger, useGsap } from '../lib/motion'

// Looping text band. Scrolling speeds it up and flips its direction.
export function Marquee() {
  const root = useRef()
  const { t, dir } = useLang()
  const row = t.marquee.map((s, i) => (
    <span key={i}>
      {s}
      <i aria-hidden="true">✺</i>
    </span>
  ))

  useGsap(
    root,
    () => {
      const sign = dir === 'rtl' ? 1 : -1
      const loop = gsap.to('.marquee-track', { xPercent: sign * 50, duration: 28, ease: 'none', repeat: -1 })
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity() / 400
          gsap.to(loop, { timeScale: self.direction * (1 + Math.min(Math.abs(v), 4)), duration: 0.3, overwrite: true })
          gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.3 })
        },
      })
    },
    [t, dir],
  )

  return (
    <div className="marquee" ref={root} aria-hidden="true">
      <div className="marquee-track">
        <div className="marquee-row">{row}</div>
        <div className="marquee-row">{row}</div>
      </div>
    </div>
  )
}
