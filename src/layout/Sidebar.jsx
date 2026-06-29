import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Users, Briefcase,
  LineChart, Calendar, ChevronLeft,
} from 'lucide-react'

const ICONS = {
  dashboard:   LayoutDashboard,
  departments: Building2,
  employees:   Users,
  projects:    Briefcase,
  reports:     LineChart,
  meetings:    Calendar,
  chevron:     ChevronLeft,
}

function Icon({ name }) {
  const LucideIcon = ICONS[name]
  return <LucideIcon size={19} strokeWidth={1.9} />
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
