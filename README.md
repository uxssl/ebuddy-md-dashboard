# ebuddy-md-dashboard

Executive MD Dashboard for SSL Wireless — a chart-first, enterprise dashboard built for the Managing Director's view.

## Stack
- React 18 + Vite
- React Router (multi-page, shared layout)
- Recharts (graphical charts)

## Design language
A single design system keeps every page consistent:
- `src/theme.css` — design tokens (colors, radius, spacing). One source of truth.
- `src/theme.js` — same color tokens for charts.
- `src/layout/Layout.jsx` — universal shell (sidebar + topbar + filter bar) wrapping every page.
- `src/components/` — reusable `ChartCard`, `PageHeader`, `StatusBadge`.

## Pages
- **Dashboard** — chart-first executive overview (health gauge, department bars, task donut, cost-burn trend, project risk).
- **Departments** — completion chart + performance table.
- **Employees** — task performance tracker table.
- **Projects** — project list table.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

Mock data lives in `src/data/mockData.js` — swap for live API later (shape stays the same).
