import PageHeader from '../components/PageHeader.jsx'
import FilterBar from './FilterBar.jsx'

/* Page title, then filters, then page body — same order on every page. */
export default function PageFrame({ title, sub, actions, children }) {
  return (
    <>
      <PageHeader title={title} sub={sub} actions={actions} />
      <FilterBar />
      {children}
    </>
  )
}
