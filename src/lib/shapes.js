// Retro frame shapes for photos and clips, as SVG paths in a 1×1 box
// (used with clipPathUnits="objectBoundingBox"). Each is traced around the centre
// from a radius function, so shapes with the same step count can morph into each other.

const fmt = (v) => +v.toFixed(4)

export function polar(radius, steps = 180) {
  let d = ''
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const r = radius(t)
    d += `${i ? 'L' : 'M'}${fmt(0.5 + r * Math.cos(t))} ${fmt(0.5 + r * Math.sin(t))}`
  }
  return `${d}Z`
}

const blob = ([a, b, c]) => (t) => 0.44 + 0.035 * Math.cos(2 * t + a) + 0.025 * Math.cos(3 * t + b) + 0.015 * Math.cos(5 * t + c)

export const shapes = {
  // A sun with twelve soft rays, like the favicon badge.
  sun: polar((t) => 0.465 + 0.03 * Math.cos(12 * t)),
  // Eight rounded petals.
  flower: polar((t) => 0.435 + 0.06 * Math.cos(8 * t)),
  // Four lobes with pointed joins, as in Moroccan tilework.
  quatrefoil: polar((t) => 0.3 + 0.17 * Math.abs(Math.cos(2 * t)) ** 0.5),
  // A circle with a fine wavy edge, like a stamp or a biscuit.
  stamp: polar((t) => 0.475 + 0.018 * Math.cos(22 * t), 264),
  // A soft organic pebble.
  blob: polar(blob([1.2, 0.4, 2.1])),
}

// Three pebble outlines with the same points, for a slow morph.
export const blobMorph = [blob([1.2, 0.4, 2.1]), blob([2.6, 1.9, 0.3]), blob([0.2, 3, 1.4])].map((r) => polar(r))
