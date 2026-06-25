import PageHeader from '../components/PageHeader.jsx'
import ChartCard from '../components/ChartCard.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { C } from '../theme.js'
import { employees } from '../data/mockData.js'

const initials = name => name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase()

export default function Employees() {
  return (
    <>
      <PageHeader title="Employees" sub="Employee task performance tracker · completion · overdue · stuck" />

      <ChartCard title="Employee Task Performance Tracker" sub="Cost per employee · task completion · projects involved">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Employee</th><th>Department</th>
                <th className="t-num">Projects</th><th className="t-num">Assigned</th>
                <th className="t-num">To-Do</th><th className="t-num">In Prog</th>
                <th className="t-num">Done</th><th className="t-num">Overdue</th>
                <th className="t-num">Stuck</th><th className="t-num">Completion</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(e => (
                <tr key={e.name}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ width:30, height:30, borderRadius:'50%', flexShrink:0,
                        background:`linear-gradient(135deg, ${C.primary400}, ${C.accent})`,
                        color:'#fff', fontSize:10, fontWeight:700,
                        display:'flex', alignItems:'center', justifyContent:'center' }}>
                        {initials(e.name)}
                      </span>
                      <span style={{ fontWeight:700 }}>{e.name}</span>
                    </div>
                  </td>
                  <td className="t-muted">{e.dept}</td>
                  <td className="t-num">{e.projects}</td>
                  <td className="t-num">{e.assigned.toLocaleString()}</td>
                  <td className="t-num">{e.todo}</td>
                  <td className="t-num">{e.wip}</td>
                  <td className="t-num t-good">{e.done.toLocaleString()}</td>
                  <td className={'t-num ' + (e.overdue ? 't-danger' : '')}>{e.overdue}</td>
                  <td className="t-num">{e.stuck}</td>
                  <td className="t-num">{e.completion}%</td>
                  <td><StatusBadge value={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </>
  )
}
