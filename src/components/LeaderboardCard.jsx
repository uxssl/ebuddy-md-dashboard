import LeaderboardList from './LeaderboardList.jsx'

export default function LeaderboardCard({ title, rows, variant = 'revenue', onViewAll }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '14px 16px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)' }}>{title}</span>
        <button
          type="button"
          onClick={onViewAll}
          style={{
            border: 'none', background: 'none', padding: 0,
            fontFamily: 'var(--font)', fontSize: 10.5, fontWeight: 500,
            color: 'var(--primary-400)', cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >View All →</button>
      </div>
      <LeaderboardList rows={rows} variant={variant} />
    </div>
  )
}
