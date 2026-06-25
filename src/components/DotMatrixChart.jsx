/* Dot-matrix column chart (LoopAI-style).
   Each item (project) is a column of stacked dots; value → number of dots.
   The item flagged `highlight` gets a value bubble + dashed baseline.
   Actual items use the accent color, AI-projected items are lighter. */
import { C } from '../theme.js'

const ACTUAL = '#34D3A6'      // teal — realised
const PROJECTED = '#CFEFE4'   // faded teal — AI forecast
const HILITE = '#6C5CE7'      // violet — focused item

export default function DotMatrixChart({ data, height = 232 }) {
  const { items, max, unit = '', prefix = '' } = data
  const label = v => `${prefix}${v.toLocaleString()}${unit}`

  // viewBox geometry (scales to 100% width via preserveAspectRatio)
  const W = 720
  const padL = 48, padR = 14, padT = 34, padB = 28
  const plotW = W - padL - padR
  const plotH = height - padT - padB
  const colW = plotW / items.length
  const MAX_DOTS = 13
  const slot = plotH / MAX_DOTS          // vertical space per dot
  const dotR = Math.min(colW, slot) * 0.34

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => Math.round(f * max))
  const yFor = v => padT + plotH - (v / max) * plotH
  const dotsFor = v => Math.max(1, Math.round((v / max) * MAX_DOTS))

  const hiIdx = Math.max(0, items.findIndex(d => d.highlight))
  const hi = items[hiIdx]
  const hiX = padL + hiIdx * colW + colW / 2
  const hiY = yFor(hi.value)

  return (
    <svg viewBox={`0 0 ${W} ${height}`} width="100%" height={height}
         preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      {/* Y grid + labels */}
      {yTicks.map(t => {
        const y = yFor(t)
        return (
          <g key={t}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke={C.grid} strokeWidth="1" />
            <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="10" fill={C.muted}>{label(t)}</text>
          </g>
        )
      })}

      {/* dashed baseline at the highlighted value */}
      <line x1={padL} y1={hiY} x2={hiX} y2={hiY} stroke={HILITE} strokeWidth="1.5"
            strokeDasharray="4 4" opacity="0.7" />

      {/* dot columns — one per project */}
      {items.map((d, i) => {
        const cx = padL + i * colW + colW / 2
        const n = dotsFor(d.value)
        const isHi = !!d.highlight
        const fill = isHi ? HILITE : d.projected ? PROJECTED : ACTUAL
        return (
          <g key={d.name}>
            {Array.from({ length: n }).map((_, k) => (
              <circle key={k} cx={cx} cy={padT + plotH - dotR - k * slot} r={dotR}
                      fill={fill} opacity={isHi ? 1 : d.projected ? 0.9 : 0.95} />
            ))}
            <text x={cx} y={height - 8} textAnchor="middle" fontSize="9.5"
                  fill={isHi ? HILITE : C.muted} fontWeight={isHi ? 700 : 400}>
              {d.name}
            </text>
          </g>
        )
      })}

      {/* value bubble on the highlighted column */}
      <g>
        <rect x={hiX - 28} y={hiY - 30} width="56" height="20" rx="6" fill={HILITE} />
        <text x={hiX} y={hiY - 16} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
          {label(hi.value)}
        </text>
        <polygon points={`${hiX - 5},${hiY - 10} ${hiX + 5},${hiY - 10} ${hiX},${hiY - 4}`} fill={HILITE} />
      </g>
    </svg>
  )
}

export { ACTUAL, PROJECTED, HILITE }
