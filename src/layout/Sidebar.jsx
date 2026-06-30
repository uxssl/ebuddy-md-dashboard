import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, LayoutTemplate, Building2, Users,
  Briefcase, LineChart, Calendar, PanelLeft,
} from 'lucide-react'

const SECTIONS = [
  {
    label: 'Overview',
    items: [
      { to: '/dashboard',    Icon: LayoutDashboard, label: 'Dashboard',    color: '#6366F1', bg: '#EEF2FF' },
      { to: '/dashboard-v2', Icon: LayoutTemplate,  label: 'Dashboard V2', color: '#8B5CF6', bg: '#F5F3FF' },
    ],
  },
  {
    label: 'Manage',
    items: [
      { to: '/departments', Icon: Building2, label: 'Departments', color: '#0EA5E9', bg: '#F0F9FF' },
      { to: '/employees',   Icon: Users,     label: 'Employees',   color: '#10B981', bg: '#ECFDF5' },
      { to: '/projects',    Icon: Briefcase, label: 'Projects',    color: '#F59E0B', bg: '#FFFBEB' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { to: '/reports',  Icon: LineChart, label: 'Reports',  color: '#EF4444', bg: '#FEF2F2' },
      { to: '/meetings', Icon: Calendar,  label: 'Meetings', color: '#14B8A6', bg: '#F0FDFA' },
    ],
  },
]

function Tooltip({ label, children }) {
  const [pos, setPos] = useState(null)
  const ref = useRef(null)

  function handleEnter() {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setPos({ top: r.top + r.height / 2, left: r.right + 10 })
  }

  return (
    <div ref={ref} onMouseEnter={handleEnter} onMouseLeave={() => setPos(null)}>
      {children}
      {pos && createPortal(
        <div style={{
          position: 'fixed', top: pos.top, left: pos.left,
          transform: 'translateY(-50%)',
          background: 'rgba(15,15,26,.95)',
          backdropFilter: 'blur(8px)',
          color: '#F4F4F5', fontSize: 12, fontWeight: 500,
          padding: '5px 10px', borderRadius: 7,
          whiteSpace: 'nowrap', zIndex: 9999, pointerEvents: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,.35)',
        }}>{label}</div>,
        document.body
      )}
    </div>
  )
}

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <aside style={{
      width: open ? 232 : 60,
      minWidth: open ? 232 : 60,
      height: '100vh',
      background: 'linear-gradient(175deg, #0F0F1A 0%, #12142B 40%, #0D1B3E 100%)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width .22s cubic-bezier(.4,0,.2,1), min-width .22s cubic-bezier(.4,0,.2,1)',
      overflow: 'hidden',
      flexShrink: 0,
      boxShadow: '1px 0 0 rgba(255,255,255,.04), 4px 0 32px rgba(0,0,0,.35)',
    }}>

      {/* Brand */}
      <div style={{
        height: 58, flexShrink: 0,
        display: 'flex', alignItems: 'center',
        padding: open ? '0 14px' : '0',
        justifyContent: open ? 'flex-start' : 'center',
        gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, flexShrink: 0,
          background: 'linear-gradient(135deg, #6366F1, #2563EB)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 16, color: '#fff',
          boxShadow: '0 4px 12px rgba(99,102,241,.4)',
        }}>S</div>
        {open && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#F4F4F5', letterSpacing: '-.1px' }}>SSL Wireless</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 1 }}>MD Dashboard</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 8px', overflowY: 'auto', overflowX: 'hidden' }}>
        {SECTIONS.map((sec, si) => (
          <div key={sec.label} style={{ marginBottom: si < SECTIONS.length - 1 ? 14 : 0 }}>
            {open && (
              <div style={{
                fontSize: 9.5, fontWeight: 600, letterSpacing: '.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,.28)',
                padding: '6px 8px 5px',
              }}>{sec.label}</div>
            )}
            {!open && si > 0 && (
              <div style={{ height: 1, background: 'rgba(255,255,255,.07)', margin: '6px 8px 8px' }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sec.items.map(({ to, Icon, label, color, bg }) => {
                const isActive = location.pathname === to
                const item = (
                  <NavLink to={to}
                    style={{
                      display: 'flex', alignItems: 'center',
                      gap: 10, height: 40,
                      padding: open ? '0 10px' : '0',
                      justifyContent: open ? 'flex-start' : 'center',
                      borderRadius: 10,
                      textDecoration: 'none',
                      fontSize: 13.5,
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#FFFFFF' : 'rgba(255,255,255,.45)',
                      background: isActive
                        ? 'rgba(255,255,255,.12)'
                        : 'transparent',
                      boxShadow: isActive ? 'inset 0 0 0 1px rgba(255,255,255,.15)' : 'none',
                      transition: 'background .12s, color .12s, box-shadow .12s',
                      whiteSpace: 'nowrap', overflow: 'hidden',
                    }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.color = 'rgba(255,255,255,.75)' }}}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,.45)' }}}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                      background: isActive ? 'rgba(255,255,255,.14)' : 'rgba(255,255,255,.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background .12s',
                    }}>
                      <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8}
                        color={isActive ? '#FFFFFF' : 'rgba(255,255,255,.4)'}
                      />
                    </div>
                    {open && label}
                  </NavLink>
                )
                return open
                  ? <div key={to}>{item}</div>
                  : <Tooltip key={to} label={label}>{item}</Tooltip>
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '8px 8px 14px', flexShrink: 0 }}>
        <button onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', gap: 9,
            width: '100%', height: 36,
            padding: open ? '0 10px' : '0',
            justifyContent: open ? 'flex-start' : 'center',
            borderRadius: 10, border: 'none',
            background: 'transparent', cursor: 'pointer',
            color: '#C4C4CC', fontSize: 13,
            whiteSpace: 'nowrap', overflow: 'hidden',
            transition: 'background .1s, color .1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,.04)'; e.currentTarget.style.color = '#71717A' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C4C4CC' }}
        >
          <PanelLeft size={16} strokeWidth={1.7} style={{
            flexShrink: 0,
            transform: open ? 'none' : 'rotate(180deg)',
            transition: 'transform .22s cubic-bezier(.4,0,.2,1)',
          }} />
          {open && 'Collapse'}
        </button>
      </div>

    </aside>
  )
}
