import { useRef } from 'react'
import { useLang } from '../i18n'
import { gsap, reducedMotion, useGsap } from '../lib/motion'
import { Dust } from './Dust'
import { Steam } from './Steam'

// Crenellated kasbah wall along the horizon.
const wall = (() => {
  let d = 'M-4 330V300'
  for (let x = -4; x < 150; x += 14) d += 'v-7h7v7h7'
  return `${d}V330Z`
})()

// Rabat at sunrise through the window: the kasbah wall, Hassan Tower,
// the green roof of the mausoleum, palms and the sea.
function View() {
  return (
    <svg className="win-view" viewBox="0 0 300 450" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="win-dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5E6A99" />
          <stop offset=".5" stopColor="#D98E8A" />
          <stop offset=".74" stopColor="#F2B987" />
        </linearGradient>
        <linearGradient id="win-morning" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8EBBE0" />
          <stop offset=".55" stopColor="#F3DCC0" />
          <stop offset=".74" stopColor="#FBEAD0" />
        </linearGradient>
        <radialGradient id="win-sun-core">
          <stop offset="0" stopColor="#FFF6D6" />
          <stop offset=".65" stopColor="#FFD27A" />
          <stop offset="1" stopColor="#F5A94E" />
        </radialGradient>
        <radialGradient id="win-sun-glow">
          <stop offset="0" stopColor="#FFE2A0" stopOpacity=".9" />
          <stop offset="1" stopColor="#FFE2A0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="win-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B7A3A8" />
          <stop offset="1" stopColor="#7F95A8" />
        </linearGradient>
      </defs>
      <rect width="300" height="450" fill="url(#win-dawn)" />
      <rect className="win-day" width="300" height="450" fill="url(#win-morning)" />
      <g className="win-clouds" fill="#fff" opacity=".55">
        <ellipse cx="70" cy="112" rx="34" ry="9" />
        <ellipse cx="88" cy="104" rx="20" ry="9" />
        <ellipse cx="226" cy="84" rx="28" ry="7" />
        <ellipse cx="240" cy="78" rx="16" ry="7" />
      </g>
      <g className="win-sun">
        <circle cx="150" cy="262" r="96" fill="url(#win-sun-glow)" />
        <circle cx="150" cy="262" r="34" fill="url(#win-sun-core)" />
      </g>
      <g className="win-birds" fill="none" stroke="#4A3240" strokeWidth="1.6" strokeLinecap="round">
        <path d="M58 150q4-4 8 0q4-4 8 0" />
        <path d="M80 138q3-3 6 0q3-3 6 0" />
        <path d="M96 158q3-3 6 0q3-3 6 0" />
      </g>
      <rect y="330" width="300" height="120" fill="url(#win-sea)" />
      <rect x="138" y="332" width="24" height="110" fill="#FFE2A6" opacity=".45" />
      <path d="M20 352h40M190 362h60M70 382h50M210 398h40M30 414h36M120 428h60" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity=".35" />
      <g fill="#7E5F66">
        <rect x="12" y="288" width="26" height="14" />
        <rect x="44" y="282" width="20" height="20" />
        <rect x="92" y="286" width="30" height="16" />
        <rect x="126" y="280" width="18" height="22" />
      </g>
      <g fill="#5A3F4A">
        <path d={wall} />
        <rect x="196" y="186" width="36" height="144" />
        <rect x="238" y="306" width="30" height="24" />
      </g>
      <path d="M234 306l19-14 19 14z" fill="#3E7A5E" />
      <path d="M62 330v-14a8 8 0 0 1 16 0v14z" fill="#3E2A35" />
      <g fill="#8C6B70">
        <path d="M204 226v-8a4 4 0 0 1 8 0v8z" />
        <path d="M216 264v-8a4 4 0 0 1 8 0v8z" />
        <path d="M204 302v-8a4 4 0 0 1 8 0v8z" />
      </g>
      <g fill="none" stroke="#5A3F4A" strokeLinecap="round">
        <path d="M166 330c2-24 4-48 8-68" strokeWidth="4" />
        <path d="M174 262c-10-6-22-4-30 4M174 262c-6-10-4-20 2-26M174 262c8-8 20-8 28 0M174 262c10-2 18 6 20 14M174 262c-8 2-16 10-18 18" strokeWidth="3" />
        <path d="M288 330c-1-20-3-38-7-56" strokeWidth="4" />
        <path d="M281 274c-10-6-22-4-30 4M281 274c-4-10 0-20 6-24M281 274c8-8 20-6 26 2M281 274c-8 2-14 10-16 18" strokeWidth="3" />
      </g>
    </svg>
  )
}

// Pinned scene between the hero and the intro: the shutters open onto Rabat at sunrise,
// light pours into the room, then the view flies through the window into the next section.
export function MorningWindow() {
  const root = useRef()
  const { t } = useLang()

  useGsap(
    root,
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=160%', scrub: 0.6, pin: true },
      })
      tl.to('.win-fade', { opacity: 0, duration: 0.3 }, 0)
        .fromTo('.win-shutter-l', { rotateY: 0 }, { rotateY: -112, duration: 1.2, ease: 'power2.inOut' }, 0.3)
        .fromTo('.win-shutter-r', { rotateY: 0 }, { rotateY: 112, duration: 1.2, ease: 'power2.inOut' }, 0.3)
        .fromTo('.win-dark', { opacity: 0.62 }, { opacity: 0, duration: 1.3 }, 0.4)
        .fromTo('.win-sun', { y: 110 }, { y: 0, duration: 1.8 }, 0.2)
        .fromTo('.win-day', { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0.7)
        .fromTo('.win-clouds', { x: -20 }, { x: 30, duration: 3 }, 0)
        .fromTo('.win-birds', { x: -60, y: 20 }, { x: 160, y: -40, duration: 2.4 }, 0.4)
        .fromTo('.win-rays', { opacity: 0 }, { opacity: 1, duration: 1 }, 0.9)
        .fromTo('.win-dust', { opacity: 0 }, { opacity: 1, duration: 1 }, 1)
        .fromTo('.win-line-a', { opacity: 1, y: 0 }, { opacity: 0, y: -24, duration: 0.4 }, 0.7)
        .fromTo('.win-line-b', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 1)
        .to('.win-caption, .win-rays, .win-dust, .win-sill-things', { opacity: 0, duration: 0.35 }, 1.75)
        .fromTo('.win-stage', { scale: 1 }, { scale: 7, duration: 1.1, ease: 'power2.in' }, 1.75)
        .fromTo('.win-flood', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.45)
    },
    [t],
  )

  return (
    <section className="win" ref={root} aria-label={t.window.b}>
      <div className="win-stage">
        <div className="win-frame" />
        <div className="win-opening">
          <View />
        </div>
        <div className="win-shutters" aria-hidden="true">
          <div className="win-shutter win-shutter-l">
            <i />
          </div>
          <div className="win-shutter win-shutter-r">
            <i />
          </div>
        </div>
        <div className="win-sill" />
        <div className="win-sill-things" aria-hidden="true">
          <svg className="win-glass" viewBox="0 0 30 44">
            <path d="M4 8h22l-3 32H7z" fill="#B5651D" opacity=".9" />
            <path d="M4 8h22l-3 32H7z" fill="none" stroke="#7A4A2A" strokeWidth="1.2" />
            <path d="M6 16h18" stroke="#D9B65A" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M12 6c2-4 6-5 8-2-2 2-5 3-8 2z" fill="#3E7A5E" />
          </svg>
          <div className="win-cupwrap">
            {!reducedMotion && (
              <div className="win-steam">
                <Steam originX={0.5} originY={0.96} scale={0.35} />
              </div>
            )}
            <svg className="win-cup" viewBox="0 0 44 34">
              <path d="M4 8h28v12c0 7-5 12-12 12h-4C9 32 4 27 4 20z" fill="#FFFDF6" />
              <path d="M32 12c8 0 8 12 0 12" stroke="#FFFDF6" strokeWidth="3.5" fill="none" />
              <ellipse cx="18" cy="8" rx="14" ry="3" fill="#5E3A22" />
            </svg>
          </div>
        </div>
      </div>
      <div className="win-rays" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      {!reducedMotion && <Dust className="win-dust" />}
      <div className="win-dark" aria-hidden="true" />
      <div className="win-fade" aria-hidden="true" />
      <div className="win-caption">
        <p className="win-line win-line-a">{t.window.a}</p>
        <p className="win-line win-line-b">{t.window.b}</p>
      </div>
      <div className="win-flood" aria-hidden="true" />
    </section>
  )
}
