import { useRef } from 'react'
import { useLang } from '../i18n'
import { gsap, useGsap } from '../lib/motion'
import { site } from '../data/site'
import { Logo } from './Logo'

// The morning ends: the sun sets behind a giant wordmark.
export function Footer() {
  const root = useRef()
  const { t } = useLang()

  useGsap(
    root,
    () => {
      gsap.fromTo(
        '.footer-logo',
        { clipPath: 'inset(0% 100% 0% 0%)', yPercent: 25 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          yPercent: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'bottom bottom', scrub: 0.6 },
        },
      )
      gsap.fromTo(
        '.footer-sun',
        { yPercent: -40 },
        { yPercent: 50, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } },
      )
    },
    [t],
  )

  return (
    <footer className="footer" ref={root}>
      <div className="footer-top">
        <p className="footer-sign">{t.footer.sign}</p>
        <a href={site.instagram} target="_blank" rel="noreferrer" dir="ltr">
          Instagram ↗
        </a>
      </div>
      <div className="footer-stage">
        <div className="footer-sun" />
        <div className="footer-mark">
          <Logo className="footer-logo" title="Hera" />
        </div>
      </div>
      <div className="footer-bottom">
        <span>{t.footer.tagline}</span>
        <span>
          © {new Date().getFullYear()} Hera Brunch · {t.footer.rights}
        </span>
      </div>
    </footer>
  )
}
