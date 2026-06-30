import PageHeader from '../components/PageHeader.jsx'
import FilterBar from './FilterBar.jsx'

export default function PageFrame({ title, sub, actions, children }) {
  const right = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <FilterBar />
      {actions}
    </div>
  )

  return (
    <>
      <PageHeader title={title} sub={sub} actions={right} />
      {children}
    </>
  )
}
