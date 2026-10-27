import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { site } from '../data/site'
import { gsap, useGsap } from '../lib/motion'
import { Badge, Label, Roll } from './Bits'

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// Current time and weekday in Rabat, whatever the visitor's time zone.
function rabatNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (type) => parts.find((p) => p.type === type).value
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, h: get('hour'), m: get('minute'), s: get('second') }
}

function status(now) {
  const mins = Number(now.h) * 60 + Number(now.m)
  const today = site.hours.find((d) => d.day === now.day)
  if (today && mins >= toMin(today.open) && mins < toMin(today.close)) return { open: true, at: today.close }
  if (today && mins < toMin(today.open)) return { open: false, at: today.open }
  for (let i = 1; i <= 7; i++) {
    const next = site.hours.find((d) => d.day === (now.day + i) % 7)
    if (next) return { open: false, at: next.open }
  }
  return { open: false, at: null }
}

export function Visit() {
  const root = useRef()
  const { t } = useLang()
  const [now, setNow] = useState(rabatNow)

  useEffect(() => {
    const id = setInterval(() => setNow(rabatNow()), 1000)
    return () => clearInterval(id)
  }, [])

  useGsap(
    root,
    () => {
      gsap.from('.visit-title .w', {
        yPercent: 110,
        stagger: 0.06,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.visit-title', start: 'top 85%' },
      })
    },
    [t],
  )

  const st = status(now)
  const sameEveryDay = site.hours.length === 7 && new Set(site.hours.map((d) => d.open + d.close)).size === 1
  const bookHref = site.phone ? `tel:${site.phone}` : site.instagram

  return (
    <section className="visit" id="visit" ref={root}>
      <div className="visit-main">
        <Label>{t.visit.label}</Label>
        <h2 className="visit-title">
          {t.visit.title.split(' ').map((w, i) => (
            <span key={i} className="line">
              <span className="w">{w}</span>
            </span>
          ))}
        </h2>
        <p className="visit-text">{t.visit.text}</p>
        <div className="visit-actions">
          <a className="btn" href={site.maps} target="_blank" rel="noreferrer">
            <Roll>{t.visit.directions}</Roll>
            <span className="btn-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
          <a className="btn btn-ghost" href={site.instagram} target="_blank" rel="noreferrer">
            <Roll>{t.visit.message}</Roll>
          </a>
          {site.glovo && (
            <a className="btn btn-ghost" href={site.glovo} target="_blank" rel="noreferrer">
              <Roll>Glovo</Roll>
            </a>
          )}
        </div>
      </div>

      <aside className="visit-card">
        <div className="visit-clock">
          <span className="label">{t.visit.time}</span>
          <span className="visit-time" dir="ltr">
            {now.h}
            <span className="blink">:</span>
            {now.m}
          </span>
          <span className={`visit-status ${st.open ? 'is-open' : ''}`}>
            <i aria-hidden="true" />
            {st.open ? t.visit.open : t.visit.closed}
            {st.at && (
              <span className="muted">
                {' '}
                · {st.open ? t.visit.closesAt : t.visit.opensAt} <span dir="ltr">{st.at}</span>
              </span>
            )}
          </span>
        </div>
        <dl className="visit-info">
          <div>
            <dt>{t.visit.hours}</dt>
            <dd>
              {sameEveryDay ? (
                <>
                  {t.visit.everyDay} · <span dir="ltr">{site.hours[0].open} – {site.hours[0].close}</span>
                </>
              ) : (
                site.hours.map((d) => (
                  <span key={d.day} className="visit-day" dir="ltr">
                    {new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(new Date(2024, 0, 7 + d.day))} {d.open} – {d.close}
                  </span>
                ))
              )}
            </dd>
          </div>
          <div>
            <dt>{t.visit.address}</dt>
            <dd>{site.address || t.visit.addressFallback}</dd>
          </div>
          <div>
            <dt>{t.visit.follow}</dt>
            <dd>
              <a href={site.instagram} target="_blank" rel="noreferrer" dir="ltr">
                @herabrunch
              </a>
            </dd>
          </div>
        </dl>
        <Badge text={t.visit.book} href={bookHref}>
          ☕
        </Badge>
      </aside>
    </section>
  )
}
