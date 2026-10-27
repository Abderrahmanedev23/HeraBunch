import { useRef } from 'react'
import { useLang } from '../i18n'
import { gsap, useGsap } from '../lib/motion'
import { site } from '../data/site'
import { Dish } from './Dish'
import { Label } from './Bits'

// Where each plate lands, in % of the round table.
const moroccan = [
  { dish: 'msemen', x: 30, y: 26, r: -8, s: 1 },
  { dish: 'baghrir', x: 18, y: 54, r: 10, s: 0.95 },
  { dish: 'amlou', x: 32, y: 78, r: 0, s: 0.8 },
  { dish: 'tea', x: 42, y: 50, r: 0, s: 0.6 },
]
const brunch = [
  { dish: 'pancakes', x: 70, y: 26, r: 6, s: 1 },
  { dish: 'benedict', x: 82, y: 54, r: -6, s: 0.95 },
  { dish: 'avocado', x: 68, y: 78, r: 8, s: 0.85 },
  { dish: 'coffee', x: 58, y: 50, r: 0, s: 0.6 },
]

// A round Moroccan mosaic table seen from above: a band of zellige stars
// around a plain plaster top.
function Tabletop() {
  return (
    <svg className="trad-top" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <pattern id="trad-zellige" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#2F6E68" />
          <rect x="1.7" y="1.7" width="2.6" height="2.6" fill="#F4E6D2" />
          <rect x="1.7" y="1.7" width="2.6" height="2.6" fill="#F4E6D2" transform="rotate(45 3 3)" />
          <circle cx="3" cy="3" r="0.6" fill="#C06E4D" />
          <circle r="0.7" fill="#E9B48A" />
          <circle cx="6" r="0.7" fill="#E9B48A" />
          <circle cy="6" r="0.7" fill="#E9B48A" />
          <circle cx="6" cy="6" r="0.7" fill="#E9B48A" />
        </pattern>
        <radialGradient id="trad-plaster">
          <stop offset="0" stopColor="#F7E9D3" />
          <stop offset="0.75" stopColor="#EFDBBD" />
          <stop offset="1" stopColor="#E4C8A2" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="#9C5236" />
      <circle cx="50" cy="50" r="48.6" fill="url(#trad-zellige)" />
      <circle cx="50" cy="50" r="41.6" fill="#C06E4D" />
      <circle cx="50" cy="50" r="40.8" fill="url(#trad-plaster)" />
    </svg>
  )
}

// Wrought-iron base. Two of these cross under the table to make four legs. They hang
// below the tabletop in 3D, so they show while the camera is low and disappear under
// the table once it looks straight down.
function Base({ className }) {
  return (
    <div className={`trad-base ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 140">
        <g fill="none" stroke="#3A2A22" strokeWidth="4" strokeLinecap="round">
          <path d="M50 0V112" />
          <path d="M28 4C34 18 44 22 50 22S66 18 72 4" />
          <path d="M50 34C38 44 38 60 50 66C62 60 62 44 50 34Z" />
          <path d="M50 112C50 126 34 132 18 136M50 112C50 126 66 132 82 136" />
        </g>
        <circle cx="18" cy="136" r="4" fill="#3A2A22" />
        <circle cx="82" cy="136" r="4" fill="#3A2A22" />
      </svg>
    </div>
  )
}

export function Traditions() {
  const root = useRef()
  const { t } = useLang()

  useGsap(
    root,
    () => {
      gsap.set('.trad-plate', { z: 2 })
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=200%', scrub: 0.8, pin: true },
      })
      // The camera starts low, at the table's side, and rises until it looks straight down,
      // circling a little as it goes (the tabletop turns in its own plane and stays level).
      tl.fromTo(
        '.trad-ring',
        { rotationX: 62, scale: 0.86, yPercent: -10 },
        { rotationX: 0, scale: 1, yPercent: 0, duration: 1.6, ease: 'power2.inOut' },
        0.35,
      )
        .fromTo('.trad-spin', { rotation: -24 }, { rotation: 0, duration: 1.6, ease: 'power2.inOut' }, 0.35)
        // Plates are served from both sides while the camera moves.
        .from('.trad-plate.from-a', { xPercent: -420, yPercent: 40, rotate: -40, stagger: 0.12, duration: 1.2 }, 0)
        .from('.trad-plate.from-b', { xPercent: 420, yPercent: 40, rotate: 40, stagger: 0.12, duration: 1.2 }, 0)
        .from('.trad-title .line-2', { yPercent: 110, duration: 0.8 }, 1.4)
        .from('.trad-key', { opacity: 0, y: 16, stagger: 0.15, duration: 0.5 }, 1.5)
        .from('.trad-body', { opacity: 0, y: 20, duration: 0.6 }, 1.7)
    },
    [t],
  )

  const plate = (p, side, i) => (
    <div
      key={p.dish}
      className={`trad-plate from-${side}`}
      style={{ left: `${p.x}%`, top: `${p.y}%`, '--s': p.s, '--r': `${p.r}deg`, zIndex: 10 - i }}
    >
      {site.media.table?.[p.dish] ? (
        <div className="trad-photo">
          <img src={site.media.table[p.dish]} alt={t.menu.items[p.dish][0]} loading="lazy" width="420" height="420" />
        </div>
      ) : (
        <Dish name={p.dish} title={t.menu.items[p.dish][0]} />
      )}
    </div>
  )

  return (
    <section className="trad" id="story" ref={root}>
      <div className="trad-head">
        <Label>{t.trad.label}</Label>
        <h2 className="trad-title">
          <span className="line">
            <span className="line-1">{t.trad.title[0]}</span>
          </span>
          <span className="line">
            <span className="line-2">{t.trad.title[1]}</span>
          </span>
        </h2>
      </div>
      <div className="trad-stage">
        <div className="trad-scene">
          <div className="trad-ring">
            <div className="trad-floor" aria-hidden="true" />
            <Base className="trad-base-a" />
            <Base className="trad-base-b" />
            <div className="trad-spin">
              <div className="trad-edge" aria-hidden="true" />
              <div className="trad-edge trad-edge-2" aria-hidden="true" />
              <Tabletop />
              {moroccan.map((p, i) => plate(p, 'a', i))}
              {brunch.map((p, i) => plate(p, 'b', i))}
            </div>
          </div>
        </div>
      </div>
      <div className="trad-legend">
        <p className="trad-key trad-key-a">
          <i aria-hidden="true" />
          <b>{t.menu.cats.moroccan}</b>
          <span>{t.trad.left}</span>
        </p>
        <p className="trad-key trad-key-b">
          <i aria-hidden="true" />
          <b>{t.trad.brunch}</b>
          <span>{t.trad.right}</span>
        </p>
      </div>
      <p className="trad-body">{t.trad.body}</p>
    </section>
  )
}
