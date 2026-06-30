import PageFrame from '../layout/PageFrame.jsx'
import ChartCard from '../components/ChartCard.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { useFilters } from '../context/FilterContext.jsx'

export default function Projects() {
  const { projects } = useFilters()
  const createBtn = (
    <button style={{ background:'var(--primary)', color:'#fff', border:'none',
      borderRadius:'var(--r-sm)', padding:'9px 16px', fontSize:12, fontWeight:600, cursor:'pointer' }}>
      + Create Project
    </button>
  )

  return (
    <PageFrame
      title="Project List"
      sub="Project Management › Project Details › Project List"
      actions={createBtn}
    >
      <ChartCard title="Projects" sub={`${projects.length} active projects`}>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Project</th><th>Code</th><th>Type</th><th>Service</th>
                <th>Department</th><th>Responsible</th><th className="t-num">Value</th><th>Client</th>
                <th className="t-num">Tasks</th><th className="t-num">Overdue</th>
                <th className="t-num">Stuck</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={i}>
                  <td style={{ fontWeight:700 }}>{p.name}</td>
                  <td className="t-muted">{p.code}</td>
                  <td>{p.type}</td>
                  <td className="t-muted">{p.service}</td>
                  <td>{p.dept}</td>
                  <td className="t-muted">{p.responsible}</td>
                  <td className="t-good">{p.value}</td>
                  <td className="t-muted">{p.client}</td>
                  <td className="t-num">{p.tasks}</td>
                  <td className={'t-num ' + (p.overdue ? 't-danger' : '')}>{p.overdue}</td>
                  <td className={'t-num ' + (p.stuck ? 't-danger' : '')}>{p.stuck}</td>
                  <td><StatusBadge value={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </PageFrame>
  )
}
