import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/motion'

// Muted looping clip that only plays while it is on screen.
// With reduced motion it stays on its poster frame.
export function AutoVideo({ src, poster, className, eager = false }) {
  const ref = useRef()

  useEffect(() => {
    const video = ref.current
    // Set as a property: React does not always reflect `muted`, and browsers only autoplay muted video.
    video.muted = true
    if (reducedMotion) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster || undefined}
      muted
      loop
      playsInline
      preload={eager ? 'auto' : 'none'}
      aria-hidden="true"
    />
  )
}
