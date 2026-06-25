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
  { dept: 'Engineering',       pct: 42, tasks: 126, bg: '#00ACC1' },
  { dept: 'QA',                pct: 18, tasks: 54,  bg: '#388E3C' },
  { dept: 'DevOps',            pct: 12, tasks: 36,  bg: '#546E7A' },
  { dept: 'Sales & Marketing', pct: 10, tasks: 30,  bg: '#E64A19' },
  { dept: 'HR',                pct: 10, tasks: 30,  bg: '#AD1457' },
  { dept: 'Finance',           pct: 8,  tasks: 24,  bg: '#512DA8' },
]

/* Department Task Overview — table */
export const deptTaskOverview = [
  { dept: 'Admin',           projects: 4, total: 0, todo: 0, inProg: 0, done: 0, overdue: 0, stuck: 0, completion: 0 },
  { dept: 'Human Resources', projects: 2, total: 0, todo: 0, inProg: 0, done: 0, overdue: 0, stuck: 0, completion: 0 },
]

/* Projects by Overdue Tasks — table */
export const projectsOverdue = [
  { name: 'HERCULES 2.0', total: 2, overdue: 2, timeTaken: '12d', risk: 'High', costBurned: 2176, completion: 0 },
  { name: 'PCI-DSS',      total: 1, overdue: 1, timeTaken: '7d',  risk: 'High', costBurned: 1000, completion: 0 },
]

/* Top Employees by Overdue Tasks — table */
export const topEmployeesOverdue = [
  { name: 'Khan Yeasir Arafat', initials: 'KY', avatarBg: '#00ACC1', dept: 'Service Assurance-Quality Assurance', total: 2, done: 0, overdue: 2, completion: 0 },
  { name: 'Mozbaul Alam',       initials: 'MA', avatarBg: '#757575', dept: 'Engineering',                          total: 1, done: 0, overdue: 1, completion: 0 },
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
