import { NavLink } from 'react-router-dom'

const NAV = [
  { group: 'Main', items: [
    { to: '/dashboard',   ico: '▦', label: 'Dashboard' },
    { to: '/departments', ico: '🏢', label: 'Departments' },
    { to: '/employees',   ico: '👥', label: 'Employees' },
    { to: '/projects',    ico: '📋', label: 'Projects' },
  ]},
  { group: 'Insights', items: [
    { to: '/reports',  ico: '📈', label: 'Reports' },
    { to: '/meetings', ico: '📅', label: 'Meetings' },
  ]},
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="sb-logo">S</div>
        <div className="sb-brand-text">
          <b>SSL WIRELESS</b>
          <span>MD Dashboard</span>
        </div>
      </div>

      {NAV.map(sec => (
        <div key={sec.group}>
          <div className="sb-group">{sec.group}</div>
          {sec.items.map(it => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) => 'sb-nav' + (isActive ? ' active' : '')}
            >
              <span className="ico">{it.ico}</span>
              {it.label}
            </NavLink>
          ))}
        </div>
      ))}

      <div className="sb-foot">
        v1.0 · Task Engine Live<br />© SSL Wireless 2026
      </div>
    </aside>
  )
}
