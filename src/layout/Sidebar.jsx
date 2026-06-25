import { NavLink } from 'react-router-dom'

function Icon({ d }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d={d} />
    </svg>
  )
}

const ICONS = {
  dashboard:   'M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z',
  departments: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z',
  employees:   'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  projects:    'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
  reports:     'M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zM16.2 13h2.8v6h-2.8v-6z',
  meetings:    'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z',
}

const NAV = [
  { group: 'Main', items: [
    { to: '/dashboard',   icon: 'dashboard',   label: 'Dashboard' },
    { to: '/departments', icon: 'departments', label: 'Departments' },
    { to: '/employees',   icon: 'employees',   label: 'Employees' },
    { to: '/projects',    icon: 'projects',    label: 'Projects' },
  ]},
  { group: 'Insights', items: [
    { to: '/reports',  icon: 'reports',  label: 'Reports' },
    { to: '/meetings', icon: 'meetings', label: 'Meetings' },
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
              <span className="ico"><Icon d={ICONS[it.icon]} /></span>
              <span className="nav-label">{it.label}</span>
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
