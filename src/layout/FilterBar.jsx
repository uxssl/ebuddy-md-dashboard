import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, Calendar, SlidersHorizontal, Search, Check } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { format, parseISO } from 'date-fns'
import 'react-day-picker/style.css'

const PICKER_START = new Date(2018, 0, 1)
const PICKER_END = new Date(2030, 11, 31)

const DATE_PRESETS = [
  { value: 'today',       label: 'Today' },
  { value: 'last-day',    label: 'Last Day' },
  { value: 'this-week',   label: 'This Week' },
  { value: 'last-week',   label: 'Last Week' },
  { value: 'this-month',  label: 'This Month' },
  { value: 'last-month',  label: 'Last Month' },
  { value: 'quarter',     label: 'Quarter' },
  { value: 'year',        label: 'Year' },
  { value: 'custom',      label: 'Custom Date Range' },
]

const FILTER_OPTIONS = {
  businessUnits: [
    'SSL Wireless',
    'SSLCommerz',
    'E-Ticketing',
    'Hercules',
    'PCI-DSS',
    'Monthly Dev',
    'Internal Products',
  ],
  products: [
    'SSLCommerz', 'E Buddy', 'Hercules', 'PCI DSS',
    'E Ticketing', 'API Gateway', 'SMS Platform',
  ],
  departments: [
    'Sales', 'Engineering', 'Operations', 'Finance',
    'Customer Support', 'Marketing', 'HR', 'QA',
  ],
  projectTypes: [
    'Revenue Generating', 'Internal Project', 'Client Project', 'R&D Project',
  ],
  salesTeams: [
    'Enterprise Sales', 'SME Sales', 'Corporate Sales', 'Digital Sales', 'Partner Sales',
  ],
  salesPersons: [
    'Ariful Islam', 'Fardin Rahman', 'Md. Bakhtiar Alam', 'Md. Mahmud Hossain Bhuyan',
    'Ashekur Rahman Molla', 'Kalyan Banik', 'Mohammad Ashfaque Ali', 'Md. Mohiuddin Tawfik',
    'Alimoon Nisha', 'Aminur Rashid Iffy',
  ],
  clientTypes: ['Enterprise', 'Government', 'Banking', 'SME', 'Startup'],
  regions: ['Dhaka', 'Chattogram', 'Khulna', 'Rajshahi', 'Sylhet', 'International'],
}

import { countActiveFilters, EMPTY_FILTERS } from '../constants/filterConstants.js'
import { useFilters } from '../context/FilterContext.jsx'

const MENU_MAX_HEIGHT = 220

function useClickOutside(refs, onClose, enabled, ignoreSelector) {
  useEffect(() => {
    if (!enabled) return
    const close = e => {
      if (ignoreSelector && e.target.closest(ignoreSelector)) return
      const inside = refs.some(ref => ref.current?.contains(e.target))
      if (!inside) onClose()
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [enabled, onClose, refs, ignoreSelector])
}

function useFloatingMenuStyle(anchorRef, open) {
  const [style, setStyle] = useState(null)

  const update = useCallback(() => {
    const el = anchorRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const gap = 4
    const spaceBelow = window.innerHeight - rect.bottom - gap
    const spaceAbove = rect.top - gap
    const openUp = spaceBelow < MENU_MAX_HEIGHT && spaceAbove > spaceBelow
    const maxHeight = Math.min(
      MENU_MAX_HEIGHT,
      Math.max(openUp ? spaceAbove : spaceBelow, 96),
    )

    setStyle(
      openUp
        ? {
            position: 'fixed',
            left: rect.left,
            width: rect.width,
            bottom: window.innerHeight - rect.top + gap,
            maxHeight,
            zIndex: 200,
          }
        : {
            position: 'fixed',
            left: rect.left,
            width: rect.width,
            top: rect.bottom + gap,
            maxHeight,
            zIndex: 200,
          },
    )
  }, [anchorRef])

  useEffect(() => {
    if (!open) {
      setStyle(null)
      return
    }
    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [open, update])

  return style
}

function FloatingMenu({ anchorRef, menuRef, open, className, children }) {
  const style = useFloatingMenuStyle(anchorRef, open)
  if (!open || !style) return null
  return createPortal(
    <div ref={menuRef} className={className} style={style}>
      {children}
    </div>,
    document.body,
  )
}

function MultiSelectField({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const fieldRef = useRef(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const outsideRefs = useMemo(() => [fieldRef, menuRef], [])
  useClickOutside(outsideRefs, () => setOpen(false), open)

  const toggle = opt => {
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt])
  }

  const summary = value.length === 0
    ? 'Select options'
    : value.length === 1
      ? value[0]
      : `${value.length} selected`

  return (
    <div className="fb-fp-field" ref={fieldRef}>
      <div className="fb-fp-field-head">
        <span className="fb-fp-field-label">{label}</span>
      </div>
      <button
        ref={triggerRef}
        type="button"
        className="fb-select fb-fp-trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="fb-fp-trigger-text">{summary}</span>
        <ChevronDown size={14} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.55 }} />
      </button>
      <FloatingMenu
        anchorRef={triggerRef}
        menuRef={menuRef}
        open={open}
        className="fb-fp-ms-menu"
      >
        {options.map(opt => {
          const checked = value.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              className={`fb-fp-ms-option${checked ? ' active' : ''}`}
              onClick={() => toggle(opt)}
            >
              <span className={`fb-fp-check${checked ? ' checked' : ''}`}>
                {checked && <Check size={11} strokeWidth={3} />}
              </span>
              {opt}
            </button>
          )
        })}
      </FloatingMenu>
      {value.length > 0 && (
        <div className="fb-fp-chips">
          {value.map(v => (
            <span key={v} className="fb-fp-chip">{v}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function SearchableSelectField({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const fieldRef = useRef(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const outsideRefs = useMemo(() => [fieldRef, menuRef], [])
  const close = () => { setOpen(false); setQuery('') }
  useClickOutside(outsideRefs, close, open)

  const filtered = useMemo(
    () => options.filter(o => o.toLowerCase().includes(query.trim().toLowerCase())),
    [options, query],
  )

  const pick = person => {
    onChange(person)
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="fb-fp-field" ref={fieldRef}>
      <div className="fb-fp-field-head">
        <span className="fb-fp-field-label">{label}</span>
      </div>
      <button
        ref={triggerRef}
        type="button"
        className="fb-select fb-fp-trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="fb-fp-trigger-text">{value || 'Select sales person'}</span>
        <ChevronDown size={14} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.55 }} />
      </button>
      <FloatingMenu
        anchorRef={triggerRef}
        menuRef={menuRef}
        open={open}
        className="fb-fp-search-menu"
      >
        <div className="fb-fp-search-wrap">
          <Search size={14} strokeWidth={2} className="fb-fp-search-icon" />
          <input
            className="fb-fp-search-input"
            type="text"
            placeholder="Search sales person..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="fb-fp-search-list">
          {filtered.length === 0 ? (
            <div className="fb-fp-search-empty">No results found</div>
          ) : (
            filtered.map(person => (
              <button
                key={person}
                type="button"
                className={`fb-fp-search-option${value === person ? ' active' : ''}`}
                onClick={() => pick(person)}
              >
                {person}
              </button>
            ))
          )}
        </div>
      </FloatingMenu>
    </div>
  )
}

function FiltersPanel({ applied, onApply }) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(applied)
  const ref = useRef(null)
  const activeCount = countActiveFilters(applied)

  const panelRefs = useMemo(() => [ref], [])

  useClickOutside(panelRefs, () => {
    setDraft(applied)
    setOpen(false)
  }, open, '.fb-fp-ms-menu, .fb-fp-search-menu')

  const openPanel = () => {
    setDraft(applied)
    setOpen(true)
  }

  const setField = (key, val) => setDraft(prev => ({ ...prev, [key]: val }))

  const clearAll = () => setDraft({ ...EMPTY_FILTERS })

  const cancel = () => {
    setDraft(applied)
    setOpen(false)
  }

  const apply = () => {
    onApply(draft)
    setOpen(false)
  }

  return (
    <div className="fb-fp-wrap" ref={ref}>
      <button
        type="button"
        className="fb-select fb-fp-btn"
        onClick={() => (open ? cancel() : openPanel())}
        aria-expanded={open}
      >
        <SlidersHorizontal size={14} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.7 }} />
        <span>Filters</span>
        {activeCount > 0 && <span className="fb-fp-badge">{activeCount}</span>}
        <ChevronDown size={14} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.55 }} />
      </button>

      {open && (
        <div className="fb-fp-panel">
          <div className="fb-fp-panel-head">Filter</div>

          <div className="fb-fp-panel-body">
            <MultiSelectField
              label="Business Unit"
              options={FILTER_OPTIONS.businessUnits}
              value={draft.businessUnits}
              onChange={val => setField('businessUnits', val)}
            />
            <MultiSelectField
              label="Product"
              options={FILTER_OPTIONS.products}
              value={draft.products}
              onChange={val => setField('products', val)}
            />
            <MultiSelectField
              label="Department"
              options={FILTER_OPTIONS.departments}
              value={draft.departments}
              onChange={val => setField('departments', val)}
            />
            <MultiSelectField
              label="Project Type"
              options={FILTER_OPTIONS.projectTypes}
              value={draft.projectTypes}
              onChange={val => setField('projectTypes', val)}
            />
            <MultiSelectField
              label="Sales Team"
              options={FILTER_OPTIONS.salesTeams}
              value={draft.salesTeams}
              onChange={val => setField('salesTeams', val)}
            />
            <SearchableSelectField
              label="Sales Person"
              options={FILTER_OPTIONS.salesPersons}
              value={draft.salesPerson}
              onChange={val => setField('salesPerson', val)}
            />
            <MultiSelectField
              label="Client Type"
              options={FILTER_OPTIONS.clientTypes}
              value={draft.clientTypes}
              onChange={val => setField('clientTypes', val)}
            />
            <MultiSelectField
              label="Region"
              options={FILTER_OPTIONS.regions}
              value={draft.regions}
              onChange={val => setField('regions', val)}
            />
          </div>

          <div className="fb-fp-panel-foot">
            <button type="button" className="fb-fp-foot-clear" onClick={clearAll}>Clear All</button>
            <div className="fb-fp-foot-actions">
              <button type="button" className="fb-fp-foot-cancel" onClick={cancel}>Cancel</button>
              <button type="button" className="fb-fp-foot-apply" onClick={apply}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function toDate(iso) {
  if (!iso) return undefined
  return parseISO(iso)
}

function toIso(date) {
  if (!date) return ''
  return format(date, 'yyyy-MM-dd')
}

function formatDisplay(iso) {
  if (!iso) return ''
  return format(parseISO(iso), 'MMM d, yyyy')
}

function dateLabel(preset, from, to) {
  if (preset === 'custom') return `${formatDisplay(from)} – ${formatDisplay(to)}`
  return DATE_PRESETS.find(p => p.value === preset)?.label ?? 'This Month'
}

/* Styled month/year dropdowns — matches fb-select */
function PickerDropdown({ options, className, ...selectProps }) {
  const isYear = className?.includes('rdp-years_dropdown')
  return (
    <div className={`fb-picker-dd${isYear ? ' fb-picker-dd-year' : ' fb-picker-dd-month'}`}>
      <select className={`fb-select fb-picker-select ${className || ''}`} {...selectProps}>
        {options?.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>{label}</option>
        ))}
      </select>
      <ChevronDown size={13} strokeWidth={2.5} className="fb-picker-dd-chevron" aria-hidden />
    </div>
  )
}

function PickerDropdownNav(props) {
  return <div className="fb-picker-nav" {...props} />
}

function DateRangeInput({ label, value, active, placeholder, onOpen, onSelect, disabled }) {
  return (
    <label className="fb-date-field">
      <span className="fb-date-label">{label}</span>
      <button
        type="button"
        className={`fb-date fb-date-input${active ? ' active' : ''}`}
        onClick={onOpen}
        aria-expanded={active}
      >
        <Calendar size={13} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.55 }} />
        <span>{value ? formatDisplay(value) : placeholder}</span>
      </button>
      {active && (
        <div className="fb-day-picker-popup">
          <div className="fb-day-picker">
            <DayPicker
              mode="single"
              captionLayout="dropdown"
              startMonth={PICKER_START}
              endMonth={PICKER_END}
              navLayout="after"
              reverseYears
              components={{ Dropdown: PickerDropdown, DropdownNav: PickerDropdownNav }}
              selected={toDate(value)}
              onSelect={onSelect}
              defaultMonth={toDate(value)}
              disabled={disabled}
              showOutsideDays
            />
          </div>
        </div>
      )}
    </label>
  )
}

function DateFilterDropdown({ value, customFrom, customTo, onPresetChange, onRangeChange }) {
  const [open, setOpen] = useState(false)
  const [activePicker, setActivePicker] = useState(null) // 'from' | 'to' | null
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        setActivePicker(null)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const pick = preset => {
    onPresetChange(preset)
    setActivePicker(null)
    if (preset !== 'custom') setOpen(false)
  }

  const selectFrom = date => {
    if (!date) return
    const from = toIso(date)
    let to = customTo
    if (to && parseISO(to) < date) to = from
    onRangeChange({ from, to })
    setActivePicker('to')
  }

  const selectTo = date => {
    if (!date) return
    onRangeChange({ from: customFrom, to: toIso(date) })
    setActivePicker(null)
  }

  return (
    <div className="fb-date-dd" ref={ref}>
      <button
        type="button"
        className="fb-select fb-date-trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{dateLabel(value, customFrom, customTo)}</span>
        <ChevronDown size={14} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.55 }} />
      </button>

      {open && (
        <div
          className={`fb-date-menu${value === 'custom' ? ' has-custom' : ''}`}
          role="listbox"
        >
          {DATE_PRESETS.map(p => (
            <button
              key={p.value}
              type="button"
              role="option"
              aria-selected={value === p.value}
              className={`fb-date-option${value === p.value ? ' active' : ''}`}
              onClick={() => pick(p.value)}
            >
              {p.label}
            </button>
          ))}

          {value === 'custom' && (
            <div className="fb-date-custom">
              <div className="fb-date-range-fields">
                <DateRangeInput
                  label="From"
                  value={customFrom}
                  active={activePicker === 'from'}
                  placeholder="Start date"
                  onOpen={() => setActivePicker('from')}
                  onSelect={selectFrom}
                />
                <span className="fb-date-sep">–</span>
                <DateRangeInput
                  label="To"
                  value={customTo}
                  active={activePicker === 'to'}
                  placeholder="End date"
                  onOpen={() => setActivePicker('to')}
                  onSelect={selectTo}
                  disabled={customFrom ? { before: toDate(customFrom) } : undefined}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* Shared filter bar — drives global filter context for all pages. */
export default function FilterBar() {
  const {
    datePreset,
    customFrom,
    customTo,
    filters,
    setDatePreset,
    setCustomRange,
    setFilters,
    reset,
  } = useFilters()

  return (
    <div className="filter-bar">
      <DateFilterDropdown
        value={datePreset}
        customFrom={customFrom}
        customTo={customTo}
        onPresetChange={setDatePreset}
        onRangeChange={setCustomRange}
      />

      <FiltersPanel applied={filters} onApply={setFilters} />

      <button type="button" className="fb-reset" onClick={reset}>Reset</button>
    </div>
  )
}
