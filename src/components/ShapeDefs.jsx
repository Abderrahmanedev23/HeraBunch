import { reducedMotion } from '../lib/motion'
import { blobMorph, shapes } from '../lib/shapes'

// Clip paths for the retro photo frames, used from CSS as clip-path: url(#shape-…).
// The -spin and -morph versions move slowly, unless the visitor prefers reduced motion.
export function ShapeDefs() {
  const spin = (dur) =>
    !reducedMotion && <animateTransform attributeName="transform" type="rotate" from="0 .5 .5" to="360 .5 .5" dur={dur} repeatCount="indefinite" />

  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        {Object.entries(shapes).map(([name, d]) => (
          <clipPath key={name} id={`shape-${name}`} clipPathUnits="objectBoundingBox">
            <path d={d} />
          </clipPath>
        ))}
        <clipPath id="shape-sun-spin" clipPathUnits="objectBoundingBox">
          <path d={shapes.sun}>{spin('90s')}</path>
        </clipPath>
        <clipPath id="shape-flower-spin" clipPathUnits="objectBoundingBox">
          <path d={shapes.flower}>{spin('60s')}</path>
        </clipPath>
        <clipPath id="shape-blob-morph" clipPathUnits="objectBoundingBox">
          <path d={blobMorph[0]}>
            {!reducedMotion && <animate attributeName="d" values={[...blobMorph, blobMorph[0]].join(';')} dur="14s" repeatCount="indefinite" />}
          </path>
        </clipPath>
      </defs>
    </svg>
  )
}
