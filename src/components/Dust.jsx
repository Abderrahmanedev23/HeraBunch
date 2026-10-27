import { useEffect, useRef } from 'react'

// Specks of dust drifting in the morning light.
export function Dust({ className = '', count = 70 }) {
  const ref = useRef()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const motes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -0.05 - Math.random() * 0.15,
      seed: Math.random() * Math.PI * 2,
    }))

    const tick = (time) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      ctx.clearRect(0, 0, w, h)
      for (const m of motes) {
        m.x += m.vx + Math.sin(time * 0.0004 + m.seed) * 0.08
        m.y += m.vy
        if (m.y < -4) {
          m.y = h + 4
          m.x = Math.random() * w
        }
        if (m.x < -4) m.x = w + 4
        if (m.x > w + 4) m.x = -4
        const alpha = 0.25 + 0.55 * Math.abs(Math.sin(time * 0.0009 + m.seed))
        ctx.fillStyle = `rgba(255,238,205,${alpha})`
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(canvas)
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas className={`dust ${className}`} ref={ref} aria-hidden="true" />
}
