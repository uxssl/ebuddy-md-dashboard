const M = { t: 40, r: 16, b: 60, l: 58 }
const W = 560, H = 290
const CW = W - M.l - M.r
const CH = H - M.t - M.b
const MAX_V = 120
const BAR_W = 50

const entries = [
  { lines: ['Total', 'Budget'],        base: 0,  top: 110, kind: 'start', tag: '110k' },
  { lines: ['Development', 'Cost'],    base: 70, top: 110, kind: 'cost',  tag: '-40k' },
  { lines: ['Infrastructure', 'Cost'], base: 45, top: 70,  kind: 'cost',  tag: '-25k' },
  { lines: ['HR Cost'],                base: 30, top: 45,  kind: 'cost',  tag: '-15k' },
  { lines: ['Other Cost'],             base: 20, top: 30,  kind: 'cost',  tag: '-10k' },
  { lines: ['Remaining', 'Balance'],   base: 0,  top: 20,  kind: 'end',   tag: '20k'  },
]

const FILL  = { start: '#69D389', cost: '#EF5350', end: '#5B8DEF' }
const LCOL  = { start: '#2E7D32', cost: '#C62828', end: '#1565C0' }
const YTICKS = [0, 30, 60, 90, 120]
const FONT  = 'Inter, system-ui, sans-serif'

const yPx = v => M.t + CH * (1 - v / MAX_V)
const step = CW / entries.length
const bcx  = i => M.l + step * (i + 0.5)

export default function WaterfallChart() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      {/* horizontal grid lines */}
      {YTICKS.map(v => (
        <line key={v}
          x1={M.l} x2={M.l + CW} y1={yPx(v)} y2={yPx(v)}
          stroke="#EEF2F7" strokeWidth={1}
        />
      ))}

      {/* Y-axis labels */}
      {YTICKS.map(v => (
        <text key={v}
          x={M.l - 8} y={yPx(v) + 4}
          textAnchor="end" fontSize={10} fill="#94A3B8" fontFamily={FONT}
        >
          {v === 0 ? 'BDT 0' : `BDT ${v}k`}
        </text>
      ))}

      {/* dashed connector lines between bars */}
      {entries.slice(0, -1).map((_, i) => {
        const y = yPx(entries[i + 1].top)
        return (
          <line key={`c${i}`}
            x1={bcx(i) + BAR_W / 2} x2={bcx(i + 1) - BAR_W / 2}
            y1={y} y2={y}
            stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="5 4"
          />
        )
      })}

      {/* bars + value labels */}
      {entries.map((e, i) => {
        const x    = bcx(i)
        const yTop = yPx(e.top)
        const yBot = yPx(e.base)
        return (
          <g key={i}>
            <rect
              x={x - BAR_W / 2} y={yTop}
              width={BAR_W} height={yBot - yTop}
              fill={FILL[e.kind]} rx={4}
            />
            <text
              x={x} y={yTop - 6}
              textAnchor="middle" fontSize={11} fontWeight="700"
              fill={LCOL[e.kind]} fontFamily={FONT}
            >
              {e.tag}
            </text>
          </g>
        )
      })}

      {/* X-axis labels (multi-line via tspan) */}
      {entries.map((e, i) => (
        <text key={`xl${i}`}
          x={bcx(i)} y={yPx(0) + 15}
          textAnchor="middle" fontSize={10} fill="#64748B" fontFamily={FONT}
        >
          {e.lines.map((ln, li) => (
            <tspan key={li} x={bcx(i)} dy={li === 0 ? 0 : 13}>{ln}</tspan>
          ))}
        </text>
      ))}
    </svg>
  )
}
