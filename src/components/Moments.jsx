import { useRef } from 'react'
import { useLang } from '../i18n'
import { gsap, useGsap } from '../lib/motion'
import { site } from '../data/site'
import { Label } from './Bits'
import { AutoVideo } from './AutoVideo'

// Three morning scenes. Each card shows its clip from site.media.moments,
// or falls back to an illustration played by scrolling: pancakes stack up,
// a glass of juice fills, mint tea is poured from height.

function Pancakes() {
  return (
    <svg viewBox="0 0 240 240" className="moment-svg">
      <ellipse cx="120" cy="206" rx="96" ry="18" fill="#FFFDF6" stroke="rgba(43,29,20,.1)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} className="mp-cake">
          <rect x="54" y={176 - i * 20} width="132" height="22" rx="11" fill={i % 2 ? '#DDA04F' : '#E4A956'} />
          <rect x="60" y={178 - i * 20} width="120" height="5" rx="2.5" fill="#F0C57F" opacity=".7" />
        </g>
      ))}
      <rect className="mp-butter" x="106" y="84" width="28" height="14" rx="3" fill="#FFE7A0" />
      <path className="mp-honey" d="M80 98c20 6 60 6 80 0M86 100v34c0 6 8 6 8 0v-20M150 100v52c0 7 9 7 9 0v-30" stroke="#D9962B" strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Juice() {
  return (
    <svg viewBox="0 0 240 240" className="moment-svg">
      <defs>
        <clipPath id="juice-glass">
          <path d="M80 92h80l-8 120H88z" />
        </clipPath>
      </defs>
      <g className="mj-orange">
        <path d="M78 64a42 42 0 0 1 84 0z" fill="#F29A2E" />
        <path d="M86 64a34 34 0 0 1 68 0z" fill="#F7C35B" />
        {[-60, -30, 0, 30, 60].map((a) => (
          <line key={a} x1="120" y1="64" x2={120 + Math.sin((a * Math.PI) / 180) * 30} y2={64 - Math.cos((a * Math.PI) / 180) * 30} stroke="#F29A2E" strokeWidth="2" />
        ))}
      </g>
      {[0, 1, 2].map((i) => (
        <circle key={i} className="mj-drop" cx={112 + i * 8} cy="74" r="3.5" fill="#F29A2E" />
      ))}
      <g clipPath="url(#juice-glass)">
        <rect className="mj-fill" x="70" y="92" width="100" height="120" fill="#F29A2E" />
      </g>
      <path d="M80 92h80l-8 120H88z" fill="rgba(255,255,255,.25)" stroke="#2B1D14" strokeWidth="2.5" />
    </svg>
  )
}

function Tea() {
  return (
    <svg viewBox="0 0 240 240" className="moment-svg">
      <defs>
        <clipPath id="tea-glass">
          <path d="M96 168h48l-5 52h-38z" />
        </clipPath>
      </defs>
      <g className="mt-pot" transform="rotate(-18 176 40)">
        <path d="M152 20h48c4 18 4 34-4 44h-40c-8-10-8-26-4-44z" fill="#D9B65A" />
        <path d="M152 44c-16-2-26 6-34 18" stroke="#D9B65A" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M200 30c14 0 14 26 0 26" stroke="#D9B65A" strokeWidth="5" fill="none" />
        <path d="M166 20l10-14 10 14z" fill="#C49E45" />
      </g>
      <path className="mt-stream" d="M118 66C116 110 120 140 120 210" stroke="#B5651D" strokeWidth="4" fill="none" strokeLinecap="round" />
      <g clipPath="url(#tea-glass)">
        <rect className="mt-fill" x="90" y="168" width="60" height="52" fill="#B5651D" />
        <path d="M108 194c8-8 18-4 16 6-8 3-14 2-16-6z" fill="#3E7A5E" />
      </g>
      <path d="M96 168h48l-5 52h-38z" fill="none" stroke="#2B1D14" strokeWidth="2.5" />
      <path d="M99 180h42" stroke="#D9B65A" strokeWidth="2.5" strokeDasharray="3 4" />
    </svg>
  )
}

const sceneTimelines = [
  (tl, el) => {
    tl.from(el.querySelectorAll('.mp-cake'), { y: -220, opacity: 0, stagger: 0.25, ease: 'bounce.out', duration: 0.6 })
      .from(el.querySelector('.mp-butter'), { y: -120, opacity: 0, duration: 0.4 })
      .fromTo(el.querySelector('.mp-honey'), { strokeDasharray: 400, strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 0.8 })
  },
  (tl, el) => {
    tl.from(el.querySelector('.mj-orange'), { y: -60, opacity: 0, duration: 0.4 })
      .to(el.querySelector('.mj-orange'), { scaleY: 0.7, transformOrigin: '50% 100%', yoyo: true, repeat: 3, duration: 0.15 })
      .fromTo(el.querySelectorAll('.mj-drop'), { y: 0, opacity: 1 }, { y: 120, opacity: 0, stagger: 0.1, duration: 0.5 }, '<')
      .fromTo(el.querySelector('.mj-fill'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1 }, '<')
  },
  (tl, el) => {
    tl.from(el.querySelector('.mt-pot'), { x: 60, opacity: 0, duration: 0.4 })
      .fromTo(el.querySelector('.mt-stream'), { strokeDasharray: 200, strokeDashoffset: 200 }, { strokeDashoffset: 0, duration: 0.4 })
      .fromTo(el.querySelector('.mt-fill'), { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1 })
  },
]

export function Moments() {
  const root = useRef()
  const { t } = useLang()

  useGsap(
    root,
    () => {
      root.current.querySelectorAll('.moment').forEach((el, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 45%', scrub: 0.6 },
        })
        const video = el.querySelector('video')
        if (video) {
          // The arch opens up around the clip while it settles from a zoom.
          tl.fromTo(
            el.querySelector('.moment-art'),
            { clipPath: 'inset(24% 14% 0% 14% round 999px 999px 24px 24px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 999px 999px 24px 24px)', ease: 'none' },
          ).fromTo(video, { scale: 1.35 }, { scale: 1, ease: 'none' }, 0)
        } else {
          sceneTimelines[i](tl, el)
        }
      })
    },
    [t],
  )

  const scenes = [Pancakes, Juice, Tea]
  const media = site.media.moments || []

  return (
    <section className="moments" ref={root}>
      <Label>{t.moments.label}</Label>
      <div className="moments-grid">
        {t.moments.items.map(([title, text], i) => {
          const Scene = scenes[i]
          return (
            <article key={i} className={`moment moment-${i + 1}`}>
              <div className="moment-art">
                {media[i]?.video ? <AutoVideo className="moment-video" src={media[i].video} poster={media[i].poster} /> : <Scene />}
              </div>
              <span className="moment-num">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
