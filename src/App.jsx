import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Departments from './pages/Departments.jsx'
import Employees from './pages/Employees.jsx'
import Projects from './pages/Projects.jsx'

/* Every page renders INSIDE <Layout>. That is what guarantees
   identical sidebar + topbar + filter bar on every screen. */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Layout>
  )
}
