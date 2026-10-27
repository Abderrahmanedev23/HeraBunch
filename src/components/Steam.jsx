import { useEffect, useRef } from 'react'
import { finePointer } from '../lib/motion'

// Soft steam rising from the cup. Wisps drift away from the pointer.
export function Steam({ originX = 0.5, originY = 0.72 }) {
  const ref = useRef()

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const pointer = { x: -9999, y: -9999 }
    const parts = []

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = () => ({
      x: w * originX + (Math.random() - 0.5) * w * 0.3,
      y: h * originY,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.7 - Math.random() * 0.6,
      r: 6 + Math.random() * 10,
      life: 0,
      max: 220 + Math.random() * 140,
      seed: Math.random() * 1000,
    })

    const tick = (time) => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      ctx.clearRect(0, 0, w, h)
      if (parts.length < 70 && Math.random() < 0.5) parts.push(spawn())
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.life++
        const sway = Math.sin(time * 0.0012 + p.seed + p.life * 0.02) * 0.35
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const d2 = dx * dx + dy * dy
        if (d2 < 14000) {
          const f = (1 - d2 / 14000) * 0.6
          p.vx += (dx / Math.sqrt(d2 + 1)) * f
        }
        p.vx *= 0.96
        p.x += p.vx + sway
        p.y += p.vy
        p.r += 0.22
        const k = p.life / p.max
        const alpha = Math.sin(Math.PI * Math.min(k, 1)) * 0.13
        if (k >= 1) {
          parts.splice(i, 1)
          continue
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        g.addColorStop(0, `rgba(255,255,255,${alpha})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    io.observe(canvas)
    resize()
    window.addEventListener('resize', resize)
    if (finePointer) window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [originX, originY])

  return <canvas className="steam" ref={ref} aria-hidden="true" />
}
