const MEDAL = ['#F59E0B', '#94A3B8', '#CD7F32']
const MEDAL_BG = ['#FFFBEB', '#F8FAFC', '#FDF6EE']

const ROW_COLORS = [
  '#6366F1', '#10B981', '#0EA5E9', '#F59E0B', '#EF4444',
  '#8B5CF6', '#14B8A6', '#F97316',
]


function RevenueRow({ rank, label, value, max }) {
  const isTop3 = rank <= 3
  const idx = rank - 1
  const barPct = max > 0 ? (value / max) * 100 : 0
  const color = ROW_COLORS[idx % ROW_COLORS.length]

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '7px 0',
      borderBottom: '1px solid rgba(13,43,69,.05)',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        background: isTop3 ? MEDAL_BG[idx] : `${color}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 800,
        color: isTop3 ? MEDAL[idx] : color,
      }}>{rank}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ height: 3, background: '#EAF0F6', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${barPct}%`, height: '100%', borderRadius: 2, background: color, transition: 'width .4s' }} />
        </div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
        ৳{value.toFixed(2)}M
      </div>
    </div>
  )
}

function AchievementRow({ rank, label, pct }) {
  const isTop3 = rank <= 3
  const idx = rank - 1
  const color = ROW_COLORS[idx % ROW_COLORS.length]
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '7px 0',
      borderBottom: '1px solid rgba(13,43,69,.05)',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        background: isTop3 ? MEDAL_BG[idx] : `${color}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 800,
        color: isTop3 ? MEDAL[idx] : color,
      }}>{rank}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ height: 3, background: '#EAF0F6', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', borderRadius: 2, background: color }} />
        </div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color, whiteSpace: 'nowrap' }}>
        {pct}%
      </div>
    </div>
  )
}

export default function LeaderboardList({ rows, variant = 'revenue' }) {
  const max = variant === 'revenue' ? Math.max(...rows.map(r => r.value ?? 0)) : 100
  return (
    <div>
      {rows.map((row, i) => {
        if (variant === 'achievement') {
          return <AchievementRow key={row.name} rank={i + 1} label={row.name} pct={row.pct} />
        }
        return <RevenueRow key={row.name} rank={i + 1} label={row.name} value={row.value} max={max} />
      })}
    </div>
  )
}
