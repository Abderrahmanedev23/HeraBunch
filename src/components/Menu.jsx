import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { categories, menu } from '../data/menu'
import { gsap, reducedMotion, ScrollTrigger, scrollTo, useGsap } from '../lib/motion'
import { shapeStyle } from '../lib/shapes'
import { Dish } from './Dish'
import { Label } from './Bits'

const ORDER = ['all', ...categories]

// Offset colours behind the photos, in turn.
const TINTS = ['var(--terracotta)', 'var(--honey)', 'var(--mint)', '#e9b48a']

// Shows a card in its final state straight away (used when switching categories).
function settle(card) {
  if (card.dataset.shown) return
  card.dataset.shown = '1'
  gsap.set(card.querySelector('.dish-frame'), { scale: 1, rotate: 0, opacity: 1 })
  gsap.set(card.querySelector('.dish-img'), { scale: 1 })
  gsap.set(card.querySelector('.dish-body'), { y: 0, opacity: 1 })
}

const rtl = () => document.documentElement.dir === 'rtl'

export function Menu() {
  const root = useRef()
  const grid = useRef()
  const strip = useRef()
  const tabs = useRef()
  const thumb = useRef()
  const { t } = useLang()
  const [filter, setFilter] = useState('all')
  const current = useRef(filter)
  current.current = filter
  const incoming = useRef(0)
  const outTween = useRef(null)
  const heightTween = useRef(null)

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

      // Each shape blooms open around its photo as the card scrolls into view.
      const cards = gsap.utils.toArray('.dish')
      cards.forEach((card) => delete card.dataset.shown)
      gsap.set('.dish-frame', { scale: 0.6, rotate: -18, opacity: 0 })
      gsap.set('.dish-img', { scale: 1.35 })
      gsap.set('.dish-body', { y: 24, opacity: 0 })
      ScrollTrigger.batch(cards, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => {
          const fresh = batch.filter((card) => !card.dataset.shown)
          if (!fresh.length) return
          fresh.forEach((card) => (card.dataset.shown = '1'))
          const pick = (sel) => fresh.map((card) => card.querySelector(sel))
          gsap.to(pick('.dish-frame'), { scale: 1, rotate: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.5)', stagger: 0.09 })
          gsap.to(pick('.dish-img'), { scale: 1, duration: 1.8, ease: 'expo.out', stagger: 0.09 })
          gsap.to(pick('.dish-body'), { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.09, delay: 0.2 })
        },
      })

      // Photos drift slightly inside their frames while scrolling.
      gsap.utils.toArray('.dish-img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: img.closest('.dish'), start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    [t],
  )

  // The dark thumb glides under the active tab, which also scrolls into view on small screens.
  const placeThumb = (instant) => {
    const tab = tabs.current?.querySelector(`[data-cat="${current.current}"]`)
    if (!tab) return
    gsap.to(thumb.current, { x: tab.offsetLeft, width: tab.offsetWidth, duration: instant || reducedMotion ? 0 : 0.55, ease: 'expo.out' })
    const s = strip.current
    if (s.scrollWidth > s.clientWidth) {
      s.scrollTo({ left: tab.offsetLeft - (s.clientWidth - tab.offsetWidth) / 2, behavior: instant || reducedMotion ? 'auto' : 'smooth' })
    }
  }

  useLayoutEffect(() => placeThumb(false), [filter])

  // Tab widths change with fonts, language and screen size.
  useEffect(() => {
    const ro = new ResizeObserver(() => placeThumb(true))
    ro.observe(tabs.current)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Slides the current dishes out towards the side you're leaving, then swaps the category.
  const choose = (c) => {
    const g = grid.current
    const visible = () => [...g.querySelectorAll('.dish:not(.is-out)')]
    if (c === current.current) {
      // Changed your mind mid-swap: bring the dishes back.
      if (outTween.current) {
        outTween.current.kill()
        outTween.current = null
        gsap.to(visible(), { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out', overwrite: true })
        g.style.height = ''
        g.classList.remove('is-swapping')
      }
      return
    }
    if (reducedMotion) {
      setFilter(c)
      return
    }
    const step = Math.sign(ORDER.indexOf(c) - ORDER.indexOf(current.current))
    const side = rtl() ? -1 : 1
    heightTween.current?.kill()
    g.style.height = `${g.offsetHeight}px`
    g.classList.add('is-swapping')
    const cards = visible()
    cards.forEach(settle)
    outTween.current?.kill()
    outTween.current = gsap.to(cards, {
      x: -50 * step * side,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      stagger: 0.02,
      overwrite: true,
      onComplete: () => {
        outTween.current = null
        incoming.current = step
        setFilter(c)
      },
    })
  }

  // The new dishes slide in from the side you're heading to, and the list
  // grows or shrinks to its new height so the next section glides instead of jumping.
  useLayoutEffect(() => {
    const step = incoming.current
    if (!step) return
    incoming.current = 0
    const g = grid.current
    const side = rtl() ? -1 : 1
    const cards = [...g.querySelectorAll('.dish:not(.is-out)')]
    cards.forEach(settle)
    gsap.fromTo(cards, { x: 60 * step * side, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06, overwrite: true })
    gsap.fromTo(
      cards.map((card) => card.querySelector('.dish-frame')),
      { scale: 0.82, rotate: -10 * step * side },
      { scale: 1, rotate: 0, duration: 0.9, ease: 'back.out(1.7)', stagger: 0.06 },
    )
    const from = g.offsetHeight
    g.style.height = 'auto'
    const to = g.offsetHeight
    g.style.height = `${from}px`
    heightTween.current = gsap.to(g, {
      height: to,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        g.style.height = ''
        g.classList.remove('is-swapping')
        ScrollTrigger.refresh()
      },
    })
    // If the start of the list has scrolled away, bring it back under the tabs.
    if (g.getBoundingClientRect().top < 0) scrollTo('#menu-panel', -150)
  }, [filter])

  // On touch screens, swiping the dishes sideways moves to the next or previous category.
  useEffect(() => {
    const g = grid.current
    let start = null
    const down = (e) => {
      if (e.pointerType === 'touch') start = { x: e.clientX, y: e.clientY, id: e.pointerId }
    }
    const up = (e) => {
      if (!start || e.pointerId !== start.id) return
      const dx = e.clientX - start.x
      const dy = e.clientY - start.y
      start = null
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return
      const forward = dx < 0 !== rtl()
      const i = ORDER.indexOf(current.current) + (forward ? 1 : -1)
      if (i >= 0 && i < ORDER.length) choose(ORDER[i])
    }
    const cancel = () => (start = null)
    g.addEventListener('pointerdown', down)
    g.addEventListener('pointerup', up)
    g.addEventListener('pointercancel', cancel)
    return () => {
      g.removeEventListener('pointerdown', down)
      g.removeEventListener('pointerup', up)
      g.removeEventListener('pointercancel', cancel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Arrow keys, Home and End move between tabs.
  const onKey = (e) => {
    const keys = { ArrowRight: rtl() ? -1 : 1, ArrowLeft: rtl() ? 1 : -1 }
    let i = ORDER.indexOf(current.current)
    if (e.key in keys) i = (i + keys[e.key] + ORDER.length) % ORDER.length
    else if (e.key === 'Home') i = 0
    else if (e.key === 'End') i = ORDER.length - 1
    else return
    e.preventDefault()
    choose(ORDER[i])
    tabs.current.querySelector(`[data-cat="${ORDER[i]}"]`).focus()
  }

  const count = (c) => (c === 'all' ? menu.length : menu.filter((m) => m.category === c).length)
  let shown = 0

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
      </div>

      <div className="tabs-bar">
        <div className="tabs-strip" ref={strip}>
          <div className="tabs" role="tablist" aria-label={t.menu.label} ref={tabs} onKeyDown={onKey}>
            <span className="tabs-thumb" ref={thumb} aria-hidden="true" />
            {ORDER.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                id={`tab-${c}`}
                data-cat={c}
                aria-selected={filter === c}
                aria-controls="menu-panel"
                tabIndex={filter === c ? 0 : -1}
                className={`tab ${filter === c ? 'is-active' : ''}`}
                onClick={() => choose(c)}
              >
                {c === 'all' ? t.menu.all : t.menu.cats[c]}
                <sup>{count(c)}</sup>
              </button>
            ))}
          </div>
        </div>
        <p className="swipe-hint" aria-hidden="true">
          <span className="swipe-arrows">←→</span>
          {t.menu.swipe}
        </p>
      </div>

      <div className="dishes" id="menu-panel" role="tabpanel" aria-labelledby={`tab-${filter}`} ref={grid}>
        {menu.map((m, i) => {
          const [name, desc] = t.menu.items[m.id]
          const visible = filter === 'all' || m.category === filter
          // Every second visible card sits a little lower, for a staggered rhythm.
          const low = visible && shown++ % 2 === 1
          return (
            <article key={m.id} className={`dish ${visible ? '' : 'is-out'} ${low ? 'is-low' : ''}`}>
              <div className="dish-frame" style={{ '--tint': TINTS[i % TINTS.length] }}>
                <span className="dish-shadow" style={shapeStyle(m.shape)} aria-hidden="true" />
                <div className="dish-photo" style={shapeStyle(m.shape)}>
                  <div className="dish-zoom">
                    {m.photo ? (
                      <img className="dish-img" src={m.photo} alt={name} loading="lazy" width="720" height="900" />
                    ) : (
                      <div className="dish-img dish-illus">
                        <Dish name={m.dish} title={name} />
                      </div>
                    )}
                  </div>
                </div>
                {m.shape === 'msemen' && <span className="dish-fold" aria-hidden="true" />}
                <span className="dish-tag">{t.menu.cats[m.category]}</span>
              </div>
              <div className="dish-body">
                <div className="dish-row">
                  <span className="dish-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="dish-name">{name}</h3>
                  {m.price != null && (
                    <span className="dish-price" dir="ltr">
                      {m.price} DH
                    </span>
                  )}
                </div>
                <p className="dish-desc">{desc}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
