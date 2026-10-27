import logo from '../data/logo.json'

// The Hera wordmark, vectorized from the brand logo. It takes the current text colour.
// Without a title it is decorative and hidden from screen readers.
export function Logo({ className = '', title }) {
  return (
    <svg
      className={`logo ${className}`}
      viewBox={logo.viewBox}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={logo.d} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}
