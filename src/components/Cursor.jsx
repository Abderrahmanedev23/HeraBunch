import { useEffect, useRef } from 'react'
import { finePointer, gsap, reducedMotion } from '../lib/motion'

// Small terracotta dot that trails the pointer and grows over links and buttons.
export function Cursor() {
  const ref = useRef()

  useEffect(() => {
    if (!finePointer || reducedMotion) return
    const el = ref.current
    const x = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3' })
    const move = (e) => {
      x(e.clientX)
      y(e.clientY)
      el.classList.toggle('is-big', !!e.target.closest('a, button, .dish'))
    }
    window.addEventListener('pointermove', move)
    document.documentElement.classList.add('has-cursor')
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  if (!finePointer || reducedMotion) return null
  return <div className="cursor" ref={ref} aria-hidden="true" />
}
