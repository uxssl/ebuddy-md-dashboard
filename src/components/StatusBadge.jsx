/* Maps status text -> badge style. Single place for status logic. */
const MAP = {
  Good:    'badge-good',
  Warning: 'badge-warn',
  Overdue: 'badge-danger',
  Active:  'badge-good',
}
export default function StatusBadge({ value }) {
  return <span className={`badge ${MAP[value] || 'badge-good'}`}>{value}</span>
}
