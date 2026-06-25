import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import FilterBar from './FilterBar.jsx'
import './layout.css'

/* The universal shell. Children = page content (Zone 4 only). */
export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <div className="app-scroll">
          <FilterBar />
          <div className="app-content">{children}</div>
        </div>
      </div>
    </div>
  )
}
