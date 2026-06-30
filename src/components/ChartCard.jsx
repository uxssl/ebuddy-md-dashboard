/* Reusable card wrapper for any chart/section.
   Keeps every panel visually identical across pages. */
export default function ChartCard({ title, sub, tag, tagType = 'good', headExtra, children, style }) {
  return (
    <div className="card" style={style}>
      <div className="card-head">
        <div>
          <div className="card-title">{title}</div>
          {sub && <div className="card-sub">{sub}</div>}
        </div>
        {(headExtra || tag) && (
          <div className="card-head-side">
            {headExtra}
            {tag && <span className={`tag tag-${tagType}`}>{tag}</span>}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
