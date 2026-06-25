import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts'
import PageHeader from '../components/PageHeader.jsx'
import ChartCard from '../components/ChartCard.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { C } from '../theme.js'
import { departments } from '../data/mockData.js'

const totals = departments.reduce((a, d) => ({
  projects: a.projects + d.projects, total: a.total + d.total,
  todo: a.todo + d.todo, wip: a.wip + d.wip, done: a.done + d.done,
  overdue: a.overdue + d.overdue, stuck: a.stuck + d.stuck,
}), { projects:0, total:0, todo:0, wip:0, done:0, overdue:0, stuck:0 })

const chart = departments.map(d => ({
  name: d.name.length > 14 ? d.name.slice(0,12)+'…' : d.name,
  completion: d.completion, flag: d.flag,
}))

export default function Departments() {
  return (
    <>
      <PageHeader title="Departments" sub="Department task performance · completion · overdue · stuck" />

      <ChartCard title="Completion by Department" sub="Visual comparison across units" style={{ marginBottom:'var(--s-4)' }}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chart} margin={{ top: 10 }}>
            <CartesianGrid vertical={false} stroke={C.grid} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: C.muted }} interval={0} angle={-12} textAnchor="end" height={50} />
            <YAxis domain={[90,100]} unit="%" tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip formatter={v => `${v}%`} />
            <Bar dataKey="completion" radius={[6,6,0,0]} barSize={36}>
              {chart.map((d,i) => <Cell key={i} fill={d.flag==='Warning'?C.warn:C.accent} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Department Task Performance" sub="Completion rate · overdue · stuck · cost burned">
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>Department</th><th>Head</th>
                <th className="t-num">Projects</th><th className="t-num">Total</th>
                <th className="t-num">To-Do</th><th className="t-num">In Prog</th>
                <th className="t-num">Done</th><th className="t-num">Overdue</th>
                <th className="t-num">Stuck</th><th className="t-num">Completion</th>
                <th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(d => (
                <tr key={d.name}>
                  <td style={{ fontWeight:700 }}>{d.name}</td>
                  <td className="t-muted">{d.head}</td>
                  <td className="t-num">{d.projects}</td>
                  <td className="t-num">{d.total.toLocaleString()}</td>
                  <td className="t-num">{d.todo}</td>
                  <td className="t-num">{d.wip}</td>
                  <td className="t-num t-good">{d.done.toLocaleString()}</td>
                  <td className={'t-num ' + (d.overdue ? 't-danger' : '')}>{d.overdue}</td>
                  <td className="t-num">{d.stuck}</td>
                  <td className="t-num">{d.completion}%</td>
                  <td><StatusBadge value={d.flag} /></td>
                </tr>
              ))}
              <tr style={{ fontWeight:700, background:'#FAFAFA' }}>
                <td>TOTAL ({departments.length})</td><td></td>
                <td className="t-num">{totals.projects}</td>
                <td className="t-num">{totals.total.toLocaleString()}</td>
                <td className="t-num">{totals.todo}</td>
                <td className="t-num">{totals.wip}</td>
                <td className="t-num t-good">{totals.done.toLocaleString()}</td>
                <td className="t-num t-danger">{totals.overdue}</td>
                <td className="t-num">{totals.stuck}</td>
                <td className="t-num">—</td><td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ChartCard>
    </>
  )
}
