// Photo frames that each tell a story: half come from the Moroccan table and its crafts,
// half from the brunch table. All are SVG paths in a 1×1 box, used as clip paths with
// clipPathUnits="objectBoundingBox" (see components/ShapeDefs.jsx).

const fmt = (v) => +v.toFixed(4)
const pt = (x, y) => `${fmt(x)} ${fmt(y)}`

// Traces a closed outline around the centre from a radius function.
export function polar(radius, steps = 180) {
  let d = ''
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const r = radius(t)
    d += `${i ? 'L' : 'M'}${pt(0.5 + r * Math.cos(t), 0.5 + r * Math.sin(t))}`
  }
  return `${d}Z`
}

const circle = (cx, cy, r) => `M${pt(cx - r, cy)}a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(2 * r)} 0a${fmt(r)} ${fmt(r)} 0 1 0 ${fmt(-2 * r)} 0Z`

// Rounded square, as a radius function (higher n = sharper corners).
const square = (t, n = 8) => (Math.abs(Math.cos(t)) ** n + Math.abs(Math.sin(t)) ** n) ** (-1 / n)

// Soft organic outline, like the white of a fried egg.
const pebble = ([a, b, c]) => (t) => 0.44 + 0.035 * Math.cos(2 * t + a) + 0.025 * Math.cos(3 * t + b) + 0.015 * Math.cos(5 * t + c)

// Baghrir: a round pancake full of little holes.
function baghrir() {
  let d = circle(0.5, 0.5, 0.48)
  const rings = [
    [0.38, 13, 0.022, 0.2],
    [0.25, 8, 0.02, 0.6],
    [0.12, 4, 0.018, 1.1],
  ]
  for (const [ring, count, r, phase] of rings) {
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2 + phase
      const wobble = 1 + 0.06 * Math.sin(i * 2.3)
      d += circle(0.5 + ring * wobble * Math.cos(t), 0.5 + ring * wobble * Math.sin(t), r * (0.8 + 0.4 * Math.abs(Math.sin(i * 1.7))))
    }
  }
  return d
}

// Orange slice: peel, a thin pith ring, and ten segments.
function slice() {
  let d = circle(0.5, 0.5, 0.48) + circle(0.5, 0.5, 0.445) + circle(0.5, 0.5, 0.43)
  const count = 10
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2
    const w = 0.022
    const a = [0.5 + 0.06 * Math.cos(t), 0.5 + 0.06 * Math.sin(t)]
    const b = [0.5 + 0.415 * Math.cos(t - w), 0.5 + 0.415 * Math.sin(t - w)]
    const c = [0.5 + 0.415 * Math.cos(t + w), 0.5 + 0.415 * Math.sin(t + w)]
    d += `M${pt(...a)}L${pt(...b)}L${pt(...c)}Z`
  }
  return d + circle(0.5, 0.5, 0.035)
}

// Coffee bean: an oval split by its S-shaped crease (turned with `rotate`).
const bean = `M0.5 0.04C0.72 0.04 0.8 0.3 0.8 0.5C0.8 0.7 0.72 0.96 0.5 0.96C0.28 0.96 0.2 0.7 0.2 0.5C0.2 0.3 0.28 0.04 0.5 0.04Z
M0.47 0.1C0.4 0.3 0.62 0.62 0.48 0.9L0.53 0.9C0.67 0.62 0.45 0.3 0.52 0.1Z`

// Crescent: the outer circle minus an offset inner one. A croissant, and the
// crescent moon still in the sky over Rabat at dawn.
function crescent(steps = 360) {
  const [x1, y1, r1] = [0.5, 0.5, 0.47]
  const [x2, y2, r2] = [0.68, 0.34, 0.36]
  const outer = []
  const inner = []
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const p = [x1 + r1 * Math.cos(t), y1 + r1 * Math.sin(t)]
    if (Math.hypot(p[0] - x2, p[1] - y2) > r2) outer.push(p)
    const q = [x2 + r2 * Math.cos(t), y2 + r2 * Math.sin(t)]
    if (Math.hypot(q[0] - x1, q[1] - y1) < r1) inner.push(q)
  }
  // Start the outer arc right after the cut, and run the inner arc back from its far end.
  const cut = outer.findIndex((p, i) => i > 0 && Math.hypot(p[0] - outer[i - 1][0], p[1] - outer[i - 1][1]) > 0.05)
  const arc = cut > 0 ? [...outer.slice(cut), ...outer.slice(0, cut)] : outer
  const end = arc[arc.length - 1]
  const back = [...inner].sort((p, q) => Math.hypot(p[0] - end[0], p[1] - end[1]) - Math.hypot(q[0] - end[0], q[1] - end[1]))
  const start = back[0]
  const ordered = inner.indexOf(start)
  const forward = [...inner.slice(ordered), ...inner.slice(0, ordered)]
  const nextIsClose = Math.hypot(forward[1][0] - start[0], forward[1][1] - start[1]) < 0.05
  const innerArc = nextIsClose ? forward : [start, ...forward.slice(1).reverse()]
  return `M${[...arc, ...innerArc].map((p) => pt(...p)).join('L')}Z`
}

export const shapes = {
  // From the Moroccan table and its crafts
  star: { d: polar((t) => 0.385 * Math.max(square(t), square(t - Math.PI / 4)), 240) }, // the eight-pointed zellige star (khatam)
  rosette: { d: polar((t) => 0.435 + 0.06 * Math.cos(8 * t)) }, // zellige rosette, the garden in the tiles
  lattice: { d: polar((t) => 0.3 + 0.17 * Math.abs(Math.cos(2 * t)) ** 0.5) }, // quatrefoil of riad windows and lattice screens
  teaglass: { d: 'M0.13 0.06Q0.13 0.02 0.17 0.02H0.83Q0.87 0.02 0.87 0.06L0.75 0.9Q0.74 0.97 0.67 0.97H0.33Q0.26 0.97 0.25 0.9Z' }, // mint tea glass
  msemen: { d: 'M0.14 0.06H0.66L0.94 0.34V0.86Q0.94 0.94 0.86 0.94H0.14Q0.06 0.94 0.06 0.86V0.14Q0.06 0.06 0.14 0.06Z' }, // folded square of msemen
  baghrir: { d: baghrir(), rule: 'evenodd' }, // the pancake of a thousand holes
  // From the brunch table
  sun: { d: polar((t) => 0.465 + 0.03 * Math.cos(12 * t)) }, // the morning sun, sunny side up
  egg: { d: polar(pebble([1.2, 0.4, 2.1])) }, // fried egg white
  egg2: { d: polar(pebble([2.6, 1.9, 0.3])) },
  drop: { d: 'M0.5 0.03C0.56 0.14 0.86 0.42 0.86 0.64A0.36 0.36 0 0 1 0.14 0.64C0.14 0.42 0.44 0.14 0.5 0.03Z' }, // honey drop
  slice: { d: slice(), rule: 'evenodd' }, // orange slice
  bean: { d: bean, rule: 'evenodd', rotate: 25 }, // coffee bean
  crescent: { d: crescent() }, // croissant, and the crescent moon at dawn
}

// Three fried-egg outlines with the same points, for a slow morph.
export const eggMorph = [pebble([1.2, 0.4, 2.1]), pebble([2.6, 1.9, 0.3]), pebble([0.2, 3, 1.4])].map((r) => polar(r))

// Inline style that clips an element to one of the shapes above.
export const shapeStyle = (name) => ({ clipPath: `url(#shape-${name})`, WebkitClipPath: `url(#shape-${name})` })
