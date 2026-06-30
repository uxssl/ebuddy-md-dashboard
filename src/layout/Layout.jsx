import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import { FilterProvider } from '../context/FilterContext.jsx'
import './layout.css'

/* The universal shell. Children = page content (Zone 4 only). */
export default function Layout({ children }) {
  return (
    <FilterProvider>
      <div className="app-shell">
        <Sidebar />
        <div className="app-main">
          <Topbar />
          <div className="app-scroll">
            <div className="app-content">{children}</div>
          </div>
        </div>
      </div>
    </FilterProvider>
  )
}
