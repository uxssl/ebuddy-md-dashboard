/* Shared filter bar — same on every page. Wire to real state later. */
export default function FilterBar() {
  return (
    <div className="filter-bar">
      <select className="fb-select" defaultValue="all">
        <option value="all">All Departments</option>
        <option>Engineering</option>
        <option>Data</option>
        <option>Banking &amp; Financial Services</option>
        <option>PMO</option>
      </select>
      <input className="fb-date" type="date" defaultValue="2026-06-01" />
      <input className="fb-date" type="date" defaultValue="2026-06-30" />
      <button className="fb-reset">Reset</button>
    </div>
  )
}
