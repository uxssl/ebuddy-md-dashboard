import {
  ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis,
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, Legend,
} from 'recharts'
import ChartCard from '../components/ChartCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { C } from '../theme.js'
import { kpi, departments, projects, trend, taskSplit } from '../data/mockData.js'

const fmt = n => n.toLocaleString()

/* Department completion bars (sorted worst-first so risk surfaces) */
const deptBars = [...departments]
  .map(d => ({ name: d.name.replace('Service Assurance-Quality', 'SA-Quality').replace('Banking & Financial Services','Banking & Fin').replace('Innovation Center of Excellence','Innovation').replace('Project Management Office','PMO'), completion: d.completion, flag: d.flag }))
  .sort((a, b) => a.completion - b.completion)

const riskProjects = [...projects]
  .filter(p => p.overdue > 0 || p.stuck > 0)
  .sort((a, b) => (b.overdue + b.stuck) - (a.overdue + a.stuck))

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Executive Overview"
        sub="Managing Director · SSL Wireless · June 2026"
      />

      {/* ROW 1 — Health gauge | Dept performance | Task split */}
      <div className="grid" style={{ gridTemplateColumns: '1fr 1.5fr 1fr', marginBottom: 'var(--s-4)' }}>

        {/* Org health gauge */}
        <ChartCard title="Org Health" sub="Weighted completion" tag="▲ 2.1%" tagType="good">
          <div style={{ position: 'relative', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="78%" outerRadius="100%"
                data={[{ value: kpi.orgHealth, fill: C.accent }]}
                startAngle={210} endAngle={-30}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: C.grid }} dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
              <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1 }}>
                {kpi.orgHealth}<span style={{ fontSize: 18 }}>%</span>
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                {fmt(kpi.totalTasks)} tasks
              </div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'center', gap:16, fontSize:11, color:C.muted }}>
            <span>✅ {fmt(kpi.done)} done</span>
            <span style={{ color:C.danger, fontWeight:700 }}>⚠ {kpi.overdue} overdue</span>
          </div>
        </ChartCard>

        {/* Department performance */}
        <ChartCard title="Department Performance" sub="Completion rate by unit · worst first" tag="2 at risk" tagType="warn">
          <ResponsiveContainer width="100%" height={224}>
            <BarChart data={deptBars} layout="vertical" margin={{ left: 8, right: 28 }}>
              <CartesianGrid horizontal={false} stroke={C.grid} />
              <XAxis type="number" domain={[90, 100]} tick={{ fontSize: 10, fill: C.muted }} unit="%" />
              <YAxis type="category" dataKey="name" width={92}
                tick={{ fontSize: 11, fill: C.ink }} axisLine={false} tickLine={false} />
              <Tooltip formatter={v => `${v}%`} cursor={{ fill: 'rgba(0,180,166,.06)' }} />
              <Bar dataKey="completion" radius={[0, 6, 6, 0]} barSize={16}>
                {deptBars.map((d, i) => (
                  <Cell key={i} fill={d.flag === 'Warning' ? C.warn : C.accent} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Task distribution donut */}
        <ChartCard title="Task Distribution" sub="All tracked work">
          <div style={{ position: 'relative', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={taskSplit} dataKey="value" nameKey="name"
                  innerRadius={52} outerRadius={72} paddingAngle={2} stroke="none">
                  {taskSplit.map((s, i) => <Cell key={i} fill={s.colorHex || hex(s.color)} />)}
                </Pie>
                <Tooltip formatter={v => fmt(v)} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{(kpi.totalTasks/1000).toFixed(1)}k</div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1 }}>TASKS</div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:4 }}>
            {taskSplit.map(s => (
              <div key={s.name} style={{ display:'flex', alignItems:'center', gap:7, fontSize:11 }}>
                <span style={{ width:9, height:9, borderRadius:3, background: hex(s.color) }} />
                {s.name}
                <b style={{ marginLeft:'auto' }}>{fmt(s.value)}</b>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* ROW 2 — Cost burn trend | Project risk */}
      <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr' }}>

        <ChartCard title="Cost Burn vs Delivery" sub="6-month trend · indexed output vs spend" tag="On budget" tagType="good">
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={trend} margin={{ left: -16, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="gDel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.primary400} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={C.primary400} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={C.grid} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Area name="Delivery output" type="monotone" dataKey="delivery"
                stroke={C.primary400} strokeWidth={3} fill="url(#gDel)" />
              <Area name="Cost burned" type="monotone" dataKey="burn"
                stroke={C.warn} strokeWidth={3} strokeDasharray="6 5" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Project Risk" sub="Overdue · stuck work" tag={`${riskProjects.length} hot`} tagType="danger">
          <div>
            {riskProjects.map(p => (
              <div key={p.name} style={{ display:'flex', alignItems:'center', gap:10,
                padding:'10px 0', borderBottom:`1px solid ${C.line}` }}>
                <div style={{ width:32, height:32, borderRadius:9, display:'flex', alignItems:'center',
                  justifyContent:'center', fontSize:14,
                  background: p.overdue > 1 ? 'var(--danger-bg)' : 'var(--warn-bg)' }}>
                  {p.overdue > 1 ? '🔥' : '⚠️'}
                </div>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:700 }}>{p.name}</div>
                  <div style={{ fontSize:10, color:C.muted }}>{p.dept} · #{p.code}</div>
                </div>
                <div style={{ marginLeft:'auto', textAlign:'right' }}>
                  <div style={{ fontSize:16, fontWeight:800, color: p.overdue>1?C.danger:C.warn }}>
                    {p.overdue || p.stuck}
                  </div>
                  <div style={{ fontSize:9, color:C.muted }}>{p.overdue ? 'overdue' : 'stuck'}</div>
                </div>
              </div>
            ))}
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 0' }}>
              <div style={{ width:32, height:32, borderRadius:9, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:14, background:'var(--good-bg)' }}>✓</div>
              <div>
                <div style={{ fontSize:12.5, fontWeight:700 }}>All other projects</div>
                <div style={{ fontSize:10, color:C.muted }}>On track</div>
              </div>
              <div style={{ marginLeft:'auto', fontSize:16, fontWeight:800, color:C.good }}>0</div>
            </div>
          </div>
        </ChartCard>
      </div>
    </>
  )
}

/* CSS var name -> hex (taskSplit stores var() strings) */
function hex(v) {
  const map = {
    'var(--good)': C.good, 'var(--warn)': C.warn,
    'var(--danger)': C.danger, 'var(--info)': C.info,
  }
  return map[v] || v
}
