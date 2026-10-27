import { useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { useLang } from '../i18n'
import { Wordmark } from './Bits'

// Opening screen: the clock runs from 06:00 to 08:00 while a glass of mint tea fills.
export function Loader({ onDone }) {
  const root = useRef()
  const clock = useRef()
  const { t } = useLang()

  useLayoutEffect(() => {
    if (reducedMotion) {
      onDone()
      return
    }
    document.documentElement.classList.add('is-loading')
    const time = { m: 6 * 60 }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove('is-loading')
          onDone()
        },
      })
      tl.from('.loader-hello', { yPercent: 100, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .to(
          time,
          {
            m: 8 * 60,
            duration: 2,
            ease: 'power2.inOut',
            onUpdate: () => {
              const h = Math.floor(time.m / 60)
              const m = Math.floor(time.m % 60)
              clock.current.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
            },
          },
          0.2,
        )
        .fromTo('.loader-pour', { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: 'power2.in' }, 0.3)
        .fromTo('.loader-fill', { scaleY: 0 }, { scaleY: 1, duration: 1.8, ease: 'power1.inOut' }, 0.5)
        .to('.loader-pour', { scaleY: 0, transformOrigin: '50% 100%', duration: 0.3 }, 2.2)
        .to('.loader-sun', { yPercent: -60, duration: 2.4, ease: 'power2.out' }, 0)
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, 2.6)
    }, root)
    return () => {
      document.documentElement.classList.remove('is-loading')
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (reducedMotion) return null

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader-sun" />
      <Wordmark className="loader-mark" />
      <svg className="loader-glass" viewBox="0 0 80 120">
        <defs>
          <clipPath id="glass-clip">
            <path d="M14 40h52l-6 70H20z" />
          </clipPath>
        </defs>
        <rect className="loader-pour" x="38.5" y="0" width="3" height="104" fill="#B5651D" />
        <g clipPath="url(#glass-clip)">
          <rect className="loader-fill" x="0" y="40" width="80" height="80" fill="#B5651D" />
          <path d="M30 70c8-8 18-4 16 6-8 3-14 2-16-6z" fill="#3E7A5E" opacity=".8" />
        </g>
        <path d="M14 40h52l-6 70H20z" fill="none" stroke="#2B1D14" strokeWidth="2" />
        <path d="M18 56h44M22 98h36" stroke="#D9B65A" strokeWidth="2" strokeDasharray="3 4" />
      </svg>
      <p className="loader-time">
        <span ref={clock}>06:00</span>
      </p>
      <p className="loader-hello-wrap">
        <span className="loader-hello">{t.loader}</span>
      </p>
    </div>
  )
}
