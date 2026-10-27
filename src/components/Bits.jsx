import { useLang } from '../i18n'

// Text stand-in for the logo until Hera sends the vector file.
export function Wordmark({ className = '' }) {
  return (
    <span className={`wordmark ${className}`} aria-label="Hera Brunch">
      <span className="wm-hera" aria-hidden="true">
        Hera
      </span>
      <span className="wm-sub" aria-hidden="true">
        Brunch
      </span>
    </span>
  )
}

// Button text that rolls letter by letter on hover. Arabic rolls as whole words,
// since splitting it into letters would break the joined script.
export function Roll({ children }) {
  const { lang } = useLang()
  const text = String(children)
  const parts = lang === 'ar' ? [text] : [...text]
  const line = (hidden) => (
    <span className="roll-line" aria-hidden={hidden || undefined}>
      {parts.map((ch, i) => (
        <span key={i} style={{ transitionDelay: `${i * 14}ms` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
  return (
    <span className="roll" aria-label={text}>
      {line(false)}
      {line(true)}
    </span>
  )
}

// Circular text badge that spins slowly.
export function Badge({ text, href, children }) {
  const label = `${text} · ${text} · `
  return (
    <a className="badge" href={href} target="_blank" rel="noreferrer" aria-label={text}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1 -92 0" />
        </defs>
        <text>
          <textPath href="#badge-circle" textLength="288">
            {label}
          </textPath>
        </text>
      </svg>
      <span className="badge-icon">{children}</span>
    </a>
  )
}

export function Label({ children }) {
  return <p className="label">{children}</p>
}
