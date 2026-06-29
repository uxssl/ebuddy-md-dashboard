import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Target,
  CircleCheck,
  BarChart3,
} from "lucide-react";
import { useState, useCallback } from "react";
import PageFrame from "../layout/PageFrame.jsx";
import ChartCard from "../components/ChartCard.jsx";
import LeaderboardCard from "../components/LeaderboardCard.jsx";
import LeaderboardList from "../components/LeaderboardList.jsx";
import SideModal from "../components/SideModal.jsx";
import { C } from "../theme.js";
import { useFilters } from "../context/FilterContext.jsx";

/* ── Progress Bar ──────────────────────────────────────────────── */
function ProgressBar({ value, color = C.accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 6,
          background: "#EAF0F6",
          borderRadius: 4,
          overflow: "hidden",
          minWidth: 48,
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            borderRadius: 4,
            background: value === 100 ? C.good : color,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 11,
          color: C.muted,
          width: 32,
          textAlign: "right",
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}%
      </span>
    </div>
  );
}

/* ── KPI Stat Card ─────────────────────────────────────────────── */
function KpiCard({ stat }) {
  return (
    <div
      className="card"
      style={{ display: "flex", flexDirection: "column", padding: "14px 16px" }}
    >
      <div className="card-title" style={{ marginBottom: 10, fontSize: 11.5, color: C.muted, fontWeight: 500 }}>
        {stat.label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: "-0.5px",
          marginBottom: 4,
        }}
      >
        {stat.value}
      </div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}
      >
        <span style={{ color: stat.up ? C.good : C.danger, fontWeight: 700 }}>
          {stat.up ? "↑" : "↓"} {stat.change}
          {stat.noPercent ? "" : "%"}
        </span>
        <span style={{ color: C.muted }}>{stat.vs}</span>
      </div>
    </div>
  );
}

/* ── Sales Performance Metric Box ──────────────────────────────── */
function PerfMetric({ iconColor, icon, label, value }) {
  return (
    <div
      style={{
        flex: 1,
        background: "rgba(236,238,243,0.55)",
        borderRadius: 10,
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: `${iconColor}1A`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: 10.5, color: C.muted, fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.3px" }}>
        {value}
      </div>
    </div>
  );
}

/* ── Dashboard ─────────────────────────────────────────────────── */
export default function Dashboard() {
  const {
    kpiStats,
    topSalesTeams,
    topBusinessUnits,
    topKamSalesPersons,
    bestAchievementRatio,
    topSalesTeamsAll,
    topBusinessUnitsAll,
    topKamSalesPersonsAll,
    bestAchievementRatioAll,
    salesPerformance,
    salesPipeline,
    revenueCostTrend,
    revenueCostSubtitle,
    deptWiseProject,
    projectWiseReport,
  } = useFilters();

  const totalRevenue = projectWiseReport.reduce((s, r) => s + r.revenue, 0);
  const totalTarget = projectWiseReport.reduce((s, r) => s + r.target, 0);
  const totalAchieve = projectWiseReport.length
    ? Math.round(
        projectWiseReport.reduce((s, r) => s + r.achievement, 0) /
          projectWiseReport.length,
      )
    : 0;

  const [leaderboardModal, setLeaderboardModal] = useState(null)
  const closeLeaderboardModal = useCallback(() => setLeaderboardModal(null), [])

  return (
    <PageFrame
      title="Executive Dashboard"
      sub="KPI overview · sales performance · pipeline · revenue"
    >
      {/* ── Row 1: KPI Stat Cards ─────────────────────────────── */}
      <div className="grid dash-grid-5" style={{ marginBottom: 10 }}>
        {kpiStats.map((s) => (
          <KpiCard key={s.label} stat={s} />
        ))}
      </div>

      {/* ── Row 2: Top leaderboard cards ──────────────────────── */}
      <div className="grid dash-grid-4" style={{ marginBottom: 10 }}>
        <LeaderboardCard
          title="Top Sales Team"
          rows={topSalesTeams}
          onViewAll={() => setLeaderboardModal({
            title: 'Top Sales Team',
            rows: topSalesTeamsAll,
            variant: 'revenue',
          })}
        />
        <LeaderboardCard
          title="Top Business Unit"
          rows={topBusinessUnits}
          onViewAll={() => setLeaderboardModal({
            title: 'Top Business Unit',
            rows: topBusinessUnitsAll,
            variant: 'revenue',
          })}
        />
        <LeaderboardCard
          title="Top KAM / Sales Person"
          rows={topKamSalesPersons}
          onViewAll={() => setLeaderboardModal({
            title: 'Top KAM / Sales Person',
            rows: topKamSalesPersonsAll,
            variant: 'revenue',
          })}
        />
        <LeaderboardCard
          title="Best Achievement Ratio"
          rows={bestAchievementRatio}
          variant="achievement"
          onViewAll={() => setLeaderboardModal({
            title: 'Best Achievement Ratio',
            rows: bestAchievementRatioAll,
            variant: 'achievement',
          })}
        />
      </div>

      <SideModal
        open={!!leaderboardModal}
        title={leaderboardModal?.title ?? ''}
        onClose={closeLeaderboardModal}
      >
        {leaderboardModal && (
          <LeaderboardList
            rows={leaderboardModal.rows}
            variant={leaderboardModal.variant}
          />
        )}
      </SideModal>

      {/* ── Row 3: Sales Performance (4) | Sales Pipeline (3) | Product Performance (5) ── */}
      <div className="dash-perf-scroll">
      <div className="grid dash-grid-perf dash-row-equal">
        {/* Sales Performance */}
        <div>
        <ChartCard title="Sales Performance" sub="Target and achievement overview">
          <div className="dash-card-body">
          {/* Metric boxes */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <PerfMetric
              iconColor={C.accent}
              label="Target"
              value={salesPerformance.target}
              icon={<Target size={14} color={C.accent} strokeWidth={2.5} />}
            />
            <PerfMetric
              iconColor={C.good}
              label="Achievement"
              value={salesPerformance.achievement}
              icon={<CircleCheck size={14} color={C.good} strokeWidth={2.5} />}
            />
            <PerfMetric
              iconColor={C.purple}
              label="Revenue"
              value={salesPerformance.revenue}
              icon={<BarChart3 size={14} color={C.purple} strokeWidth={2.5} />}
            />
          </div>

          {/* Achievement % */}
          <div style={{ marginBottom: 6 }}>
            <div
              style={{
                fontSize: 10.5,
                color: C.muted,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".4px",
                marginBottom: 6,
              }}
            >
              Achievement %
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                marginBottom: 8,
              }}
            >
              {salesPerformance.achievementPct}%
            </div>
            <div
              style={{
                height: 6,
                background: "#EAF0F6",
                borderRadius: 4,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: `${salesPerformance.achievementPct}%`,
                  height: "100%",
                  borderRadius: 4,
                  background: C.primary400,
                }}
              />
            </div>
            <div style={{ fontSize: 11, color: C.muted }}>
              {salesPerformance.comparisonLabel}:{" "}
              <span style={{ fontWeight: 700, color: C.ink }}>
                {salesPerformance.lastMonthPct}%
              </span>
              {"  "}
              <span style={{ color: C.good, fontWeight: 700 }}>
                ↑ {salesPerformance.changePct}%
              </span>
            </div>
          </div>
          </div>
        </ChartCard>
        </div>

        {/* Sales Pipeline */}
        <div>
          <ChartCard title="Sales Pipeline" sub={salesPipeline.subtitle}>
            <div
              className="dash-card-body sp-pipeline-body"
              style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <div
                style={{
                  position: "relative",
                  width: 140,
                  height: 140,
                  flexShrink: 0,
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesPipeline.stages}
                      dataKey="value"
                      innerRadius={46}
                      outerRadius={65}
                      paddingAngle={1.5}
                      cornerRadius={3}
                      stroke="none"
                    >
                      {salesPipeline.stages.map((s, i) => (
                        <Cell key={i} fill={s.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v, n) => [`${v} projects`, n]} />
                  </PieChart>
                </ResponsiveContainer>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
                    {salesPipeline.total}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: C.muted,
                      marginTop: 3,
                      textAlign: "center",
                      lineHeight: 1.3,
                    }}
                  >
                    Total Pipeline
                    <br />
                    Projects
                  </div>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  minWidth: 0,
                }}
              >
                {salesPipeline.stages.map((s) => (
                  <div
                    key={s.name}
                    style={{ display: "flex", alignItems: "center", gap: 7 }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: s.color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ flex: 1, fontSize: 11.5 }}>{s.name}</span>
                    <span
                      style={{
                        fontSize: 11,
                        color: C.muted,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {s.value} ({s.pct}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>
        </div>

        {/* Product Performance */}
        <div>
        <ChartCard title="Product Performance" sub="Top-Selling Products">
          <div className="dash-card-body table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Project</th>
                  <th className="t-num">Revenue (৳)</th>
                  <th className="t-num">Target (৳)</th>
                  <th className="t-num">Achievement</th>
                </tr>
              </thead>
              <tbody>
                {projectWiseReport.map((r) => (
                  <tr key={r.project}>
                    <td style={{ fontWeight: 600 }}>{r.project}</td>
                    <td className="t-num">
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "baseline",
                          justifyContent: "flex-end",
                          gap: 12,
                          width: "100%",
                        }}
                      >
                        <span>৳{r.revenue.toFixed(2)}M</span>
                        <span
                          style={{
                            color: C.muted,
                            fontWeight: 500,
                            fontSize: 10,
                          }}
                        >
                          ({r.revenuePct}%)
                        </span>
                      </span>
                    </td>
                    <td className="t-num">৳{r.target.toFixed(1)}M</td>
                    <td className="t-num" style={{ minWidth: 110 }}>
                      <div style={{ width: 100, marginLeft: "auto" }}>
                        <ProgressBar value={r.achievement} color={C.accent} />
                      </div>
                    </td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700 }}>
                  <td>Total</td>
                  <td className="t-num">
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "baseline",
                        justifyContent: "flex-end",
                        gap: 12,
                        width: "100%",
                      }}
                    >
                      <span>৳{totalRevenue.toFixed(2)}M</span>
                      <span
                        style={{
                          color: C.muted,
                          fontWeight: 500,
                          fontSize: 10,
                        }}
                      >
                        (100%)
                      </span>
                    </span>
                  </td>
                  <td className="t-num">৳{totalTarget.toFixed(1)}M</td>
                  <td className="t-num" style={{ minWidth: 110 }}>
                    <div style={{ width: 100, marginLeft: "auto" }}>
                      <ProgressBar value={totalAchieve} color={C.accent} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ChartCard>
        </div>
      </div>
      </div>

      {/* ── Row 3: Department wise Project (5) | Project Cost vs. Revenue (7) ── */}
      <div className="grid dash-grid-dept-cost" style={{ marginBottom: 10 }}>
        <ChartCard title="Department wise Project" sub={deptWiseProject.subtitle}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Donut */}
            <div
              style={{
                position: "relative",
                width: 148,
                height: 148,
                flexShrink: 0,
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deptWiseProject.depts}
                    dataKey="todo"
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={1.5}
                    cornerRadius={3}
                    stroke="none"
                  >
                    {deptWiseProject.depts.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} tasks`, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
                  {deptWiseProject.avgCompletion}%
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: C.muted,
                    marginTop: 3,
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  Avg. Completion
                </div>
              </div>
            </div>

            {/* Dept table */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  gap: "0 10px",
                  marginBottom: 6,
                  paddingBottom: 6,
                  borderBottom: `1px solid ${C.line}`,
                }}
              >
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                  }}
                >
                  Department
                </span>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                    textAlign: "right",
                  }}
                >
                  To Do
                </span>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: C.muted,
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                    minWidth: 80,
                    textAlign: "right",
                  }}
                >
                  Completion (%)
                </span>
              </div>
              {deptWiseProject.depts.map((d) => (
                <div
                  key={d.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: "0 10px",
                    alignItems: "center",
                    padding: "5px 0",
                    borderBottom: `1px solid rgba(13,43,69,.05)`,
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: d.color,
                        flexShrink: 0,
                      }}
                    />
                    {d.name}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.ink,
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {d.todo}
                  </span>
                  <div
                    style={{
                      minWidth: 80,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 5,
                        background: "#EAF0F6",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${d.completion}%`,
                          height: "100%",
                          borderRadius: 3,
                          background: C.good,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 10.5,
                        color: C.muted,
                        width: 28,
                        textAlign: "right",
                        flexShrink: 0,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {d.completion}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Project Cost vs. Revenue"
          sub={revenueCostSubtitle}
          headExtra={(
            <>
              <span className="card-legend-item">
                <span className="card-legend-dot" style={{ background: C.primary400 }} />
                Revenue (৳)
              </span>
              <span className="card-legend-item">
                <span className="card-legend-dot" style={{ background: '#EF5350' }} />
                Cost (৳)
              </span>
            </>
          )}
        >
          <ResponsiveContainer width="100%" height={193}>
            <BarChart
              data={revenueCostTrend}
              margin={{ left: 0, right: 8, top: 4, bottom: 0 }}
              barGap={4}
              barCategoryGap="28%"
            >
              <CartesianGrid vertical={false} stroke={C.grid} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: C.muted }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `৳${v}M`}
                tick={{ fontSize: 10, fill: C.muted }}
                axisLine={false}
                tickLine={false}
                width={46}
              />
              <Tooltip
                formatter={(v, n) => [
                  `৳${v.toFixed(1)}M`,
                  n === "revenue" ? "Revenue" : "Cost",
                ]}
                cursor={{ fill: "rgba(108,92,231,.06)" }}
              />
              <Bar
                dataKey="revenue"
                fill={C.primary400}
                radius={[4, 4, 0, 0]}
                maxBarSize={22}
              />
              <Bar
                dataKey="cost"
                fill="#EF5350"
                radius={[4, 4, 0, 0]}
                maxBarSize={22}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </PageFrame>
  );
}
