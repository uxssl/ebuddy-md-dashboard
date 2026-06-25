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
      <div className="tb-nav"></div>
      <div className="tb-right">
        <button style={{
          background: 'linear-gradient(135deg, #42A5F5 0%, #1565C0 100%)',
          color: '#fff',
          border: 'none',
          padding: '8px 18px 8px 14px',
          borderRadius: '20px',
          fontWeight: '600',
          fontSize: '12.5px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(21,101,192,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Task
        </button>
        <div className="tb-icon">
          <BellIcon /><span className="tb-badge">23</span>
        </div>
        <div className="tb-av">MD</div>
      </div>
    </header>
  )
}
