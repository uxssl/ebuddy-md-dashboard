import { useLocation } from 'react-router-dom'

const TITLES = {
  '/dashboard': 'Dashboard',
  '/departments': 'Departments',
  '/employees': 'Employees',
  '/projects': 'Projects',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const current = TITLES[pathname] || 'Dashboard'

  return (
    <header className="topbar">
      <div className="tb-bc">
        Home › <b>Md-Dashboard</b> › {current}
      </div>
      <div className="tb-right">
        <div className="tb-icon">
          🔔<span className="tb-badge">23</span>
        </div>
        <div className="tb-av">MD</div>
      </div>
    </header>
  )
}
