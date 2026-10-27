import { useRef } from 'react'
import { useLang } from '../i18n'
import { gsap, reducedMotion, scrollTo, useGsap, words } from '../lib/motion'
import { site } from '../data/site'
import { Roll } from './Bits'
import { Steam } from './Steam'

export function Hero({ ready }) {
  const root = useRef()
  const { t } = useLang()

  useGsap(
    root,
    () => {
      if (!ready) return
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-title .w', { yPercent: 110, rotate: 4, duration: 1.4, stagger: 0.08 })
        .from('.hero-kicker, .hero-sub, .hero-actions', { y: 24, opacity: 0, duration: 1.1, stagger: 0.1 }, 0.4)
        .fromTo('.hero-arch', { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0px 0px)' }, { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0px 0px)', duration: 1.6 }, 0)
        .from('.hero-sun', { yPercent: 80, duration: 2.4, ease: 'power2.out' }, 0.1)
        .from('.hero-cup', { y: 60, opacity: 0, duration: 1.4 }, 0.5)

      // The sun keeps rising as you scroll away from the hero.
      gsap.to('.hero-sun', {
        yPercent: -55,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero-arch-inner', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    [ready, t],
  )

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-copy">
        <p className="hero-kicker label">{t.hero.kicker}</p>
        <h1 className="hero-title">
          {t.hero.title.map((line, i) => (
            <span key={i} className="line">
              {words(line)}
            </span>
          ))}
        </h1>
        <p className="hero-sub">{t.hero.sub}</p>
        <div className="hero-actions">
          <a
            className="btn"
            href="#menu"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#menu')
            }}
          >
            <Roll>{t.hero.cta}</Roll>
            <span className="btn-arrow" aria-hidden="true">
              ↘
            </span>
          </a>
          <span className="hero-scroll">{t.hero.scroll}</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-arch">
          <div className="hero-arch-inner">
            {site.media.heroVideo ? (
              <video className="hero-video" src={site.media.heroVideo} poster={site.media.heroPoster || undefined} autoPlay={!reducedMotion} muted loop playsInline />
            ) : (
              <>
                <div className="hero-sky" />
                <div className="hero-sun" />
                <svg className="hero-cup" viewBox="0 0 320 220" aria-hidden="true">
                  <ellipse cx="160" cy="196" rx="150" ry="20" fill="rgba(43,29,20,.12)" />
                  <ellipse cx="160" cy="188" rx="140" ry="22" fill="#FFFDF6" />
                  <path d="M76 70h168l-12 88c-3 20-20 32-40 32h-64c-20 0-37-12-40-32z" fill="#FFFDF6" />
                  <path d="M244 92c34 0 40 50 4 54" stroke="#FFFDF6" strokeWidth="16" fill="none" strokeLinecap="round" />
                  <ellipse cx="160" cy="70" rx="84" ry="16" fill="#5E3A22" />
                  <ellipse cx="160" cy="68" rx="40" ry="7" fill="#E8CDA8" />
                  <path d="M92 120h136" stroke="#C06E4D" strokeWidth="3" opacity=".6" />
                </svg>
              </>
            )}
            {!reducedMotion && <Steam originX={0.5} originY={0.62} />}
          </div>
        </div>
      </div>
    </section>
  )
}
