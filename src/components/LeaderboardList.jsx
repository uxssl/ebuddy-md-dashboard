const RANK_COLORS = ['#6366F1', '#818CF8', '#A5B4FC']

function Row({ rank, label, valueLine }) {
  const isTop3 = rank <= 3
  const rankColor = isTop3 ? RANK_COLORS[rank - 1] : 'var(--muted)'
  const isFirst = rank === 1

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '7px 9px', borderRadius: 9,
      background: isFirst ? '#EEF2FF' : 'transparent',
    }}>
      <span style={{
        fontSize: 11, fontWeight: 800, color: rankColor,
        width: 16, flexShrink: 0, fontVariantNumeric: 'tabular-nums',
      }}>
        {rank}
      </span>
      <span style={{
        flex: 1, fontSize: 12.5,
        fontWeight: isFirst ? 600 : 500,
        color: 'var(--ink)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 12.5, fontWeight: 700, flexShrink: 0,
        color: isFirst ? '#6366F1' : 'var(--ink)',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {valueLine}
      </span>
    </div>
  )
}

export default function LeaderboardList({ rows, variant = 'revenue' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {rows.map((row, i) => {
        const rank = i + 1
        const valueLine = variant === 'achievement'
          ? `${row.pct}%`
          : `৳${row.value.toFixed(2)}M`
        return <Row key={row.name} rank={rank} label={row.name} valueLine={valueLine} />
      })}
    </div>
  )
}
