// Top-down illustrated plates, used until real food photography is ready.
const C = {
  plate: '#FFFDF6',
  well: '#F6EEDC',
  rim: 'rgba(43,29,20,0.08)',
  dough: '#E4A956',
  doughDark: '#C4843A',
  honey: '#D9962B',
  amlou: '#8A5A3B',
  oil: '#C7B03F',
  white: '#FFFFFF',
  yolk: '#F2A024',
  green: '#3E7A5E',
  avocado: '#A6C25E',
  berry: '#8E2F4A',
  coffee: '#5E3A22',
  crema: '#E8CDA8',
  orange: '#F29A2E',
  tea: '#B5651D',
  terracotta: '#C06E4D',
}

function Plate({ children, small }) {
  return (
    <>
      <circle cx="100" cy="104" r={small ? 70 : 92} fill="rgba(43,29,20,0.07)" />
      <circle cx="100" cy="100" r={small ? 70 : 92} fill={C.plate} stroke={C.rim} />
      <circle cx="100" cy="100" r={small ? 54 : 74} fill={C.well} />
      {children}
    </>
  )
}

// Fixed pseudo-random dots so plates render the same every time.
const dots = (n, cx, cy, r, seed = 1) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i * 137.5 + seed * 40) * (Math.PI / 180)
    const d = r * Math.sqrt((i + 0.5) / n)
    return [cx + Math.cos(a) * d, cy + Math.sin(a) * d]
  })

const dishes = {
  msemen: () => (
    <Plate>
      <g transform="rotate(12 100 100)">
        <rect x="52" y="52" width="96" height="96" rx="10" fill={C.dough} />
        <path d="M52 100h96M100 52v96" stroke={C.doughDark} strokeWidth="2" opacity=".5" />
        <rect x="62" y="62" width="76" height="76" rx="8" fill="none" stroke={C.doughDark} opacity=".35" />
      </g>
      <path d="M70 80c20 6 40-8 62 4M66 110c22-6 44 10 68 0" stroke={C.honey} strokeWidth="5" fill="none" strokeLinecap="round" opacity=".85" />
    </Plate>
  ),
  baghrir: () => (
    <Plate>
      {[
        [84, 92],
        [118, 110],
      ].map(([x, y], k) => (
        <g key={k}>
          <circle cx={x} cy={y} r="46" fill="#EDD9A6" stroke="#D9BE84" />
          {dots(42, x, y, 40, k + 1).map(([dx, dy], i) => (
            <circle key={i} cx={dx} cy={dy} r="2" fill="#CDB077" />
          ))}
        </g>
      ))}
      <path d="M96 96c10 8 26 4 34 14" stroke={C.honey} strokeWidth="6" fill="none" strokeLinecap="round" />
    </Plate>
  ),
  amlou: () => (
    <Plate>
      <circle cx="78" cy="88" r="34" fill={C.white} stroke={C.rim} />
      <circle cx="78" cy="88" r="27" fill={C.amlou} />
      <path d="M64 86c8-10 22-8 26 2s-8 14-14 8" stroke="#A9764F" strokeWidth="3" fill="none" />
      <circle cx="124" cy="122" r="28" fill={C.white} stroke={C.rim} />
      <circle cx="124" cy="122" r="21" fill={C.oil} />
      <ellipse cx="118" cy="116" rx="7" ry="4" fill="#fff" opacity=".45" />
    </Plate>
  ),
  cheese: () => (
    <Plate>
      <circle cx="96" cy="94" r="38" fill={C.white} stroke={C.rim} />
      <circle cx="96" cy="94" r="30" fill="#FBF8F1" />
      <path d="M82 94c4-10 22-12 26 0s-14 14-18 6" stroke={C.oil} strokeWidth="4" fill="none" strokeLinecap="round" />
      {[
        [138, 74],
        [146, 92],
        [134, 128],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="7" ry="5" fill="#4E5B2C" />
      ))}
      <path d="M58 132l34-8 6 22-34 8z" fill={C.dough} />
    </Plate>
  ),
  benedict: () => (
    <Plate>
      {[
        [76, 96],
        [126, 106],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="32" fill="#E0B373" />
          <path d={`M${x - 26} ${y - 4}c6-22 46-22 52 0 4 18-10 28-26 28s-30-10-26-28z`} fill={C.white} />
          <circle cx={x} cy={y} r="17" fill="#F4C54E" />
          <circle cx={x - 5} cy={y - 5} r="2" fill={C.green} />
          <circle cx={x + 6} cy={y + 3} r="2" fill={C.green} />
        </g>
      ))}
    </Plate>
  ),
  eggs: () => (
    <Plate>
      <path d="M50 92c4-24 34-30 50-18 14 10 6 34-14 40s-40-2-36-22z" fill={C.white} />
      <path d="M100 116c2-22 30-30 48-18 14 10 8 34-12 38s-38 0-36-20z" fill={C.white} />
      <circle cx="76" cy="92" r="13" fill={C.yolk} />
      <circle cx="124" cy="116" r="13" fill={C.yolk} />
      <circle cx="72" cy="88" r="3.5" fill="#fff" opacity=".6" />
      <circle cx="120" cy="112" r="3.5" fill="#fff" opacity=".6" />
      {dots(10, 100, 100, 50, 3).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#2B1D14" opacity=".5" />
      ))}
    </Plate>
  ),
  avocado: () => (
    <Plate>
      <g transform="rotate(-10 100 100)">
        <rect x="46" y="62" width="108" height="76" rx="16" fill="#B9803D" />
        <rect x="52" y="68" width="96" height="64" rx="12" fill="#D9A55B" />
        <path d="M58 82c14-10 30 6 44-4s32 2 40 0v40c-12 6-30-6-44 2s-30-4-40 2z" fill={C.avocado} />
      </g>
      {dots(12, 100, 100, 36, 5).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill={i % 3 ? '#7E9A3E' : '#C8402C'} />
      ))}
    </Plate>
  ),
  pancakes: () => (
    <Plate>
      <circle cx="100" cy="100" r="60" fill="#D18E3E" />
      <circle cx="100" cy="98" r="56" fill={C.dough} />
      <circle cx="100" cy="96" r="44" fill="#EDBA6E" opacity=".6" />
      <path d="M62 84c14 14 50-8 76 10 4 12-10 16-10 28M80 128c0 10 4 16 6 22" stroke={C.honey} strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="88" y="84" width="22" height="16" rx="3" fill="#FFE7A0" transform="rotate(14 99 92)" />
      <circle cx="136" cy="70" r="6" fill={C.berry} />
      <circle cx="146" cy="80" r="5" fill={C.berry} />
    </Plate>
  ),
  french: () => (
    <Plate>
      <rect x="48" y="64" width="64" height="70" rx="14" fill="#D58F3C" transform="rotate(-14 80 99)" />
      <rect x="88" y="70" width="64" height="70" rx="14" fill="#E2A250" transform="rotate(10 120 105)" />
      {dots(18, 104, 100, 44, 7).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="#fff" opacity=".8" />
      ))}
      <circle cx="132" cy="140" r="7" fill={C.berry} />
      <circle cx="144" cy="132" r="6" fill={C.berry} />
    </Plate>
  ),
  croissant: () => (
    <Plate>
      <g transform="rotate(-18 100 100)">
        <path d="M44 112c10-40 102-40 112 0-10 6-18 6-24 0-12-18-52-18-64 0-6 6-14 6-24 0z" fill="#D99A45" />
        <path d="M72 82l-8 30M100 74v38M128 82l8 30" stroke="#B9782F" strokeWidth="3" strokeLinecap="round" />
      </g>
    </Plate>
  ),
  juice: () => (
    <Plate small>
      <circle cx="100" cy="100" r="40" fill="#fff" stroke="rgba(43,29,20,0.12)" strokeWidth="3" />
      <circle cx="100" cy="100" r="34" fill={C.orange} />
      <circle cx="90" cy="90" r="8" fill="#fff" opacity=".35" />
      <path d="M124 70a22 22 0 0 1 14 22" stroke="#F7C35B" strokeWidth="10" fill="none" />
    </Plate>
  ),
  coffee: () => (
    <Plate small>
      <rect x="132" y="92" width="26" height="16" rx="8" fill="#fff" stroke="rgba(43,29,20,0.12)" />
      <circle cx="100" cy="100" r="42" fill="#fff" stroke="rgba(43,29,20,0.12)" />
      <circle cx="100" cy="100" r="34" fill={C.coffee} />
      <path d="M100 118c-14-10-20-16-20-24a10 10 0 0 1 20-2 10 10 0 0 1 20 2c0 8-6 14-20 24z" fill={C.crema} />
    </Plate>
  ),
  tea: () => (
    <Plate small>
      <circle cx="100" cy="100" r="36" fill="none" stroke="#D9B65A" strokeWidth="4" strokeDasharray="4 6" />
      <circle cx="100" cy="100" r="30" fill={C.tea} />
      <path d="M92 86c10-10 24-4 22 8-10 4-20 2-22-8z" fill={C.green} />
      <path d="M86 104c8-6 18-2 16 6-8 4-14 2-16-6z" fill="#5A9474" />
    </Plate>
  ),
}

export function Dish({ name, className, title }) {
  const Draw = dishes[name]
  if (!Draw) return null
  return (
    <svg className={className} viewBox="0 0 200 200" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <Draw />
    </svg>
  )
}
