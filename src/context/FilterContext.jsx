import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import {
  EMPTY_FILTERS,
  dateRangeForPreset,
  DEFAULT_DATE,
  initialDateState,
} from '../constants/filterConstants.js'
import { buildFilteredData } from '../utils/filterData.js'

const FilterContext = createContext(null)

export function FilterProvider({ children }) {
  const initial = initialDateState()
  const [datePreset, setDatePresetState] = useState(initial.preset)
  const [customFrom, setCustomFrom] = useState(initial.customFrom)
  const [customTo, setCustomTo] = useState(initial.customTo)
  const [filters, setFilters] = useState(EMPTY_FILTERS)

  const applyDatePreset = useCallback((preset) => {
    setDatePresetState(preset)
    if (preset !== 'custom') {
      const range = dateRangeForPreset(preset, DEFAULT_DATE.referenceToday)
      if (range) {
        setCustomFrom(range.from)
        setCustomTo(range.to)
      }
    }
  }, [])

  const reset = useCallback(() => {
    const next = initialDateState()
    setDatePresetState(next.preset)
    setCustomFrom(next.customFrom)
    setCustomTo(next.customTo)
    setFilters({ ...EMPTY_FILTERS })
  }, [])

  const setCustomRange = useCallback(({ from, to }) => {
    setCustomFrom(from)
    setCustomTo(to)
  }, [])

  const filtered = useMemo(
    () => buildFilteredData({ datePreset, customFrom, customTo, filters }),
    [datePreset, customFrom, customTo, filters],
  )

  const value = useMemo(() => ({
    datePreset,
    customFrom,
    customTo,
    filters,
    setDatePreset: applyDatePreset,
    setCustomRange,
    setFilters,
    reset,
    ...filtered,
  }), [datePreset, customFrom, customTo, filters, applyDatePreset, setCustomRange, reset, filtered])

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilters must be used within FilterProvider')
  return ctx
}
