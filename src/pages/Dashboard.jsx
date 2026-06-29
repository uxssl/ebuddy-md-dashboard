import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, LineChart, Line,
} from 'recharts'
import ChartCard from '../components/ChartCard.jsx'
import { C } from '../theme.js'
import {
  kpiStats,
  revenueByUnit,
  revenueCostTrend,
  deptRevenueDist,
  projectWiseReport,
  topRevenueDrivers,
  businessHealth,
  financialPerfTrend,
} from '../data/mockData.js'

/* ── Sparkline (SVG polyline) ──────────────────────────────────── */
function Sparkline({ data, color }) {
  if (!data || data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const W = 100, H = 30
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * H * 0.8 - H * 0.1}`)
    .join(' ')
  return (
    <svg
      width="100%" height={H}
      viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
      style={{ display: 'block', marginTop: 8 }}
    >
      <polyline
        points={pts} fill="none" stroke={color}
        strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" opacity="0.72"
      />
    </svg>
  )
}

/* ── Progress Bar ───────────────────────────────────────────────── */
function ProgressBar({ value, color = C.accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: '#EAF0F6', borderRadius: 4, overflow: 'hidden', minWidth: 48 }}>
        <div style={{ width: `${value}%`, height: '100%', borderRadius: 4, background: value === 100 ? C.good : color }} />
      </div>
      <span style={{ fontSize: 11, color: C.muted, width: 32, textAlign: 'right', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
        {value}%
      </span>
    </div>
  )
}

/* ── Semi-circle Gauge ─────────────────────────────────────────── */
function GaugeChart({ score, label, changePts }) {
  const R = 70, cx = 100, cy = 90

  const pt = pct => {
    const a = (180 - pct * 1.8) * Math.PI / 180
    return { x: cx + R * Math.cos(a), y: cy - R * Math.sin(a) }
  }

  const arc = (from, to) => {
    const p1 = pt(from), p2 = pt(to)
    return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${R} ${R} 0 0 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }

  const ZONES = [
    { from: 0,  to: 40,  color: '#EF5350' },
    { from: 40, to: 70,  color: '#FFA726' },
    { from: 70, to: 100, color: '#66BB6A' },
  ]

  const healthColor = score >= 70 ? '#66BB6A' : score >= 40 ? '#FFA726' : '#EF5350'

  const filledZones = ZONES
    .map(z => ({ ...z, efFrom: Math.min(z.from, score), efTo: Math.min(z.to, score) }))
    .filter(z => z.efTo > z.efFrom)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width="200" height="105" viewBox="0 0 200 95" style={{ overflow: 'visible' }}>
        {/* Gray background track */}
        <path d={arc(0, 100)} fill="none" stroke="#EEEEEE" strokeWidth="12" strokeLinecap="butt" />
        {/* Colored zone arcs */}
        {filledZones.map((z, i) => (
          <path key={i} d={arc(z.efFrom, z.efTo)} fill="none" stroke={z.color} strokeWidth="12" strokeLinecap="butt" />
        ))}
        {/* Round cap at start */}
        <circle cx={pt(0).x} cy={pt(0).y} r="6" fill={filledZones.length ? filledZones[0].color : '#EEEEEE'} />
        {/* Round cap at score end */}
        {score > 0 && score < 100 && (
          <circle cx={pt(score).x} cy={pt(score).y} r="6" fill={healthColor} />
        )}
        {/* Score number */}
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="34" fontWeight="800" fill={C.ink}>{score}</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fontSize="12" fill={healthColor} fontWeight="700">{label}</text>
      </svg>
      {changePts != null && (
        <div style={{ fontSize: 11, color: C.good, fontWeight: 600, marginTop: -2 }}>
          ↑ {changePts} pts vs May 2026
        </div>
      )}
    </div>
  )
}

/* ── KPI Icons (inline SVG) ────────────────────────────────────── */
const ICONS = {
  revenue: ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" />
    </svg>
  ),
  profit: ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  margin: ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z" />
    </svg>
  ),
  cash: ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M4 10v7h3v-7H4zm6.5 0v7h3v-7h-3zM2 19h20v3H2v-3zm15-9v7h3v-7h-3zM12 1L2 6v2h20V6L12 1z" />
    </svg>
  ),
  clients: ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  ),
}

/* ── KPI Stat Card ─────────────────────────────────────────────── */
function KpiCard({ stat }) {
  const Icon = ICONS[stat.iconType]
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: `${stat.color}1A`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon color={stat.color} />
        </div>
        <span style={{ fontSize: 11.5, color: C.muted, fontWeight: 500 }}>{stat.label}</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}>
        {stat.value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
        <span style={{ color: stat.up ? C.good : C.danger, fontWeight: 700 }}>
          {stat.up ? '↑' : '↓'} {stat.change}%
        </span>
        <span style={{ color: C.muted }}>{stat.vs}</span>
      </div>
      <Sparkline data={stat.spark} color={stat.color} />
    </div>
  )
}

/* ── Bar colors for Revenue by Unit ────────────────────────────── */
const UNIT_BAR_COLORS = ['#1565C0', '#00ACC1', '#6C5CE7', '#2E7D32', '#EF6C00']

/* ── Checkmark icon for health metrics ─────────────────────────── */
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={C.accent} style={{ flexShrink: 0 }}>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )
}

/* ── Custom legend marker (line) ───────────────────────────────── */
function LineLegendItem({ color, dashed, label }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: C.muted }}>
      <svg width="18" height="10" viewBox="0 0 18 10">
        {dashed
          ? <line x1="0" y1="5" x2="18" y2="5" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
          : <line x1="0" y1="5" x2="18" y2="5" stroke={color} strokeWidth="2" />
        }
        <circle cx="9" cy="5" r="3" fill={color} stroke="white" strokeWidth="1.5" />
      </svg>
      {label}
    </span>
  )
}

/* ── Dashboard ─────────────────────────────────────────────────── */
export default function Dashboard() {
  const totalRevenue  = projectWiseReport.reduce((s, r) => s + r.revenue, 0)
  const totalTarget   = projectWiseReport.reduce((s, r) => s + r.target,  0)
  const totalAchieve  = Math.round(projectWiseReport.reduce((s, r) => s + r.achievement, 0) / projectWiseReport.length)

  return (
    <>

      {/* ── Row 1: KPI Stat Cards ─────────────────────────────── */}
      <div className="grid dash-grid-5" style={{ marginBottom: 10 }}>
        {kpiStats.map(s => <KpiCard key={s.label} stat={s} />)}
      </div>

      {/* ── Row 2: Revenue Analytics | Revenue vs Cost Burned ─── */}
      <div className="grid dash-grid-b" style={{ marginBottom: 10 }}>

        <ChartCard title="Revenue Analytics" sub="Revenue by business unit" tag="View Details" tagType="info">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueByUnit.items} layout="vertical" margin={{ left: 8, right: 68, top: 4, bottom: 4 }}>
              <CartesianGrid horizontal={false} stroke={C.grid} />
              <XAxis
                type="number" domain={[0, revenueByUnit.max]}
                tickFormatter={v => `৳${v}M`}
                tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false}
              />
              <YAxis
                type="category" dataKey="name" width={112}
                tick={{ fontSize: 11, fill: C.ink }} axisLine={false} tickLine={false}
              />
              <Tooltip
                formatter={v => [`৳${v.toFixed(2)}M`, 'Revenue']}
                cursor={{ fill: 'rgba(108,92,231,.06)' }}
              />
              <Bar
                dataKey="value" radius={[0, 6, 6, 0]} barSize={14}
                label={{ position: 'right', formatter: v => `৳${v}M`, fontSize: 11, fontWeight: 600, fill: C.muted }}
              >
                {revenueByUnit.items.map((_, i) => (
                  <Cell key={i} fill={UNIT_BAR_COLORS[i % UNIT_BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue vs Cost Burned" sub="Last 6 months">
          <div style={{ display: 'flex', gap: 18, marginBottom: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: C.primary400 }} /> Revenue
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.muted }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#EF5350' }} /> Cost Burned
            </span>
          </div>
          <ResponsiveContainer width="100%" height={193}>
            <BarChart data={revenueCostTrend} margin={{ left: 0, right: 12, top: 4, bottom: 0 }} barGap={4} barCategoryGap="28%">
              <CartesianGrid vertical={false} stroke={C.grid} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `৳${v}M`} tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} width={46} />
              <Tooltip
                formatter={(v, n) => [`৳${v.toFixed(1)}M`, n === 'revenue' ? 'Revenue' : 'Cost Burned']}
                cursor={{ fill: 'rgba(108,92,231,.06)' }}
              />
              <Bar dataKey="revenue" fill={C.primary400} radius={[4, 4, 0, 0]} maxBarSize={22} />
              <Bar dataKey="cost"    fill="#EF5350"      radius={[4, 4, 0, 0]} maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ── Row 3: Dept Wise Revenue | Project Wise Report ─────── */}
      <div className="grid dash-grid-b" style={{ marginBottom: 10 }}>

        <ChartCard title="Department Wise Revenue" sub="This Month" tag="View Details" tagType="info">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Donut */}
            <div style={{ position: 'relative', width: 156, height: 156, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deptRevenueDist} dataKey="value"
                    innerRadius={52} outerRadius={72}
                    paddingAngle={1.5} cornerRadius={3} stroke="none"
                  >
                    {deptRevenueDist.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={v => [`৳${v.toFixed(2)}M`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.2 }}>৳24.58M</div>
                <div style={{ fontSize: 9, color: C.muted, marginTop: 2, letterSpacing: 0.2 }}>Total Revenue</div>
              </div>
            </div>
            {/* Legend */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {deptRevenueDist.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 12 }}>{d.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>৳{d.value.toFixed(2)}M</span>
                  <span style={{ fontSize: 11, color: C.muted, minWidth: 42, textAlign: 'right' }}>({d.pct}%)</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Project Wise Report" sub="This Month" tag="View Details" tagType="info">
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Project</th>
                  <th className="t-num">Revenue (৳)</th>
                  <th className="t-num">Revenue (%)</th>
                  <th className="t-num">Target (৳)</th>
                  <th>Achievement</th>
                </tr>
              </thead>
              <tbody>
                {projectWiseReport.map(r => (
                  <tr key={r.project}>
                    <td style={{ fontWeight: 600 }}>{r.project}</td>
                    <td className="t-num">৳{r.revenue.toFixed(2)}M</td>
                    <td className="t-num">{r.revenuePct}%</td>
                    <td className="t-num">৳{r.target.toFixed(1)}M</td>
                    <td style={{ minWidth: 100 }}><ProgressBar value={r.achievement} color={C.accent} /></td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700 }}>
                  <td>Total</td>
                  <td className="t-num">৳{totalRevenue.toFixed(2)}M</td>
                  <td className="t-num">100%</td>
                  <td className="t-num">৳{totalTarget.toFixed(1)}M</td>
                  <td style={{ minWidth: 100 }}><ProgressBar value={totalAchieve} color={C.accent} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>

      {/* ── Row 4: Top Drivers | Health Score | Fin. Trend ─────── */}
      <div className="grid dash-grid-c" style={{ marginBottom: 10 }}>

        <ChartCard title="Top Revenue Drivers" sub="By contribution" tag="View Details" tagType="info">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 6 }}>
            {topRevenueDrivers.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                  background: d.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 11, fontWeight: 700,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{d.name}</div>
                  <div style={{ height: 6, background: '#EAF0F6', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${d.pct}%`, height: '100%', background: d.color, borderRadius: 4 }} />
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.ink, width: 38, textAlign: 'right', flexShrink: 0 }}>
                  {d.pct}%
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Business Health Score">
          <GaugeChart
            score={businessHealth.score}
            label={businessHealth.label}
            changePts={businessHealth.changePts}
          />
          <div style={{ marginTop: 6 }}>
            {businessHealth.metrics.map(m => (
              <div
                key={m.name}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderTop: '1px solid #F5F5F5' }}
              >
                <CheckIcon />
                <span style={{ flex: 1, fontSize: 11.5, color: C.ink }}>{m.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>{m.score}/100</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Financial Performance Trend" sub="Last 6 months">
          <div style={{ display: 'flex', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <LineLegendItem color={C.primary400} label="Revenue (৳)" />
            <LineLegendItem color={C.good}       label="Gross Profit (৳)" />
            <LineLegendItem color={C.purple}      label="Operating Margin (%)" dashed />
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={financialPerfTrend} margin={{ left: 0, right: 28, top: 6, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke={C.grid} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="left"
                tickFormatter={v => `৳${v}M`}
                tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} width={44}
              />
              <YAxis
                yAxisId="right" orientation="right"
                tickFormatter={v => `${v}%`}
                tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} width={34}
              />
              <Tooltip
                formatter={(v, n) => [
                  n === 'operatingMargin' ? `${v}%` : `৳${v}M`,
                  n === 'revenue' ? 'Revenue' : n === 'grossProfit' ? 'Gross Profit' : 'Operating Margin',
                ]}
              />
              <Line
                yAxisId="left" type="monotone" dataKey="revenue"
                stroke={C.primary400} strokeWidth={2}
                dot={{ r: 4, fill: C.primary400, stroke: 'white', strokeWidth: 1.5 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="left" type="monotone" dataKey="grossProfit"
                stroke={C.good} strokeWidth={2}
                dot={{ r: 4, fill: C.good, stroke: 'white', strokeWidth: 1.5 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right" type="monotone" dataKey="operatingMargin"
                stroke={C.purple} strokeWidth={2} strokeDasharray="5 3"
                dot={{ r: 4, fill: C.purple, stroke: 'white', strokeWidth: 1.5 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </>
  )
}
