/* Page title block — same style on every page. */
export default function PageHeader({ title, sub, actions }) {
  return (
    <div className="page-header-row">
      <div>
        <h1 className="page-title">{title}</h1>
        {sub && <div className="page-sub">{sub}</div>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </div>
  )
}
