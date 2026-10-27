import { useRef } from 'react'
import { useLang } from '../i18n'
import { gsap, useGsap } from '../lib/motion'
import { site } from '../data/site'

// The morning ends: the sun sets behind a giant wordmark.
export function Footer() {
  const root = useRef()
  const { t } = useLang()

  useGsap(
    root,
    () => {
      gsap.from('.footer-mark span', {
        yPercent: 100,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'bottom bottom', scrub: 0.6 },
      })
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
        <p className="footer-mark" aria-label="Hera">
          {[...'Hera'].map((c, i) => (
            <span key={i} aria-hidden="true">
              {c}
            </span>
          ))}
        </p>
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
