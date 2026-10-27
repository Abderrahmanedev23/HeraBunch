import { useRef } from 'react'
import { gsap, useGsap } from '../lib/motion'

// A strip of zellige stars that slides sideways while you scroll past it.
export function TileBand() {
  const ref = useRef()

  useGsap(ref, () => {
    gsap.fromTo(
      ref.current,
      { backgroundPositionX: '0px' },
      {
        backgroundPositionX: '-320px',
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    )
  })

  return <div className="tileband" ref={ref} aria-hidden="true" />
}
