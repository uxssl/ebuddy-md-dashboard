import { useState, useEffect, useRef } from 'react'
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  BarChart, Bar,
} from 'recharts'
import ChartCard from '../components/ChartCard.jsx'
import { C } from '../theme.js'
import {
  projectStatus, totalProjects,
  workloadDist,
  deptTaskOverview,
  projectsOverdue,
  topEmployeesOverdue,
  productivityTrend,
  revenueMatrix,
  revenueVsCost,
} from '../data/mockData.js'

const fmt = n => n.toLocaleString()

function ProgressBar({ value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: '#EAF0F6', borderRadius: 4, overflow: 'hidden', minWidth: 48 }}>
        <div style={{
          width: `${value}%`, height: '100%', borderRadius: 4,
          background: value === 100 ? C.good : C.accent,
        }} />
      </div>
      <span style={{ fontSize: 11, color: C.muted, width: 30, textAlign: 'right', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{value}%</span>
    </div>
  )
}

const pgnBtn = { width: 28, height: 28, border: `1px solid ${C.line}`, borderRadius: 6, background: 'white', cursor: 'pointer', color: C.muted, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }

function Pagination({ count = 2 }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, marginTop: 8, borderTop: '1px solid #EEEEEE' }}>
      <span style={{ fontSize: 11, color: C.muted }}>{count} result{count !== 1 ? 's' : ''}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <button style={pgnBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button style={{ ...pgnBtn, background: C.primary400, border: 'none', color: 'white', fontWeight: 700, fontSize: 12 }}>1</button>
        <button style={pgnBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
      </div>
    </div>
  )
}

const LAST_IDX = productivityTrend.length - 1

/* How many department tiles to show, by the card's own rendered width */
const WORKLOAD_BREAKS = [
  { min: 600, n: 4 },
  { min: 0,   n: 3 },
]
const workloadVisible = w => (WORKLOAD_BREAKS.find(b => w > b.min) || { n: 3 }).n

function WorkloadBar() {
  const [open, setOpen] = useState(false)
  const [w, setW] = useState(1200)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(entries => {
      const cw = entries[0]?.contentRect.width
      if (cw) setW(cw)
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  const count = workloadVisible(w)
  const top = workloadDist.slice(0, count)
  const rest = workloadDist.slice(count)
  const hasMore = rest.length > 0
  const restPct = rest.reduce((s, d) => s + d.pct, 0)
  const restTasks = rest.reduce((s, d) => s + d.tasks, 0)

  const segments = hasMore
    ? [...top, {
        dept: open ? 'Show less' : `+${rest.length} more`,
        pct: Math.max(restPct, 8),
        tasks: restTasks, bg: '#334155', isOthers: true,
      }]
    : top

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', gap: 4, height: 140, marginBottom: open ? 12 : 0 }}>
        {segments.map(d => {
          const pctVal = d.isOthers ? restPct : d.pct
          const taskVal = d.isOthers ? restTasks : d.tasks
          const nameTxt = d.isOthers ? (open ? '↑ Show less' : `+${rest.length} more`) : d.dept
          return (
            <div
              key={d.dept}
              title={d.isOthers ? `${rest.length} more · ${restPct}% · ${restTasks} tasks` : `${d.dept} — ${d.pct}% · ${d.tasks} tasks`}
              onClick={d.isOthers ? () => setOpen(o => !o) : undefined}
              style={{
                flex: `${d.isOthers ? Math.min(pctVal, 12) : pctVal} 1 0`, minWidth: 0,
                background: d.isOthers
                  ? 'linear-gradient(135deg, #334155 0%, #0F172A 100%)'
                  : `linear-gradient(145deg, ${d.bg} 0%, ${d.bg}DD 100%)`,
                border: d.isOthers ? '1px dashed rgba(255,255,255,.45)' : 'none',
                borderRadius: 12, padding: '16px 18px', color: '#fff', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                cursor: d.isOthers ? 'pointer' : 'default',
                transition: 'flex .2s',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.96, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {nameTxt}
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{pctVal}%</div>
                <div style={{ fontSize: 10, opacity: 0.82, marginTop: 3, whiteSpace: 'nowrap' }}>{taskVal} Tasks</div>
              </div>
            </div>
          )
        })}
      </div>

      {open && hasMore && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '8px 18px',
        }}>
          {rest.map(d => (
            <div key={d.dept} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: d.bg, flexShrink: 0 }} />
              <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.dept}</span>
              <span style={{ fontWeight: 700 }}>{d.pct}%</span>
              <span style={{ color: C.muted, fontSize: 11, minWidth: 28, textAlign: 'right' }}>{d.tasks}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  return (
    <>

      {/* ROW 1 — Project Status Overview | Workload Distribution */}
      <div className="grid dash-grid-a" style={{ marginBottom: 10 }}>

        {/* Project Status Overview */}
        <ChartCard title="Project Status Overview">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ position: 'relative', width: 156, height: 156, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatus.filter(s => s.value > 0)}
                    dataKey="value"
                    innerRadius={52} outerRadius={72}
                    paddingAngle={1.5} cornerRadius={3}
                    stroke="none"
                  >
                    {projectStatus.filter(s => s.value > 0).map((s, i) => (
                      <Cell key={i} fill={s.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} projects`, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none',
              }}>
                <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 1 }}>{totalProjects}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 3, letterSpacing: 0.2 }}>Total Projects</div>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {projectStatus.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13 }}>{s.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, minWidth: 38, textAlign: 'right' }}>{s.pct}%</span>
                  <span style={{ fontSize: 12, color: C.muted, minWidth: 26, textAlign: 'right' }}>({s.value})</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* Workload Distribution */}
        <ChartCard title="Workload Distribution" sub="Tasks distribution by department">
          <WorkloadBar />
        </ChartCard>
      </div>

      {/* ROW 2 — Revenue Analytics | Revenue vs Cost Burned */}
      <div className="grid dash-grid-b" style={{ marginBottom: 10 }}>

        {/* Revenue Analytics — horizontal bar by project */}
        <ChartCard title="Revenue Analytics" sub="Revenue by project">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueMatrix.items} layout="vertical" margin={{ left: 8, right: 56, top: 4, bottom: 4 }}>
              <CartesianGrid horizontal={false} stroke={C.grid} />
              <XAxis
                type="number" domain={[0, revenueMatrix.max]}
                tickFormatter={v => `৳${v.toLocaleString()}`}
                tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false}
              />
              <YAxis
                type="category" dataKey="name" width={106}
                tick={{ fontSize: 11, fill: C.ink }} axisLine={false} tickLine={false}
              />
              <Tooltip formatter={v => [`৳${v.toLocaleString()}`, 'Revenue']} cursor={{ fill: 'rgba(108,92,231,.06)' }} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}
                   label={{ position: 'right', formatter: v => `৳${v.toLocaleString()}`, fontSize: 11, fontWeight: 600, fill: C.muted }}>
                {revenueMatrix.items.map((d, i) => (
                  <Cell key={i} fill={d.highlight ? '#6C5CE7' : '#34D3A6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Revenue vs Cost Burned — 6-month trend */}
        <ChartCard title="Revenue vs Cost Burned" sub="Last 6 months (৳K)">
          <div style={{ display: 'flex', gap: 18, marginBottom: 6 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#69D389' }} /> Revenue
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#EF5350' }} /> Cost Burned
            </span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={revenueVsCost} margin={{ left: 0, right: 12, top: 8, bottom: 0 }} barGap={4} barCategoryGap="28%">
              <CartesianGrid vertical={false} stroke={C.grid} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `৳${v}k`} tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} width={46} />
              <Tooltip formatter={(v, n) => [`৳${v}k`, n === 'revenue' ? 'Revenue' : 'Cost Burned']} cursor={{ fill: 'rgba(108,92,231,.06)' }} />
              <Bar dataKey="revenue" fill="#69D389" radius={[4, 4, 0, 0]} maxBarSize={22} />
              <Bar dataKey="cost" fill="#EF5350" radius={[4, 4, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ROW 3 — Team Productivity Trend | Department Task Overview */}
      <div className="grid dash-grid-b" style={{ marginBottom: 10 }}>

        {/* Team Productivity Trend */}
        <ChartCard title="Team Productivity Trend" sub="Average task completion % (Last 6 Months)">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productivityTrend} margin={{ left: 0, right: 12, top: 54, bottom: 0 }}>
              <defs>
                <linearGradient id="gProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.primary400} stopOpacity={0.22} />
                  <stop offset="100%" stopColor={C.primary400} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={C.grid} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis
                domain={[0, 100]} ticks={[0, 25, 50, 75, 100]}
                tickFormatter={v => `${v}%`}
                tick={{ fontSize: 10, fill: C.muted }}
                axisLine={false} tickLine={false} width={38}
              />
              <Tooltip formatter={v => [`${v}%`, 'Completion']} />
              <Area
                type="monotone" dataKey="completion"
                stroke={C.primary400} strokeWidth={2.5} fill="url(#gProd)"
                dot={(props) => {
                  const { cx, cy, index } = props
                  const isLast = index === LAST_IDX
                  return (
                    <g key={`td-${index}`}>
                      {isLast && (
                        <>
                          <rect x={cx - 22} y={cy - 38} width={44} height={22} rx={6} fill={C.primary400} />
                          <text x={cx} y={cy - 23} textAnchor="middle" fill="white" fontSize={11} fontWeight="700">
                            {productivityTrend[LAST_IDX].completion}%
                          </text>
                          <polygon
                            points={`${cx - 5},${cy - 16} ${cx + 5},${cy - 16} ${cx},${cy - 9}`}
                            fill={C.primary400}
                          />
                        </>
                      )}
                      <circle cx={cx} cy={cy} r={isLast ? 5 : 4} fill={C.primary400} stroke="white" strokeWidth={2} />
                    </g>
                  )
                }}
                activeDot={{ r: 5, fill: C.primary400 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Department Task Overview */}
        <ChartCard title="Department Task Overview" sub="Tasks: due • overdue • cost burned • Click row to drill down">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Department</th>
                  <th className="t-num">Projects</th>
                  <th className="t-num">Total Tasks</th>
                  <th className="t-num">To-Do</th>
                  <th className="t-num">In Prog</th>
                  <th className="t-num">Done</th>
                  <th className="t-num">Overdue</th>
                  <th>Completion</th>
                </tr>
              </thead>
              <tbody>
                {deptTaskOverview.map(d => (
                  <tr key={d.dept} style={{ cursor: 'pointer' }}>
                    <td style={{ fontWeight: 500 }}>{d.dept}</td>
                    <td>
                      <span style={{ color: C.primary400, fontWeight: 600, cursor: 'pointer' }}>
                        {d.projects} proj(s)
                      </span>
                    </td>
                    <td className="t-num">{d.total}</td>
                    <td className="t-num">{d.todo}</td>
                    <td className="t-num">{d.inProg}</td>
                    <td className="t-num" style={{ color: d.done > 0 ? C.good : undefined, fontWeight: d.done > 0 ? 700 : undefined }}>{d.done}</td>
                    <td className="t-num" style={{ color: d.overdue > 0 ? C.danger : undefined, fontWeight: d.overdue > 0 ? 700 : undefined }}>{d.overdue}</td>
                    <td style={{ minWidth: 100 }}><ProgressBar value={d.completion} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination count={4} />
        </ChartCard>
      </div>

      {/* ROW 4 — Projects by Overdue | Top Employees */}
      <div className="grid dash-grid-b" style={{ marginBottom: 10 }}>

        {/* Projects by Overdue Tasks */}
        <ChartCard title="Projects by Overdue Tasks" sub="Cost burned on delayed work">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Project</th>
                  <th className="t-num">Total Tasks</th>
                  <th className="t-num">Overdue Tasks</th>
                  <th>Time Taken</th>
                  <th>Risk Level</th>
                  <th className="t-num">Cost Burned</th>
                  <th>Completion</th>
                </tr>
              </thead>
              <tbody>
                {projectsOverdue.map(p => (
                  <tr key={p.name}>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td className="t-num">{p.total}</td>
                    <td className="t-num t-danger">{p.overdue}</td>
                    <td className="t-muted">{p.timeTaken}</td>
                    <td><span className="badge badge-danger">{p.risk}</span></td>
                    <td className="t-num" style={{ fontWeight: 600 }}>৳{fmt(p.costBurned)}</td>
                    <td style={{ minWidth: 90 }}><ProgressBar value={p.completion} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination count={4} />
        </ChartCard>

        <ChartCard title="Top Employees by Overdue Tasks" sub="Highest overdue task count this month">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th className="t-num">Total</th>
                  <th className="t-num">Done</th>
                  <th className="t-num">Overdue</th>
                  <th>Completion</th>
                </tr>
              </thead>
              <tbody>
                {topEmployeesOverdue.map(e => (
                  <tr key={e.name}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%', background: e.avatarBg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: 12, fontWeight: 700, flexShrink: 0,
                        }}>{e.initials}</div>
                        <div style={{ minWidth: 0 }}>
                          <div className="cell-main">{e.name}</div>
                          <div className="cell-sub">{e.dept}</div>
                        </div>
                      </div>
                    </td>
                    <td className="t-num">{e.total}</td>
                    <td className="t-num" style={{ color: C.good, fontWeight: 700 }}>{e.done}</td>
                    <td className="t-num t-danger">{e.overdue}</td>
                    <td style={{ minWidth: 90 }}><ProgressBar value={e.completion} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination count={4} />
        </ChartCard>
      </div>
    </>
  )
}
