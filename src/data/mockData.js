/* Mock data pulled from the existing dashboard screens.
   Swap these arrays for live API responses later — shape stays same. */

export const kpi = {
  orgHealth: 90,          // weighted completion %
  totalTasks: 5392,
  done: 5372,
  overdue: 12,
  todo: 19,
  inProgress: 1,
  activeProjects: 13,
}

export const departments = [
  { name: 'Banking & Financial Services', head: 'Md. Mohiuddin Tawfik', projects: 1, total: 1,    todo: 0,  wip: 0, done: 1,    overdue: 0,  stuck: 0, completion: 100,   flag: 'Good' },
  { name: 'Data',                          head: 'Kalyan Banik',        projects: 1, total: 185,  todo: 0,  wip: 0, done: 185,  overdue: 0,  stuck: 0, completion: 100,   flag: 'Good' },
  { name: 'Engineering',                   head: 'Ashekur Rahman Molla',projects: 6, total: 4598, todo: 10, wip: 0, done: 4588, overdue: 10, stuck: 0, completion: 99.78, flag: 'Warning' },
  { name: 'Innovation Center of Excellence',head: 'Md. Taukir Hasan',   projects: 1, total: 16,   todo: 0,  wip: 0, done: 16,   overdue: 0,  stuck: 0, completion: 100,   flag: 'Good' },
  { name: 'Project Management Office',     head: 'Mohammad Ashfaque Ali',projects: 4,total: 214,  todo: 0,  wip: 0, done: 214,  overdue: 0,  stuck: 0, completion: 100,   flag: 'Good' },
  { name: 'Service Assurance',             head: '—',                   projects: 1, total: 17,   todo: 0,  wip: 0, done: 17,   overdue: 0,  stuck: 0, completion: 100,   flag: 'Good' },
  { name: 'Service Assurance-Quality',     head: 'Md. Amimul Islam',    projects: 4, total: 361,  todo: 9,  wip: 1, done: 351,  overdue: 2,  stuck: 0, completion: 97.23, flag: 'Warning' },
]

export const employees = [
  { name: 'A. N. M. Ariful Haque', dept: 'Engineering',              projects: 1, assigned: 3,    todo: 0, wip: 0, done: 3,    overdue: 0, stuck: 0, completion: 100, status: 'Good' },
  { name: 'Abdullah Al Mahmud',    dept: 'Engineering',              projects: 1, assigned: 27,   todo: 0, wip: 0, done: 27,   overdue: 0, stuck: 0, completion: 100, status: 'Good' },
  { name: 'Alimoon Nisha',         dept: 'Engineering',              projects: 2, assigned: 17,   todo: 0, wip: 0, done: 17,   overdue: 0, stuck: 0, completion: 100, status: 'Good' },
  { name: 'Aminur Rashid Iffy',    dept: 'Service Assurance-Quality',projects: 3, assigned: 211,  todo: 0, wip: 0, done: 211,  overdue: 0, stuck: 0, completion: 100, status: 'Good' },
  { name: 'Anisur Rahman',         dept: 'Engineering',              projects: 1, assigned: 145,  todo: 0, wip: 0, done: 145,  overdue: 0, stuck: 0, completion: 100, status: 'Good' },
  { name: 'Ariful Islam',          dept: 'Engineering',              projects: 1, assigned: 1291, todo: 0, wip: 0, done: 1291, overdue: 0, stuck: 0, completion: 100, status: 'Good' },
  { name: 'Ashekur Rahman Molla',  dept: 'Engineering',              projects: 1, assigned: 2,    todo: 0, wip: 0, done: 2,    overdue: 0, stuck: 0, completion: 100, status: 'Good' },
  { name: 'Asif Mohammed Malik',   dept: 'Engineering',              projects: 2, assigned: 5,    todo: 0, wip: 0, done: 5,    overdue: 0, stuck: 0, completion: 100, status: 'Good' },
  { name: 'Fardin Rahman',         dept: 'Engineering',              projects: 1, assigned: 41,   todo: 0, wip: 0, done: 41,   overdue: 0, stuck: 0, completion: 100, status: 'Good' },
  { name: 'Hasheme Al Rafsun',     dept: 'Service Assurance-Quality',projects: 1, assigned: 2,    todo: 0, wip: 0, done: 2,    overdue: 0, stuck: 0, completion: 100, status: 'Good' },
]

export const projects = [
  { name: 'HERCULES 2.0', code: '21762', type: 'R&D',          service: 'Ad-hoc Design/Content', dept: 'Engineering', responsible: 'Md. Bakhtiar Alam', value: '100%', client: 'N/A',                tasks: 2, overdue: 2, stuck: 0, done: 0,  status: 'Active' },
  { name: 'PCI-DSS',      code: '0001',  type: 'R&D',          service: 'Ad-hoc Design/Content', dept: 'Engineering', responsible: 'Md. Bakhtiar Alam', value: '100%', client: 'N/A',                tasks: 1, overdue: 1, stuck: 0, done: 0,  status: 'Active' },
  { name: 'Vendor',       code: 'N/A',   type: 'R&D',          service: 'Ad-hoc Design/Content', dept: 'Engineering', responsible: 'Md. Bakhtiar Alam', value: '100%', client: 'N/A',                tasks: 0, overdue: 0, stuck: 0, done: 0,  status: 'Active' },
  { name: 'Monthly Dev',  code: 'N/A',   type: 'Partnership',  service: 'Agent Portal',          dept: 'Engineering', responsible: 'Md. Bakhtiar Alam', value: '1395%',client: 'Sweet Dream Mgmt',   tasks: 1, overdue: 0, stuck: 1, done: 0,  status: 'Active' },
  { name: 'Modish Proj 2',code: 'N/A',   type: 'Pilot',        service: 'AMC maintenance',       dept: 'Engineering', responsible: 'Md. Bakhtiar Alam', value: '100%', client: 'N/A',                tasks: 0, overdue: 0, stuck: 0, done: 0,  status: 'Active' },
  { name: 'JTS Call Center',code:'N/A',  type: 'Pilot',        service: 'Knowledge Development', dept: 'Engineering', responsible: 'Md. Mahmud Hossain Bhuyan', value: '100%', client: 'N/A',           tasks: 0, overdue: 0, stuck: 0, done: 0,  status: 'Active' },
  { name: 'ELCOMMERZ',    code: 'N/A',   type: 'Partnership',  service: 'N/A',                   dept: 'Engineering', responsible: 'Md. Mahmud Hossain Bhuyan', value: '100%', client: 'Lankabangla Finance', tasks: 0, overdue: 0, stuck: 0, done: 0, status: 'Active' },
]

/* Cost-burn vs delivery trend (6 months) */
export const trend = [
  { month: 'Jan', delivery: 30,  burn: 20 },
  { month: 'Feb', delivery: 40,  burn: 35 },
  { month: 'Mar', delivery: 65,  burn: 45 },
  { month: 'Apr', delivery: 60,  burn: 70 },
  { month: 'May', delivery: 90,  burn: 75 },
  { month: 'Jun', delivery: 115, burn: 88 },
]

/* Task status split for donut */
export const taskSplit = [
  { name: 'Done',        value: 5372, color: '#2E7D32' },
  { name: 'To-Do',       value: 19,   color: '#EF6C00' },
  { name: 'Overdue',     value: 12,   color: '#C62828' },
  { name: 'In Progress', value: 1,    color: '#0277BD' },
]

/* ── Dashboard v2 data ───────────────────────────────────────── */

/* Project Status Overview — donut */
export const projectStatus = [
  { name: 'Completed',   value: 6, pct: 35, color: '#2E7D32' },
  { name: 'In Progress', value: 7, pct: 41, color: '#1E88E5' },
  { name: 'On Hold',     value: 2, pct: 12, color: '#EF6C00' },
  { name: 'Overdue',     value: 2, pct: 12, color: '#C62828' },
  { name: 'Cancelled',   value: 0, pct: 0,  color: '#9E9E9E' },
]
export const totalProjects = 17

/* Workload Distribution — dept cards */
export const workloadDist = [
  { dept: 'Engineering',                pct: 14, tasks: 126, bg: '#00ACC1' },
  { dept: 'QA',                         pct: 9,  tasks: 81,  bg: '#388E3C' },
  { dept: 'Customer Support',           pct: 8,  tasks: 72,  bg: '#F9A825' },
  { dept: 'DevOps',                     pct: 6,  tasks: 54,  bg: '#E91E63' },
  { dept: 'Sales & Marketing',          pct: 6,  tasks: 54,  bg: '#E64A19' },
  { dept: 'Product',                    pct: 6,  tasks: 54,  bg: '#6C5CE7' },
  { dept: 'Finance & Accounts',         pct: 5,  tasks: 45,  bg: '#512DA8' },
  { dept: 'Operations',                 pct: 5,  tasks: 45,  bg: '#1565C0' },
  { dept: 'Information Security',       pct: 5,  tasks: 45,  bg: '#C62828' },
  { dept: 'Human Resources',            pct: 4,  tasks: 36,  bg: '#AD1457' },
  { dept: 'Compliance',                 pct: 4,  tasks: 36,  bg: '#2E7D32' },
  { dept: 'Merchant Onboarding',        pct: 4,  tasks: 36,  bg: '#7B1FA2' },
  { dept: 'Risk & Fraud',               pct: 4,  tasks: 36,  bg: '#D84315' },
  { dept: 'Admin',                      pct: 3,  tasks: 27,  bg: '#00897B' },
  { dept: 'Business Development',       pct: 3,  tasks: 27,  bg: '#00838F' },
  { dept: 'Settlement & Reconciliation',pct: 3,  tasks: 27,  bg: '#283593' },
  { dept: 'Network Operations (NOC)',   pct: 3,  tasks: 27,  bg: '#455A64' },
  { dept: 'Data & Analytics',           pct: 3,  tasks: 27,  bg: '#0277BD' },
  { dept: 'Legal',                      pct: 2,  tasks: 18,  bg: '#5D4037' },
  { dept: 'Procurement',                pct: 1,  tasks: 9,   bg: '#9E9D24' },
  { dept: 'Internal Audit',             pct: 1,  tasks: 9,   bg: '#6D4C41' },
  { dept: 'PMO',                        pct: 1,  tasks: 9,   bg: '#8E24AA' },
]

/* Department Task Overview — table */
export const deptTaskOverview = [
  { dept: 'Admin',                    projects: 4, total: 0,    todo: 0,  inProg: 0, done: 0,    overdue: 0,  stuck: 0, completion: 0   },
  { dept: 'Human Resources',          projects: 2, total: 0,    todo: 0,  inProg: 0, done: 0,    overdue: 0,  stuck: 0, completion: 0   },
  { dept: 'Engineering',              projects: 6, total: 4598, todo: 10, inProg: 0, done: 4588, overdue: 10, stuck: 0, completion: 99  },
  { dept: 'Service Assurance-Quality',projects: 4, total: 361,  todo: 9,  inProg: 1, done: 351,  overdue: 2,  stuck: 0, completion: 97  },
]

/* Projects by Overdue Tasks — table */
export const projectsOverdue = [
  { name: 'HERCULES 2.0', total: 2, overdue: 2, timeTaken: '12d', risk: 'High',   costBurned: 2176, completion: 0  },
  { name: 'PCI-DSS',      total: 1, overdue: 1, timeTaken: '7d',  risk: 'High',   costBurned: 1000, completion: 0  },
  { name: 'ELCOMMERZ',    total: 3, overdue: 1, timeTaken: '5d',  risk: 'Medium', costBurned: 850,  completion: 67 },
  { name: 'Monthly Dev',  total: 5, overdue: 1, timeTaken: '3d',  risk: 'Low',    costBurned: 420,  completion: 80 },
]

/* Top Employees by Overdue Tasks — table */
export const topEmployeesOverdue = [
  { name: 'Khan Yeasir Arafat',  initials: 'KY', avatarBg: '#00ACC1', dept: 'Service Assurance-QA', total: 2,  done: 0,  overdue: 2, completion: 0  },
  { name: 'Mozbaul Alam',        initials: 'MA', avatarBg: '#757575', dept: 'Engineering',          total: 1,  done: 0,  overdue: 1, completion: 0  },
  { name: 'Fardin Rahman',       initials: 'FR', avatarBg: '#7B1FA2', dept: 'Engineering',          total: 41, done: 35, overdue: 3, completion: 85 },
  { name: 'Asif Mohammed Malik', initials: 'AM', avatarBg: '#E64A19', dept: 'Engineering',          total: 5,  done: 3,  overdue: 2, completion: 60 },
]

/* Team Productivity Trend — line chart */
export const productivityTrend = [
  { month: 'Jan', completion: 60 },
  { month: 'Feb', completion: 55 },
  { month: 'Mar', completion: 65 },
  { month: 'Apr', completion: 70 },
  { month: 'May', completion: 65 },
  { month: 'Jun', completion: 78 },
]

/* Revenue Analytics — project-wise dot-matrix (LoopAI-style).
   value = revenue earned per project ($).
   NOTE: revenue figures are placeholders — wire to real API per project. */
export const revenueMatrix = {
  prefix: '৳',
  max: 4800,
  items: [
    { name: 'HERCULES 2.0',   value: 4200, highlight: true },
    { name: 'ELCOMMERZ',      value: 3600 },
    { name: 'Monthly Dev',    value: 3000 },
    { name: 'PCI-DSS',        value: 2400 },
    { name: 'JTS Call Center',value: 1800 },
    { name: 'Vendor',         value: 1200 },
    { name: 'Modish Proj 2',  value: 800 },
  ],
}

/* Revenue vs Cost Burned — 6-month trend ($K).
   NOTE: placeholder figures — wire to real finance API. */
export const revenueVsCost = [
  { month: 'Jan', revenue: 30, cost: 20 },
  { month: 'Feb', revenue: 38, cost: 28 },
  { month: 'Mar', revenue: 52, cost: 41 },
  { month: 'Apr', revenue: 60, cost: 55 },
  { month: 'May', revenue: 82, cost: 60 },
  { month: 'Jun', revenue: 96, cost: 68 },
]

/* ── Dashboard v3 — Revenue-focused MD view ─────────────────── */

/* KPI Stat Cards */
export const kpiStats = [
  { label: 'Total Revenue',     value: '৳24.58M', change: 18.6, vs: 'vs May 2026', up: true,  color: '#00ACC1', iconType: 'revenue', spark: [18.2, 19.5, 18.8, 21.3, 22.1, 20.5, 23.4, 24.58] },
  { label: 'Gross Profit',      value: '৳11.32M', change: 15.3, vs: 'vs May 2026', up: true,  color: '#2E7D32', iconType: 'profit',  spark: [8.5, 9.2, 8.8, 10.1, 9.8, 10.5, 10.8, 11.32]     },
  { label: 'Operating Margin',  value: '25.1%',   change: 2.4,  vs: 'vs May 2026', up: true,  color: '#EF6C00', iconType: 'margin',  spark: [22.1, 22.8, 22.5, 23.4, 23.1, 24.2, 24.6, 25.1]  },
  { label: 'Cash Balance',      value: '৳18.74M', change: 9.8,  vs: 'vs May 2026', up: true,  color: '#1565C0', iconType: 'cash',    spark: [15.2, 15.8, 16.3, 16.1, 17.2, 17.5, 18.1, 18.74]  },
  { label: 'Active Clients',    value: '1,248',   change: 7.2,  vs: 'vs May 2026', up: true,  color: '#9C27B0', iconType: 'clients', spark: [1090, 1120, 1105, 1150, 1165, 1190, 1220, 1248]    },
]

/* Revenue Analytics — by business unit (values in ৳M) */
export const revenueByUnit = {
  max: 10,
  items: [
    { name: 'HERCULES 2.0',   value: 9.42 },
    { name: 'ELCOMMERZ',      value: 6.18 },
    { name: 'PCI-DSS',        value: 4.35 },
    { name: 'JTS Call Center',value: 2.78 },
    { name: 'Modish Proj 2',  value: 1.85 },
  ],
}

/* Revenue vs Cost Burned — 6-month (৳M) */
export const revenueCostTrend = [
  { month: 'Jan', revenue: 16.5, cost: 10.2 },
  { month: 'Feb', revenue: 18.2, cost: 11.4 },
  { month: 'Mar', revenue: 17.8, cost: 11.1 },
  { month: 'Apr', revenue: 20.3, cost: 12.8 },
  { month: 'May', revenue: 19.6, cost: 12.2 },
  { month: 'Jun', revenue: 24.58,cost: 15.1 },
]

/* Department Wise Revenue — donut data (৳M) */
export const deptRevenueDist = [
  { name: 'Engineering',      value: 9.42, pct: 38.3, color: '#1E88E5' },
  { name: 'QA',               value: 6.18, pct: 25.1, color: '#2E7D32' },
  { name: 'Customer Support', value: 4.35, pct: 17.7, color: '#EF6C00' },
  { name: 'DevOps',           value: 2.78, pct: 11.3, color: '#9C27B0' },
  { name: 'Others',           value: 1.85, pct: 7.6,  color: '#EF5350' },
]

/* Project Wise Report — table (৳M) */
export const projectWiseReport = [
  { project: 'HERCULES 2.0',    revenue: 9.42, revenuePct: 38.3, target: 10.5, achievement: 89 },
  { project: 'ELCOMMERZ',       revenue: 6.18, revenuePct: 25.1, target: 6.8,  achievement: 91 },
  { project: 'PCI-DSS',         revenue: 4.35, revenuePct: 17.7, target: 4.6,  achievement: 95 },
  { project: 'JTS Call Center', revenue: 2.78, revenuePct: 11.3, target: 3.0,  achievement: 93 },
  { project: 'Modish Proj 2',   revenue: 1.85, revenuePct: 7.6,  target: 2.2,  achievement: 84 },
]

/* Top Revenue Drivers — ranked list */
export const topRevenueDrivers = [
  { rank: 1, name: 'HERCULES 2.0',    pct: 38.3, color: '#1E88E5' },
  { rank: 2, name: 'ELCOMMERZ',       pct: 25.1, color: '#2E7D32' },
  { rank: 3, name: 'PCI-DSS',         pct: 17.7, color: '#EF6C00' },
  { rank: 4, name: 'JTS Call Center', pct: 11.3, color: '#9C27B0' },
  { rank: 5, name: 'Others',          pct: 7.6,  color: '#EF5350' },
]

/* Business Health Score */
export const businessHealth = {
  score: 82,
  label: 'Healthy',
  changePts: 6,
  metrics: [
    { name: 'Revenue Growth',        score: 85 },
    { name: 'Profitability',         score: 80 },
    { name: 'Cash Position',         score: 78 },
    { name: 'Operational Efficiency',score: 84 },
    { name: 'Client Satisfaction',   score: 83 },
  ],
}

/* Financial Performance Trend — 6-month multi-line (৳M / %) */
export const financialPerfTrend = [
  { month: 'Jan', revenue: 16.5, grossProfit: 7.8,  operatingMargin: 21.5 },
  { month: 'Feb', revenue: 18.2, grossProfit: 8.5,  operatingMargin: 22.0 },
  { month: 'Mar', revenue: 17.8, grossProfit: 8.2,  operatingMargin: 21.8 },
  { month: 'Apr', revenue: 20.3, grossProfit: 9.6,  operatingMargin: 23.0 },
  { month: 'May', revenue: 19.6, grossProfit: 9.2,  operatingMargin: 22.5 },
  { month: 'Jun', revenue: 24.58,grossProfit: 11.32, operatingMargin: 25.1 },
]
