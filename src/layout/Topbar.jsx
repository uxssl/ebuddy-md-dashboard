import { Bell, Plus } from 'lucide-react'

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
          <Plus size={18} strokeWidth={2.5} />
          Create Task
        </button>
        <div className="tb-icon">
          <Bell size={17} /><span className="tb-badge">23</span>
        </div>
        <div className="tb-av">MD</div>
      </div>
    </header>
  )
}
