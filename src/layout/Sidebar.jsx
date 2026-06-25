import { useState } from 'react'
import { NavLink } from 'react-router-dom'

/* Clean outline (Lucide-style) icons */
const ICONS = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
    </>
  ),
  departments: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16" />
      <path d="M13 21V10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11" />
      <path d="M8 8h0M8 12h0M8 16h0M16 13h0M16 17h0" />
    </>
  ),
  employees: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  projects: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  reports: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l3.5-4 3 2.5L21 6" />
      <path d="M16 6h5v5" />
    </>
  ),
  meetings: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
    </>
  ),
  chevron: <path d="M15 18l-6-6 6-6" />,
}

function Icon({ name }) {
  return (
    <svg
      width="19" height="19" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  )
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
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={'sidebar' + (collapsed ? '' : ' expanded')}>
      <div className="sb-brand">
        <div className="sb-logo">S</div>
        {!collapsed && (
          <div className="sb-brand-text">
            <b>SSL WIRELESS</b>
            <span>MD Dashboard</span>
          </div>
        )}
      </div>

      <nav className="sb-nav-wrap">
        {NAV.map(sec => (
          <div key={sec.group} className="sb-section">
            {!collapsed && <div className="sb-group">{sec.group}</div>}
            {sec.items.map(it => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) => 'sb-nav' + (isActive ? ' active' : '')}
              >
                <span className="ico"><Icon name={it.icon} /></span>
                <span className="nav-label">{it.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <button
        className="sb-toggle"
        onClick={() => setCollapsed(c => !c)}
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        <span className="ico" style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <Icon name="chevron" />
        </span>
        {!collapsed && <span className="nav-label">Collapse</span>}
      </button>

      {!collapsed && (
        <div className="sb-foot">
          v1.0 · Task Engine Live<br />© SSL Wireless 2026
        </div>
      )}
    </aside>
  )
}
