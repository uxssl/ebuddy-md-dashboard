function AchievementRow({ rank, label, pct }) {
  const barWidth = Math.min(pct, 100)
  return (
    <div className="dash-lb-row">
      <span className="dash-lb-rank">{rank}</span>
      <span className="dash-lb-label">{label}</span>
      <div className="dash-lb-achieve">
        <div className="dash-lb-achieve-track">
          <div
            className="dash-lb-achieve-fill"
            style={{ width: `${barWidth}%` }}
          />
        </div>
        <span className="dash-lb-value">{pct}%</span>
      </div>
    </div>
  )
}

function RevenueRow({ rank, label, value }) {
  return (
    <div className="dash-lb-row">
      <span className="dash-lb-rank">{rank}</span>
      <span className="dash-lb-label">{label}</span>
      <span className="dash-lb-value">৳{value.toFixed(2)}M</span>
    </div>
  )
}

export default function LeaderboardList({ rows, variant = 'revenue' }) {
  return (
    <div className="dash-lb-list">
      {rows.map((row, i) => {
        const rank = i + 1
        if (variant === 'achievement') {
          return (
            <AchievementRow
              key={row.name}
              rank={rank}
              label={row.name}
              pct={row.pct}
            />
          )
        }
        return (
          <RevenueRow
            key={row.name}
            rank={rank}
            label={row.name}
            value={row.value}
          />
        )
      })}
    </div>
  )
}
