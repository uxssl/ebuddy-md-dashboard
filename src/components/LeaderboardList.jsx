const MEDAL = ['#F59E0B', '#94A3B8', '#CD7F32']
const MEDAL_BG = ['#FFFBEB', '#F8FAFC', '#FDF6EE']

function RevenueRow({ rank, label, value, max }) {
  const isTop3 = rank <= 3
  const idx = rank - 1
  const barPct = max > 0 ? (value / max) * 100 : 0

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(13,43,69,.05)' }}>
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        background: isTop3 ? MEDAL_BG[idx] : '#F4F4F5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 800,
        color: isTop3 ? MEDAL[idx] : '#A1A1AA',
      }}>{rank}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ height: 3, background: '#E4E4E7', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${barPct}%`, height: '100%', borderRadius: 2, background: 'var(--primary-400)' }} />
        </div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
        ৳{value.toFixed(2)}M
      </div>
    </div>
  )
}

function AchievementRow({ rank, label, pct }) {
  const isTop3 = rank <= 3
  const idx = rank - 1
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(13,43,69,.05)' }}>
      <div style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
        background: isTop3 ? MEDAL_BG[idx] : '#F4F4F5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 800,
        color: isTop3 ? MEDAL[idx] : '#A1A1AA',
      }}>{rank}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 3 }}>
          {label}
        </div>
        <div style={{ height: 3, background: '#E4E4E7', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', borderRadius: 2, background: 'var(--good)' }} />
        </div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
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
