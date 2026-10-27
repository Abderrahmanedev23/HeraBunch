import { reducedMotion } from '../lib/motion'
import { eggMorph, shapes } from '../lib/shapes'

// Clip paths for the photo frames (see lib/shapes.js), applied with shapeStyle().
// The -spin and -morph versions move slowly, unless the visitor prefers reduced motion.
export function ShapeDefs() {
  const frame = (id, s, children) => (
    <clipPath key={id} id={`shape-${id}`} clipPathUnits="objectBoundingBox">
      <path d={s.d} clipRule={s.rule} transform={s.rotate ? `rotate(${s.rotate} .5 .5)` : undefined}>
        {children}
      </path>
    </clipPath>
  )
  const spin = (dur) =>
    !reducedMotion && <animateTransform attributeName="transform" type="rotate" from="0 .5 .5" to="360 .5 .5" dur={dur} repeatCount="indefinite" />

  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        {Object.entries(shapes).map(([name, s]) => frame(name, s))}
        {frame('sun-spin', shapes.sun, spin('90s'))}
        {frame('slice-spin', shapes.slice, spin('70s'))}
        {frame(
          'egg-morph',
          { d: eggMorph[0] },
          !reducedMotion && <animate attributeName="d" values={[...eggMorph, eggMorph[0]].join(';')} dur="14s" repeatCount="indefinite" />,
        )}
      </defs>
    </svg>
  )
}
