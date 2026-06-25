/* Page title block — same style on every page. */
export default function PageHeader({ title, sub, actions }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'var(--s-4)' }}>
      <div>
        <h1 className="page-title">{title}</h1>
        {sub && <div className="page-sub">{sub}</div>}
      </div>
      {actions && <div style={{ display:'flex', gap:'var(--s-2)' }}>{actions}</div>}
    </div>
  )
}
