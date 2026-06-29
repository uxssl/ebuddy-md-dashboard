import LeaderboardList from './LeaderboardList.jsx'

/* Ranked list card — Top Sales Team, Business Unit, KAM, Achievement */
export default function LeaderboardCard({
  title,
  rows,
  variant = 'revenue',
  onViewAll,
}) {
  return (
    <div className="card dash-leaderboard-card">
      <div className="card-head dash-lb-head">
        <div className="card-title">{title}</div>
        <button
          type="button"
          className="dash-lb-view-all"
          onClick={onViewAll}
        >
          View All
        </button>
      </div>

      <LeaderboardList rows={rows} variant={variant} />
    </div>
  )
}
