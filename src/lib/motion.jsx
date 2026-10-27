import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

// Smooth inertia scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
export let lenis = null

export function startSmoothScroll() {
  if (reducedMotion || lenis) return
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
}

export function scrollTo(target, offset = -20) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 })
    return
  }
  const el = document.querySelector(target)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reducedMotion ? 'auto' : 'smooth' })
}

// Runs GSAP setup scoped to a ref and reverts it on unmount or when deps change.
// Animations use gsap.from(), so skipping them (reduced motion) leaves the final layout.
export function useGsap(scope, setup, deps = []) {
  useLayoutEffect(() => {
    if (reducedMotion) return
    const ctx = gsap.context(setup, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// Splits text into word spans so they can be animated one by one.
export function words(text, className = 'w') {
  return text.split(' ').map((word, i) => (
    <span key={i}>
      <span className={className}>{word}</span>{' '}
    </span>
  ))
}
