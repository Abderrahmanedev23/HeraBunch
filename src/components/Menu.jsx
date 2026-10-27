import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { categories, menu } from '../data/menu'
import { finePointer, gsap, reducedMotion, ScrollTrigger, useGsap } from '../lib/motion'
import { Dish } from './Dish'
import { Label } from './Bits'

export function Menu() {
  const root = useRef()
  const preview = useRef()
  const { t } = useLang()
  const [filter, setFilter] = useState('all')
  const [hover, setHover] = useState(null)
  const items = filter === 'all' ? menu : menu.filter((m) => m.category === filter)

  useGsap(
    root,
    () => {
      gsap.from('.menu-title .w', {
        yPercent: 110,
        stagger: 0.05,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.menu-title', start: 'top 85%' },
      })
      // Rows rise in as they scroll into view.
      gsap.set('.menu-row', { y: 40, opacity: 0 })
      ScrollTrigger.batch('.menu-row', {
        start: 'top 92%',
        once: true,
        onEnter: (rows) => gsap.to(rows, { y: 0, opacity: 1, stagger: 0.06, duration: 0.8, ease: 'power3.out', overwrite: true }),
      })
    },
    [t],
  )

  // Rows rise in again whenever the filter changes.
  const shownFilter = useRef(filter)
  useEffect(() => {
    if (shownFilter.current === filter) return
    shownFilter.current = filter
    if (reducedMotion) return
    gsap.fromTo(
      root.current.querySelectorAll('.menu-row'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 0.7, ease: 'power3.out', overwrite: true },
    )
  }, [filter])

  // The dish preview follows the pointer.
  useEffect(() => {
    if (!finePointer) return
    const el = preview.current
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
    const move = (e) => {
      x(e.clientX)
      y(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  const count = (c) => (c === 'all' ? menu.length : menu.filter((m) => m.category === c).length)

  return (
    <section className="menu" id="menu" ref={root}>
      <div className="menu-head">
        <Label>{t.menu.label}</Label>
        <h2 className="menu-title">
          {t.menu.title.split(' ').map((w, i) => (
            <span key={i} className="line">
              <span className="w">{w}</span>
            </span>
          ))}
        </h2>
        <div className="pills" role="group" aria-label={t.menu.label}>
          {['all', ...categories].map((c) => (
            <button key={c} className={`pill ${filter === c ? 'is-active' : ''}`} onClick={() => setFilter(c)} aria-pressed={filter === c}>
              {c === 'all' ? t.menu.all : t.menu.cats[c]}
              <sup>{count(c)}</sup>
            </button>
          ))}
        </div>
      </div>

      <ul className="menu-list" onPointerLeave={() => setHover(null)}>
        {items.map((m, i) => {
          const [name, desc] = t.menu.items[m.id]
          return (
            <li key={m.id} className="menu-row" onPointerEnter={() => setHover(m)}>
              <span className="menu-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="menu-name">{name}</span>
              <span className="menu-desc">{desc}</span>
              {m.price != null ? (
                <span className="menu-end is-price" dir="ltr">
                  {m.price} DH
                </span>
              ) : (
                <span className="menu-end">{t.menu.cats[m.category]}</span>
              )}
              <Dish name={m.dish} className="menu-thumb" />
            </li>
          )
        })}
      </ul>

      {finePointer && (
        <div className={`menu-preview ${hover ? 'is-on' : ''}`} ref={preview} aria-hidden="true">
          <div className="menu-preview-inner">
            {menu.map((m) => (
              <Dish key={m.id} name={m.dish} className={hover?.id === m.id ? 'is-current' : ''} />
            ))}
            <span className="menu-preview-label">{hover ? t.menu.items[hover.id][0] : ''}</span>
          </div>
        </div>
      )}
    </section>
  )
}
