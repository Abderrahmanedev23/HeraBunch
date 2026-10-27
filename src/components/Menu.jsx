import { useLayoutEffect, useRef, useState } from 'react'
import { Flip } from 'gsap/Flip'
import { useLang } from '../i18n'
import { categories, menu } from '../data/menu'
import { gsap, reducedMotion, ScrollTrigger, useGsap } from '../lib/motion'
import { shapeStyle } from '../lib/shapes'
import { Dish } from './Dish'
import { Label } from './Bits'

gsap.registerPlugin(Flip)

// Offset colours behind the photos, in turn.
const TINTS = ['var(--terracotta)', 'var(--honey)', 'var(--mint)', '#e9b48a']

// Shows a card in its final state straight away (used before filtering).
function settle(card) {
  if (card.dataset.shown) return
  card.dataset.shown = '1'
  gsap.set(card.querySelector('.dish-frame'), { scale: 1, rotate: 0, opacity: 1 })
  gsap.set(card.querySelector('.dish-img'), { scale: 1 })
  gsap.set(card.querySelector('.dish-body'), { y: 0, opacity: 1 })
}

export function Menu() {
  const root = useRef()
  const flipState = useRef(null)
  const { t } = useLang()
  const [filter, setFilter] = useState('all')

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

  const choose = (c) => {
    if (c === filter) return
    if (!reducedMotion) {
      const cards = root.current.querySelectorAll('.dish')
      cards.forEach(settle)
      flipState.current = Flip.getState(cards)
    }
    setFilter(c)
  }

  // Cards glide to their new places when the filter changes.
  useLayoutEffect(() => {
    const state = flipState.current
    if (!state) return
    flipState.current = null
    Flip.from(state, {
      targets: root.current.querySelectorAll('.dish'),
      duration: 0.75,
      ease: 'power3.inOut',
      absolute: true,
      stagger: 0.025,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    })
  }, [filter])

  const count = (c) => (c === 'all' ? menu.length : menu.filter((m) => m.category === c).length)
  let shown = 0

  return (
    <section className="menu" id="menu" ref={root}>
      <div className="menu-head">
        <div>
          <Label>{t.menu.label}</Label>
          <h2 className="menu-title">
            {t.menu.title.split(' ').map((w, i) => (
              <span key={i} className="line">
                <span className="w">{w}</span>
              </span>
            ))}
          </h2>
        </div>
        <div className="pills" role="group" aria-label={t.menu.label}>
          {['all', ...categories].map((c) => (
            <button key={c} className={`pill ${filter === c ? 'is-active' : ''}`} onClick={() => choose(c)} aria-pressed={filter === c}>
              {c === 'all' ? t.menu.all : t.menu.cats[c]}
              <sup>{count(c)}</sup>
            </button>
          ))}
        </div>
      </div>

      <div className="dishes">
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
