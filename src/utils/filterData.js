import {
  differenceInDays,
  parseISO,
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
} from 'date-fns'
import {
  kpiStats as baseKpiStats,
  salesPerformance as baseSalesPerformance,
  salesPipeline as baseSalesPipeline,
  revenueCostTrend as baseRevenueCostTrend,
  deptWiseProject as baseDeptWiseProject,
  projectWiseReport as baseProjectWiseReport,
  departments as baseDepartments,
  employees as baseEmployees,
  projects as baseProjects,
  topSalesTeams as baseTopSalesTeams,
  topBusinessUnits as baseTopBusinessUnits,
  topKamSalesPersons as baseTopKamSalesPersons,
  bestAchievementRatio as baseBestAchievementRatio,
} from '../data/mockData.js'
import { hasPanelFilters, DATE_PRESET_LABELS } from '../constants/filterConstants.js'

const PROJECT_META = {
  'HERCULES 2.0': {
    businessUnit: 'Hercules',
    product: 'Hercules',
    department: 'Engineering',
    projectType: 'R&D Project',
    salesTeam: 'Enterprise Sales',
    salesPerson: 'Md. Bakhtiar Alam',
    clientType: 'Enterprise',
    region: 'Dhaka',
  },
  'PCI-DSS': {
    businessUnit: 'PCI-DSS',
    product: 'PCI DSS',
    department: 'Engineering',
    projectType: 'R&D Project',
    salesTeam: 'Corporate Sales',
    salesPerson: 'Md. Bakhtiar Alam',
    clientType: 'Government',
    region: 'Dhaka',
  },
  Vendor: {
    businessUnit: 'Internal Products',
    product: 'API Gateway',
    department: 'Engineering',
    projectType: 'Internal Project',
    salesTeam: 'Digital Sales',
    salesPerson: 'Md. Bakhtiar Alam',
    clientType: 'Startup',
    region: 'Dhaka',
  },
  'Monthly Dev': {
    businessUnit: 'Monthly Dev',
    product: 'SSLCommerz',
    department: 'Engineering',
    projectType: 'Client Project',
    salesTeam: 'SME Sales',
    salesPerson: 'Md. Bakhtiar Alam',
    clientType: 'SME',
    region: 'Chattogram',
  },
  'Modish Proj 2': {
    businessUnit: 'Internal Products',
    product: 'E Buddy',
    department: 'Engineering',
    projectType: 'Client Project',
    salesTeam: 'Partner Sales',
    salesPerson: 'Md. Bakhtiar Alam',
    clientType: 'Enterprise',
    region: 'Sylhet',
  },
  'JTS Call Center': {
    businessUnit: 'E-Ticketing',
    product: 'E Ticketing',
    department: 'Engineering',
    projectType: 'Revenue Generating',
    salesTeam: 'Enterprise Sales',
    salesPerson: 'Md. Mahmud Hossain Bhuyan',
    clientType: 'Enterprise',
    region: 'Dhaka',
  },
  ELCOMMERZ: {
    businessUnit: 'SSLCommerz',
    product: 'SSLCommerz',
    department: 'Engineering',
    projectType: 'Revenue Generating',
    salesTeam: 'Corporate Sales',
    salesPerson: 'Md. Mahmud Hossain Bhuyan',
    clientType: 'Banking',
    region: 'Dhaka',
  },
}

const DEPARTMENT_FILTER_DEPT = {
  'Banking & Financial Services': 'Finance',
  Data: 'Operations',
  Engineering: 'Engineering',
  'Innovation Center of Excellence': 'Operations',
  'Project Management Office': 'Operations',
  'Service Assurance': 'Customer Support',
  'Service Assurance-Quality': 'QA',
}

const EMPLOYEE_DEPT = {
  Engineering: 'Engineering',
  'Service Assurance-Quality': 'QA',
}

function getProjectMeta(name) {
  return PROJECT_META[name] ?? {
    businessUnit: 'SSL Wireless',
    product: 'SSLCommerz',
    department: 'Engineering',
    projectType: 'Client Project',
    salesTeam: 'Enterprise Sales',
    salesPerson: '',
    clientType: 'Enterprise',
    region: 'Dhaka',
  }
}

function matchesPanelFilters(meta, filters) {
  if (filters.businessUnits.length && !filters.businessUnits.includes(meta.businessUnit)) return false
  if (filters.products.length && !filters.products.includes(meta.product)) return false
  if (filters.departments.length && !filters.departments.includes(meta.department)) return false
  if (filters.projectTypes.length && !filters.projectTypes.includes(meta.projectType)) return false
  if (filters.salesTeams.length && !filters.salesTeams.includes(meta.salesTeam)) return false
  if (filters.salesPerson && meta.salesPerson !== filters.salesPerson) return false
  if (filters.clientTypes.length && !filters.clientTypes.includes(meta.clientType)) return false
  if (filters.regions.length && !filters.regions.includes(meta.region)) return false
  return true
}

export function getDateScale(customFrom, customTo) {
  if (!customFrom || !customTo) return 1
  const days = Math.max(1, differenceInDays(parseISO(customTo), parseISO(customFrom)) + 1)
  return Math.min(1, Math.max(0.04, days / 30))
}

export function getPeriodLabel(preset, customFrom, customTo) {
  if (preset === 'custom') {
    const from = parseISO(customFrom)
    const to = parseISO(customTo)
    if (customFrom === customTo) return format(from, 'MMM d, yyyy')
    return `${format(from, 'MMM d')} – ${format(to, 'MMM d, yyyy')}`
  }
  return DATE_PRESET_LABELS[preset] ?? 'Selected period'
}

function resolveChartBuckets(fromIso, toIso) {
  const from = parseISO(fromIso)
  const to = parseISO(toIso)
  const days = differenceInDays(to, from) + 1

  if (days <= 1) {
    return [{ label: format(from, 'MMM d'), weight: 1 }]
  }
  if (days <= 14) {
    return eachDayOfInterval({ start: from, end: to }).map((d, i) => ({
      label: format(d, 'MMM d'),
      weight: 0.85 + (i % 7) * 0.05,
    }))
  }
  if (days <= 62) {
    return eachWeekOfInterval({ start: from, end: to }, { weekStartsOn: 1 }).map((_, i) => ({
      label: `W${i + 1}`,
      weight: 0.9 + i * 0.06,
    }))
  }
  return eachMonthOfInterval({ start: from, end: to }).map((m, i) => ({
    label: format(m, 'MMM'),
    weight: 0.8 + i * 0.1,
  }))
}

function buildRevenueCostTrend(customFrom, customTo, periodLabel, periodRevenue, periodCost) {
  const buckets = resolveChartBuckets(customFrom, customTo)
  const totalWeight = buckets.reduce((sum, bucket) => sum + bucket.weight, 0)

  return {
    subtitle: `Revenue and cost · ${periodLabel}`,
    data: buckets.map(bucket => ({
      label: bucket.label,
      revenue: +((periodRevenue * bucket.weight) / totalWeight).toFixed(2),
      cost: +((periodCost * bucket.weight) / totalWeight).toFixed(2),
    })),
  }
}

function formatMillions(value) {
  if (value >= 1) return `৳${value.toFixed(2)}M`
  return `৳${Math.round(value * 1000)}K`
}

function formatCount(value) {
  if (value >= 1000) return value.toLocaleString(undefined, { maximumFractionDigits: 0 })
  return String(Math.max(0, Math.round(value)))
}

function scaleKpiStats(stats, factor, vsLabel) {
  return stats.map(stat => {
    const next = { ...stat, vs: vsLabel }
    if (stat.iconType === 'revenue' || stat.iconType === 'pipeline') {
      const num = parseFloat(stat.value.replace(/[^\d.]/g, '')) * factor
      next.value = formatMillions(num)
      next.change = +(stat.change * factor).toFixed(1)
      next.spark = stat.spark.map(v => +(v * factor).toFixed(2))
    } else if (stat.iconType === 'target') {
      next.value = `${Math.min(99, Math.round(parseFloat(stat.value) * (0.85 + factor * 0.15)))}%`
      next.change = +(stat.change * factor).toFixed(1)
      next.spark = stat.spark.map(v => Math.round(v * (0.85 + factor * 0.15)))
    } else if (stat.iconType === 'clients') {
      const num = parseFloat(stat.value.replace(/,/g, '')) * factor
      next.value = formatCount(num)
      next.change = +(stat.change * factor).toFixed(1)
      next.spark = stat.spark.map(v => Math.round(v * factor))
    } else if (stat.iconType === 'projects') {
      const num = Math.max(1, Math.round(parseFloat(stat.value) * factor))
      next.value = String(num)
      next.change = Math.max(0, Math.round(stat.change * factor))
      next.spark = stat.spark.map(v => Math.max(1, Math.round(v * factor)))
    }
    return next
  })
}

function dateVsLabel(preset) {
  const labels = {
    today: 'vs Yesterday',
    'last-day': 'vs Prior Day',
    'this-week': 'vs Last Week',
    'last-week': 'vs Prior Week',
    'this-month': 'vs May 2026',
    'last-month': 'vs Apr 2026',
    quarter: 'vs Last Quarter',
    year: 'vs Last Year',
    custom: 'vs Previous Period',
  }
  return labels[preset] ?? 'vs Previous Period'
}

export function buildFilteredData({ datePreset, customFrom, customTo, filters }) {
  const dateScale = getDateScale(customFrom, customTo)
  const periodLabel = getPeriodLabel(datePreset, customFrom, customTo)
  const vsLabel = dateVsLabel(datePreset)
  const panelActive = hasPanelFilters(filters)

  const filteredProjects = baseProjects.filter(p =>
    matchesPanelFilters(getProjectMeta(p.name), filters),
  )

  const filteredProjectReport = baseProjectWiseReport.filter(row =>
    matchesPanelFilters(getProjectMeta(row.project), filters),
  )

  const filteredDepartments = baseDepartments.filter(d => {
    const dept = DEPARTMENT_FILTER_DEPT[d.name] ?? 'Operations'
    if (filters.departments.length && !filters.departments.includes(dept)) return false
    if (filters.salesPerson) {
      const headMatches = d.head === filters.salesPerson
      const projectMatches = filteredProjects.length > 0
      if (!headMatches && !projectMatches) return false
    }
    if (panelActive && (filters.businessUnits.length || filters.products.length)) {
      return filteredProjects.some(p => getProjectMeta(p.name).department === dept)
    }
    return true
  })

  const filteredEmployees = baseEmployees.filter(e => {
    const dept = EMPLOYEE_DEPT[e.dept] ?? e.dept
    if (filters.departments.length && !filters.departments.includes(dept)) return false
    if (filters.salesPerson && e.name !== filters.salesPerson) return false
    if (panelActive && (filters.businessUnits.length || filters.products.length || filters.projectTypes.length || filters.salesTeams.length || filters.clientTypes.length || filters.regions.length)) {
      return filteredProjects.some(p => {
        const meta = getProjectMeta(p.name)
        return p.responsible === e.name || meta.salesPerson === e.name
      })
    }
    return true
  })

  const revenueTotal = filteredProjectReport.reduce((s, r) => s + r.revenue, 0)
  const baseRevenueTotal = baseProjectWiseReport.reduce((s, r) => s + r.revenue, 0)
  const panelRatio = panelActive
    ? Math.max(filteredProjectReport.length / baseProjectWiseReport.length, 0.15)
    : 1
  const factor = panelRatio * dateScale

  const achievementPct = filteredProjectReport.length
    ? Math.round(filteredProjectReport.reduce((s, r) => s + r.achievement, 0) / filteredProjectReport.length)
    : baseSalesPerformance.achievementPct

  const salesPerformance = {
    target: formatMillions(31.5 * factor),
    achievement: formatMillions((revenueTotal || baseRevenueTotal) * dateScale),
    revenue: formatMillions((revenueTotal || baseRevenueTotal) * dateScale),
    achievementPct,
    lastMonthPct: Math.max(40, Math.round(baseSalesPerformance.lastMonthPct * (0.9 + panelRatio * 0.1))),
    changePct: Math.max(1, Math.round(baseSalesPerformance.changePct * factor * 10) / 10),
    comparisonLabel: vsLabel,
  }

  const pipelineTotal = Math.max(1, Math.round(baseSalesPipeline.total * panelRatio * dateScale))
  const salesPipeline = {
    total: pipelineTotal,
    subtitle: `Project pipeline · ${periodLabel}`,
    stages: baseSalesPipeline.stages.map(stage => {
      const value = Math.max(0, Math.round(stage.value * panelRatio * dateScale))
      return { ...stage, value, pct: pipelineTotal ? Math.round((value / pipelineTotal) * 100) : 0 }
    }),
  }

  const periodRevenue = (revenueTotal || baseRevenueTotal) * dateScale
  const periodCost = baseRevenueCostTrend[baseRevenueCostTrend.length - 1].cost * panelRatio * dateScale
  const { subtitle: revenueCostSubtitle, data: revenueCostTrend } = buildRevenueCostTrend(
    customFrom,
    customTo,
    periodLabel,
    periodRevenue,
    periodCost,
  )

  const filteredDeptWise = baseDeptWiseProject.depts.filter(d => {
    if (!filters.departments.length) return true
    return filters.departments.includes(d.name)
  })

  const deptWiseProject = {
    subtitle: `Projects by department · ${periodLabel}`,
    avgCompletion: filteredDeptWise.length
      ? Math.round(filteredDeptWise.reduce((s, d) => s + d.completion, 0) / filteredDeptWise.length)
      : 0,
    depts: (filteredDeptWise.length ? filteredDeptWise : [{ name: 'No matching data', todo: 0, completion: 0, color: '#9E9E9E' }]).map(d => ({
      ...d,
      todo: Math.max(0, Math.round(d.todo * panelRatio * dateScale)),
    })),
  }

  const projectWiseReport = filteredProjectReport.map(row => ({
    ...row,
    revenue: +(row.revenue * dateScale).toFixed(2),
    target: +(row.target * dateScale).toFixed(2),
    revenuePct: revenueTotal
      ? +((row.revenue / baseProjectWiseReport.reduce((s, r) => s + r.revenue, 0)) * 100 * panelRatio).toFixed(1)
      : row.revenuePct,
  }))

  if (projectWiseReport.length) {
    const sumRev = projectWiseReport.reduce((s, r) => s + r.revenue, 0)
    projectWiseReport.forEach(row => {
      row.revenuePct = sumRev ? +((row.revenue / sumRev) * 100).toFixed(1) : 0
    })
  }

  const kpiStats = scaleKpiStats(baseKpiStats, factor, vsLabel)

  const scaleRevenueRows = (rows, nameFilter = null, limit = null) => {
    let list = rows
    if (nameFilter?.length) {
      list = rows.filter(r => nameFilter.includes(r.name))
    }
    if (!list.length) list = rows
    const scaled = list
      .map(r => ({ ...r, value: +(r.value * factor).toFixed(2) }))
      .sort((a, b) => b.value - a.value)
    return limit ? scaled.slice(0, limit) : scaled
  }

  const topSalesTeamsAll = scaleRevenueRows(
    baseTopSalesTeams,
    filters.salesTeams.length ? filters.salesTeams : null,
  )
  const topSalesTeams = topSalesTeamsAll.slice(0, 5)

  const topBusinessUnitsAll = scaleRevenueRows(
    baseTopBusinessUnits,
    filters.businessUnits.length ? filters.businessUnits : null,
  )
  const topBusinessUnits = topBusinessUnitsAll.slice(0, 5)

  let kamList = baseTopKamSalesPersons
  if (filters.salesPerson) {
    const match = kamList.find(k => k.name === filters.salesPerson)
    kamList = match
      ? [match, ...kamList.filter(k => k.name !== filters.salesPerson)]
      : kamList
  }
  const topKamSalesPersonsAll = kamList.map(r => ({
    ...r,
    value: +(r.value * factor).toFixed(2),
  }))
  const topKamSalesPersons = topKamSalesPersonsAll.slice(0, 5)

  let achievementList = baseBestAchievementRatio
  if (filters.salesTeams.length) {
    achievementList = achievementList.filter(r => filters.salesTeams.includes(r.name))
  }
  if (!achievementList.length) achievementList = baseBestAchievementRatio
  const bestAchievementRatioAll = achievementList
    .map(r => ({
      ...r,
      pct: Math.min(150, Math.round(r.pct * (0.85 + factor * 0.15))),
    }))
    .sort((a, b) => b.pct - a.pct)
  const bestAchievementRatio = bestAchievementRatioAll.slice(0, 5)

  return {
    kpiStats,
    salesPerformance,
    salesPipeline,
    revenueCostTrend,
    revenueCostSubtitle,
    deptWiseProject,
    projectWiseReport,
    topSalesTeams,
    topBusinessUnits,
    topKamSalesPersons,
    bestAchievementRatio,
    topSalesTeamsAll,
    topBusinessUnitsAll,
    topKamSalesPersonsAll,
    bestAchievementRatioAll,
    departments: filteredDepartments,
    employees: filteredEmployees,
    projects: filteredProjects,
    meta: { dateScale, panelRatio, factor, panelActive, periodLabel },
  }
}
