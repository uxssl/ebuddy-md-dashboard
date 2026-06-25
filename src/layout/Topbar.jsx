import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/dashboard',   label: 'Dashboard' },
  { to: '/departments', label: 'Departments' },
  { to: '/employees',   label: 'Employees' },
  { to: '/projects',    label: 'Projects' },
]

function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
  )
}

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="tb-left">
        <div className="tb-left-title">SSL Wireless</div>
        <div className="tb-left-sub">Managing Director · June 2026</div>
      </div>
      <nav className="tb-nav">
        {NAV.map(n => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) => 'tb-link' + (isActive ? ' active' : '')}
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="tb-right">
        <div className="tb-icon">
          <BellIcon /><span className="tb-badge">23</span>
        </div>
        <div className="tb-av">MD</div>
      </div>
    </header>
  )
}
