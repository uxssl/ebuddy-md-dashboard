import {
  format,
  parseISO,
  subDays,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfQuarter,
  startOfYear,
} from 'date-fns'

export const EMPTY_FILTERS = {
  businessUnits: [],
  products: [],
  departments: [],
  projectTypes: [],
  salesTeams: [],
  salesPerson: '',
  clientTypes: [],
  regions: [],
}

export const DATE_PRESET_LABELS = {
  today: 'Today',
  'last-day': 'Last Day',
  'this-week': 'This Week',
  'last-week': 'Last Week',
  'this-month': 'This Month',
  'last-month': 'Last Month',
  quarter: 'Quarter',
  year: 'Year',
  custom: 'Custom Date Range',
}

export const DEFAULT_DATE = {
  preset: 'this-month',
  referenceToday: '2026-06-29',
}

export function dateRangeForPreset(preset, referenceToday = DEFAULT_DATE.referenceToday) {
  const today = parseISO(referenceToday)

  switch (preset) {
    case 'today':
      return { from: format(today, 'yyyy-MM-dd'), to: format(today, 'yyyy-MM-dd') }
    case 'last-day': {
      const day = subDays(today, 1)
      return { from: format(day, 'yyyy-MM-dd'), to: format(day, 'yyyy-MM-dd') }
    }
    case 'this-week': {
      const start = startOfWeek(today, { weekStartsOn: 1 })
      return { from: format(start, 'yyyy-MM-dd'), to: format(today, 'yyyy-MM-dd') }
    }
    case 'last-week': {
      const end = subDays(startOfWeek(today, { weekStartsOn: 1 }), 1)
      const start = startOfWeek(end, { weekStartsOn: 1 })
      return { from: format(start, 'yyyy-MM-dd'), to: format(end, 'yyyy-MM-dd') }
    }
    case 'this-month':
      return {
        from: format(startOfMonth(today), 'yyyy-MM-dd'),
        to: format(endOfMonth(today), 'yyyy-MM-dd'),
      }
    case 'last-month': {
      const ref = subMonths(today, 1)
      return {
        from: format(startOfMonth(ref), 'yyyy-MM-dd'),
        to: format(endOfMonth(ref), 'yyyy-MM-dd'),
      }
    }
    case 'quarter':
      return {
        from: format(startOfQuarter(today), 'yyyy-MM-dd'),
        to: format(today, 'yyyy-MM-dd'),
      }
    case 'year':
      return {
        from: format(startOfYear(today), 'yyyy-MM-dd'),
        to: format(today, 'yyyy-MM-dd'),
      }
    default:
      return null
  }
}

export function initialDateState() {
  const range = dateRangeForPreset(DEFAULT_DATE.preset, DEFAULT_DATE.referenceToday)
  return {
    preset: DEFAULT_DATE.preset,
    customFrom: range.from,
    customTo: range.to,
  }
}

export function countActiveFilters(filters) {
  return (
    filters.businessUnits.length +
    filters.products.length +
    filters.departments.length +
    filters.projectTypes.length +
    filters.salesTeams.length +
    (filters.salesPerson ? 1 : 0) +
    filters.clientTypes.length +
    filters.regions.length
  )
}

export function hasPanelFilters(filters) {
  return countActiveFilters(filters) > 0
}
