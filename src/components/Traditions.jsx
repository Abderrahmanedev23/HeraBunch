import { useRef } from 'react'
import { useLang } from '../i18n'
import { gsap, useGsap } from '../lib/motion'
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

export function Traditions() {
  const root = useRef()
  const { t } = useLang()

  useGsap(
    root,
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=160%', scrub: 0.8, pin: true },
      })
      tl.from('.trad-table', { scale: 0.6, opacity: 0, duration: 1 }, 0)
        .from('.trad-plate.from-a', { xPercent: -420, yPercent: 40, rotate: -40, stagger: 0.12, duration: 1.4 }, 0.1)
        .from('.trad-plate.from-b', { xPercent: 420, yPercent: 40, rotate: 40, stagger: 0.12, duration: 1.4 }, 0.1)
        .from('.trad-side', { opacity: 0, y: 20, stagger: 0.2, duration: 0.6 }, 0.2)
        .from('.trad-title .line-2', { yPercent: 110, duration: 0.8 }, 1.3)
        .from('.trad-body', { opacity: 0, y: 20, duration: 0.6 }, 1.6)
    },
    [t],
  )

  const plate = (p, side, i) => (
    <div
      key={p.dish}
      className={`trad-plate from-${side}`}
      style={{ left: `${p.x}%`, top: `${p.y}%`, '--s': p.s, '--r': `${p.r}deg`, zIndex: 10 - i }}
    >
      <Dish name={p.dish} title={t.menu.items[p.dish][0]} />
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
        <p className="trad-side trad-side-a">{t.trad.left}</p>
        <p className="trad-side trad-side-b">{t.trad.right}</p>
        <div className="trad-ring">
          <div className="trad-table" />
          {moroccan.map((p, i) => plate(p, 'a', i))}
          {brunch.map((p, i) => plate(p, 'b', i))}
        </div>
      </div>
      <p className="trad-body">{t.trad.body}</p>
    </section>
  )
}
